import express from 'express'
import User from './schema/User.js'
import { getUserStatus } from './utils.js'

const route = express.Router()

route.get('/bukaAbsensi', async (req, res) => {
    try {
        const users = await User.updateMany({}, {$set: {absen: null, keterangan: null, waktuAbsen: null, kode: '-'}})
        console.log(users)

        if (users) {
            res.status(200).json({usersLength: users.matchedCount, message: 'Update berhasil. Absensi dibuka untuk semua pengguna' });
        } else {
            res.status(404).json({ message: 'Tidak ada pengguna yang diupdate' });
        }

    } catch (error) {
        res.status(500).json({message: 'Internal server error'})   
    }
})

route.get('/tutupAbsensi', async (req, res) => {
    try {
        const users = await User.find({})
        const report = { 
            message: 'Update berhasil. Absensi ditutup untuk semua pengguna',
            tidak: users.filter(x => x.absen === false).length,
            belum: users.filter(x => x.absen === null).length,
            sudah: users.filter(x => x.absen === true).length
        }
        
        await User.updateMany({}, { $set: {absen: null, keterangan: null, waktuAbsen: null, kode: '-'} })

        res.status(200).json(report)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'})   
    }
})

route.post('/tidakHadir', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body._id, {
            $set: {
                kode: req.body.kode,
                keterangan: req.body.keterangan,
                waktuAbsen: new Date(),
                absen: false
            }
        }, {new: true})
        if (user) {
            res.json({status: getUserStatus(user), msg: 'Berhasil mengirim keterangan'})
        } else {
            res.status(404).json({msg: 'User tidak ditemukan'})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
})

route.post('/hadir', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body._id, {
            $set: {
                absen: true,
                keterangan: null, 
                waktuAbsen: new Date(), 
                kode: '-'
            }
        }, {new: true})
        if (user) {
            res.json({status: getUserStatus(user) ,msg: 'Berhasil absen'})
        } else {
            res.status(404).json({msg: 'User tidak ditemukan'})
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
})

route.get('/status/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        if (!user) return res.status.json({message: 'User tidak ditemukan'})
        res.json(getUserStatus(user))
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Intermal server error'})
    }
})


export default route