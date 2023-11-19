import express from 'express'
import User from './schema/User.js'
import Riwayat from './schema/Riwayat.js'
import Absensi from './schema/Absensi.js'
import { getUserStatus } from './utils.js'
const route = express.Router()

route.get('/status', async (req, res) => {
    try {
        const absensi = await Absensi.findById(process.env.ABSENSI_ID)

        if (absensi) {
            res.status(200).json({absensi, msg: `Status absensi: ${absensi.status}`})
        } else {
            res.status(404).json({ msg: 'Absensi tidak ditemukan' })
        }

    } catch (error) {
        res.status(500).json({msg: 'Internal server error'})   
    }
})
route.post('/buka', async (req, res) => {
    try {
        const users = await User.updateMany({}, {$set: {absen: null, keterangan: null, waktuAbsen: null, kode: '-', koordinat: [0, 0]}})

        const absensi = await Absensi.findOneAndUpdate({ _id: process.env.ABSENSI_ID, status: false }, {
            $set: {
                note: req.body.note || '',
                title: req.body.title || 'Dzuhur',
                openedBy: req.body.openedBy,
                status: true,
                date: Date.now()
            }
        }, {new: true})

        if (absensi) {
            res.status(200).json({usersLength: users.matchedCount, msg: 'Absensi dibuka untuk semua pengguna', absensi })
        } else {
            res.status(404).json({ msg: 'Absensi sudah terbuka' });
        }

    } catch (error) {
        res.status(500).json({msg: 'Internal server error'})   
    }
})

route.post('/tutup', async (req, res) => {
    try {
        const users = await User.find({})
        
        const report = {
            msg: 'Absensi ditutup untuk semua pengguna',
            tidak: users.filter(x => x.absen === false).length,
            belum: users.filter(x => x.absen === null).length,
            sudah: users.filter(x => x.absen === true).length
        }

        const absensi = await Absensi.findOneAndUpdate({ _id: process.env.ABSENSI_ID, status: true }, {
            $set: {
                openedBy: null,
                status: false,
                date: null,
                title: null,
                note: null
            }
        })

        const userAbsence = users.filter(user => user.absen !== null).map(user => ({...getUserStatus(user), _id: user._id, nama: user.nama, koordinat: user.koordinat, kelas: user.kelas, nomorKelas: user.nomorKelas}))

        const history = new Riwayat({
            users: userAbsence,
            title: 'Dzuhur'
        })

        await history.save()
        
        await User.updateMany({}, { $set: {absen: null, keterangan: null, waktuAbsen: null, kode: '-', koordinat: [0, 0]} })

        res.status(200).json(report)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Internal server error'})   
    }
})

route.post('/buang', async (req, res) => {
    try {
        const users = await User.find({})
        
        const report = {
            msg: 'Data absensi dibuang',
            tidak: users.filter(x => x.absen === false).length,
            belum: users.filter(x => x.absen === null).length,
            sudah: users.filter(x => x.absen === true).length
        }

        const absensi = await Absensi.findOneAndUpdate({ _id: process.env.ABSENSI_ID, status: true }, {
            $set: {
                openedBy: null,
                status: false,
                date: null,
                title: null
            }
        })
        
        await User.updateMany({}, { $set: {absen: null, keterangan: null, waktuAbsen: null, kode: '-', koordinat: [0, 0]} })

        res.status(200).json(report)
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Internal server error'})   
    }
})


export default route