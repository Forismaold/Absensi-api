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

route.post('/hadir', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body._id, {
            $set: {
                absen: true,
                keterangan: null, 
                waktuAbsen: new Date(), 
                kode: '-',
                koordinat: req.body.userCoordinate
            }
        }, {new: true})
        if (user) {
            res.json({status: getUserStatus(user), msg: 'Berhasil absen'})
        } else {
            res.status(404).json({msg: 'User tidak ditemukan'})
        }
    } catch (error) {
        res.status(500).json({msg: 'Internal server error'})
    }
})

route.get('/status/:userId', async (req, res) => {
    try {
        const absensi = await Absensi.findById(process.env.ABSENSI_ID)
        const user = await User.findById(req.params.userId)
        if (!user) return res.status(404).json({msg: 'User tidak ditemukan'})
        res.json({status: getUserStatus(user), absensi})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Intermal server error'})
    }
})


export default route