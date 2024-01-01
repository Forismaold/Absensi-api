import express from 'express'
import User from './schema/User.js'
import { getUserStatus } from './utils.js'
import Absensi from './schema/Absensi.js'

const route = express.Router()

route.post('/tidakHadir', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body._id, {
            $set: {
                kode: req.body.kode,
                keterangan: req.body.keterangan,
                waktuAbsen: new Date(),
                absen: false,
                koordinat: req.body.userCoordinate
            }
        }, {new: true})
        if (user) {
            res.json({status: getUserStatus(user), msg: 'Berhasil mengirim keterangan'})
        } else {
            res.status(404).json({msg: 'User tidak ditemukan'})
        }
    } catch (error) {
        res.status(500).json({msg: 'Internal server error'})
    }
})

route.post('/hadir/:id', async (req, res) => {
    try {
        let absensi
        const data = {
            _id: req.body._id,
            nama: req.body.nama,
            kelas: req.body.kelas,
            nomorKelas: req.body.nomorKelas,
            nomorAbsen: req.body.nomorAbsen,
            absen: true,
            keterangan: null, 
            waktuAbsen: new Date(), 
            kode: '-',
            koordinat: req.body.userCoordinate
        }
        if (req.body.status) {
            absensi = await Absensi.findByIdAndUpdate(req.params.id, {
                $set: {
                    'users.$[user].nama': data.nama,
                    'users.$[user].kelas': data.kelas,
                    'users.$[user].nomorKelas': data.nomorKelas,
                    'users.$[user].nomorAbsen': data.nomorAbsen,
                    'users.$[user].absen': data.absen,
                    'users.$[user].keterangan': data.keterangan,
                    'users.$[user].waktuAbsen': data.waktuAbsen,
                    'users.$[user].kode': data.kode,
                    'users.$[user].koordinat': data.koordinat,
                },
            }, {new: true, arrayFilters: [{'user._id': req.body._id}]})
        } else {
            absensi = await Absensi.findByIdAndUpdate(req.params.id, {
                $push: {
                    users: data
                },
            }, {new: true})
        }

        if (absensi) {
            res.json({data: absensi, msg: 'Berhasil absen'})
        } else {
            res.status(404).json({msg: 'User tidak ditemukan'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Internal server error'})
    }
})

route.get('/status/:userId', async (req, res) => {
    try {
        const absensi = await Absensi.findById(process.env.ABSENSI_ID)
        const userId = req.params.userId

        if (userId === 'undefined') return res.json({ absensi })

        const user = await User.findById(userId)
        res.json({ status: { ...getUserStatus(user) }, absensi })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error' })
    }
})


export default route