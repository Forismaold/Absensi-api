import express from 'express'
import User from './schema/User.js'
import { getUserStatus } from './utils.js'
import Absensi from './schema/Absensi.js'

const route = express.Router()

async function kehadiran(_id, userId, data) {
    let absensi
    let userExist = await Absensi.findOne({_id, status: true, "users.id": userId })
    if (userExist) {
        absensi = await Absensi.findOneAndUpdate({_id, status: true}, {
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
        }, {new: true, arrayFilters: [{'user._id': userId}]})
    } else {
        absensi = await Absensi.findOneAndUpdate({_id, status: true}, {
            $push: {
                users: data
            },
        }, {new: true})
    }
    console.log('absensi', absensi);
    return absensi
}

route.post('/tidakHadir/:id', async (req, res) => {
    try {
        const data = {
            _id: req.body._id,
            nama: req.body.nama,
            kelas: req.body.kelas,
            nomorKelas: req.body.nomorKelas,
            nomorAbsen: req.body.nomorAbsen,
            absen: false,
            keterangan: req.body.keterangan, 
            waktuAbsen: new Date(), 
            kode: req.body.kode,
            koordinat: req.body.userCoordinate
        }
        const absensi = await kehadiran(req.params.id, req.body._id, data)
        if (absensi) {
            res.json({data: absensi, msg: 'Berhasil absen'})
        } else {
            res.status(404).json({msg: 'User tidak ditemukan'})
        }
    } catch (error) {
        res.status(500).json({msg: 'Internal server error'})
    }
})

route.post('/hadir/:id', async (req, res) => {
    try {
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
        
        const absensi = await kehadiran(req.params.id, req.body._id, data)
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

route.put('/force/hadir/:id', async (req, res) => {
    const absensiId = req.params.id;
    const { koordinat, userId } = req.body;
    console.log('force hadir detected', absensiId, koordinat, userId);

    // absensi = await Absensi.findOneAndUpdate({_id, status: true}, {
    //     $set: {
    //         'users.$[user].nama': data.nama,
    //         'users.$[user].kelas': data.kelas,
    //         'users.$[user].nomorKelas': data.nomorKelas,
    //         'users.$[user].nomorAbsen': data.nomorAbsen,
    //         'users.$[user].absen': data.absen,
    //         'users.$[user].keterangan': data.keterangan,
    //         'users.$[user].waktuAbsen': data.waktuAbsen,
    //         'users.$[user].kode': data.kode,
    //         'users.$[user].koordinat': data.koordinat,
    //     },
    // }, {new: true, arrayFilters: [{'user._id': userId}]})
    try {
        const absensi = await Absensi.findOneAndUpdate(
            { _id: absensiId},
            { $set: { 'users.$[user].koordinat': koordinat } },
            { new: true, arrayFilters: [{'user._id': userId}] }
        );

        if (!absensi) {
            return res.status(404).json({ message: 'Absensi or User not found', success: false });
        }

        res.json({absensi, success: true});
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error });
    }
})


export default route
