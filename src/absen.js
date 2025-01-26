import express from 'express'
import Absensi from './schema/Absensi.js'
import mongoose from 'mongoose'
import User from './schema/User.js'

const route = express.Router()

async function pushTicket(absenceId, data) {
    let absensi;
    try {
        // Check if the user already exists in the tickets array
        let userExist = await Absensi.findOne({
            _id: absenceId,
            status: true,
            "tickets.user": data.user,
        });

        if (userExist) {
            // Update existing ticket with arrayFilters
            absensi = await Absensi.findOneAndUpdate(
                { _id: absenceId, status: true },
                {
                    $set: {
                        "tickets.$[ticket].absen": data?.absen,
                        "tickets.$[ticket].keterangan": data?.keterangan,
                        "tickets.$[ticket].waktuAbsen": data?.waktuAbsen,
                        "tickets.$[ticket].kode": data?.kode,
                        "tickets.$[ticket].koordinat": data?.koordinat,
                    },
                },
                {
                    new: true,
                    arrayFilters: [{ "ticket.user": data.user }],
                }
            ).populate("tickets.user", "nama kelas nomorKelas nomorAbsen");
        } else {
            // Push a new ticket into the tickets array
            absensi = await Absensi.findOneAndUpdate(
                { _id: absenceId, status: true },
                {
                    $push: {
                        tickets: data,
                    },
                },
                { new: true }
            ).populate("tickets.user", "nama kelas nomorKelas nomorAbsen");
        }
    } catch (error) {
        console.error(error);
    }

    return absensi || null;
}


route.post('/tidakHadir/:id', async (req, res) => {
    try {
        if (!req.body.user) {
            res.status(404).json({msg: 'Anda siapa?'})
        }
        const data = {
            user: req.body.user,
            absen: false,
            keterangan: req.body.keterangan, 
            waktuAbsen: new Date(), 
            kode: req.body.kode,
            koordinat: req.body.userCoordinate
        }
        const absensi = await pushTicket(req.params.id, data)
        if (absensi) {
            res.json({data: absensi, msg: 'Berhasil absen'})
        } else {
            res.status(404).json({msg: 'User atau absensi tidak ditemukan'})
        }
    } catch (error) {
        res.status(500).json({msg: 'Internal server error'})
    }
})

route.post('/hadir/:id', async (req, res) => {
    try {
        if (!req.body.user) {
            res.status(404).json({msg: 'Anda siapa?'})
        }
        const data = {
            user: req.body.user,
            absen: true,
            keterangan: null,
            waktuAbsen: new Date(), 
            koordinat: req.body.userCoordinate
        }
        
        const absensi = await pushTicket(req.params.id, data)
        if (absensi) {
            res.json({data: absensi, msg: 'Berhasil absen'})
        } else {
            res.status(404).json({msg: 'User atau absensi tidak ditemukan'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Internal server error'})
    }
})

// route.get('/status/:userId', async (req, res) => {
//     try {
//         const absensi = await Absensi.findById(process.env.ABSENSI_ID)
//         const userId = req.params.userId

//         if (userId === 'undefined') return res.json({ absensi })

//         const user = await User.findById(userId)
//         res.json({ status: { ...getUserStatus(user) }, absensi })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ msg: 'Internal server error' })
//     }
// })

// Admin control
route.put('/force/hadir/:id', async (req, res) => {
    const absensiId = req.params.id;
    const { koordinat, user } = req.body;
    console.log('force hadir detected', absensiId, koordinat, user);
    // console.log('datareceive', req.body);

    if (!user) return res.status(404).json({msg: 'User tidak ditemukan', success: false})
    if (!koordinat) return res.status(404).json({msg: 'koordinat tidak ditentukan', success: false})
    
    const data = {
        user: req?.body?.user || null,
        absen: true,
        waktuAbsen: new Date(), 
        koordinat: koordinat || null
    }

    const absensi = await pushTicket(req.params.id, data)

    if (absensi) {
        res.json({data: absensi, msg: 'Berhasil absen', success: true, ticket: absensi.tickets.find(ticket => ticket.user === data.user)})
    } else {
        res.status(404).json({msg: 'User atau absensi tidak ditemukan', success: false})
    }

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
    // try {
        // const absensi = await Absensi.findOneAndUpdate(
        //     { _id: absensiId},
        //     { $set: { 'tickets.$[user].koordinat': koordinat } },
        //     { new: true, arrayFilters: [{'user._id': userId}] }
        // );

        // if (!absensi) {
        //     return res.status(404).json({ message: 'Absensi or User not found', success: false });
        // }

        // res.json({absensi, success: true});
    // } catch (error) {
    //     res.status(500).send({ message: 'Internal Server Error', error });
    // }
})


export default route
