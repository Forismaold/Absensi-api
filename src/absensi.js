import express from 'express'
import Riwayat from './schema/Riwayat.js'
import Absensi from './schema/Absensi.js'
import { getUserStatus } from './utils.js'
const route = express.Router()
import mongoose from 'mongoose'

route.get('/', async (req, res) => {
    console.log('index get route reached');
    try {
        const data = await Absensi.find()
        if (data) {
            res.status(200).json({data})
        } else {
            res.status(404).json({ msg: 'Absensi tidak ditemukan' })
        }
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' })
    }
})
route.get('/short', async (req, res) => {
    try {
        const data = await Absensi.find().select('title note date openedBy status')
        if (data) {
            res.status(200).json({data})
        } else {
            res.status(404).json({ msg: 'Absensi tidak ditemukan' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error', hi: 'lol' })
    }
})

route.get('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ msg: 'ID absensi ' + req.params.id + ' tidak valid!', data: {} });
    }
    try {
        const data = await Absensi.findById(req.params.id).populate('tickets.user', 'nama kelas nomorKelas nomorAbsen')
        if (data) {
            res.status(200).json({data})
        } else {
            console.log(data)
            res.status(404).json({ msg: '404 :( - Absensi tidak ditemukan!' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error' })
    }
})

route.post('/', async (req, res) => {
    try {
        const absensi = new Absensi(req.body)
        await absensi.save().then(async (absensi) => {
            res.status(200).json({absensi})
        })
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' })
    }
})

route.put('/:id', async (req, res) => {
    try {
        const absensi = await Absensi.findOneAndUpdate({ _id: req.params.id }, {
            $set: {
                openedBy: req.body.openedBy,
                date: Date.now(),
                title: req.body.title,
                note: req.body.note,
                coordinates: req.body.coordinates,
            }
        }, {new: true})

        if (absensi) {
            res.status(200).json({msg: 'Absensi diperbarui', absensi })
        } else {
            res.status(404).json({ msg: 'Absensi tidak ditemukan' });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Internal server error'})   
    }
})

route.get('/detail/:id', async (req, res) => {
    try {
        const data = await Absensi.findById(req.params.id)

        if (data) {
            res.status(200).json({data})
        } else {
            res.status(404).json({ msg: 'Absensi tidak ditemukan' })
        }
    } catch (error) {
        res.status(500).json({msg: 'Internal server error'})
    }
})

route.get('/status/:id', async (req, res) => {
    try {
        const absensi = await Absensi.findById(req.params.id)

        if (absensi) {
            res.status(200).json({absensi, msg: `Status absensi: ${absensi.status}`})
        } else {
            res.status(404).json({ msg: 'Absensi tidak ditemukan' })
        }

    } catch (error) {
        res.status(500).json({msg: 'Internal server error'})
    }
})

route.post('/buka/:id', async (req, res) => {
    try {
        const absensi = await Absensi.findOneAndUpdate({ _id: req.params.id, status: req.body.status }, {
            $set: {
                openedBy: req.body.openedBy,
                status: true,
                date: Date.now()
            }
        }, {new: true})

        if (absensi) {
            res.status(200).json({msg: 'Absensi dibuka untuk semua pengguna', absensi })
        } else {
            res.status(404).json({ msg: 'Absensi sudah terbuka' });
        }

    } catch (error) {
        res.status(500).json({msg: 'Internal server error'})   
    }
})

route.post('/tutup/:id', async (req, res) => {
    try {
        const absensi = await Absensi.findOneAndUpdate({ _id: req.params.id, status: req.body.status }, {
            $set: {
                openedBy: req.body.openedBy,
                status: false,
                date: Date.now()
            }
        }, {new: true})

        if (absensi) {
            res.status(200).json({msg: 'Absensi ditutup untuk semua pengguna', absensi })
        } else {
            res.status(404).json({ msg: 'Absensi sudah terbuka' });
        }

    } catch (error) {
        res.status(500).json({msg: 'Internal server error'})   
    }
})

route.post('/simpan/:id', async (req, res) => {
    try {
        const absensi = await Absensi.findOneAndDelete({ _id: req.params.id, status: req.body.status }, {
            $set: {
                openedBy: req.body.closedBy || null,
                status: false,
                date: Date.now(),
                title: null,
                note: null
            }
        }, {new: true})

        // simpan sebagai riwayat (History)
        const userAbsence = absensi?.users?.map(user => ({...getUserStatus(user), user: user.user}))
        const history = new Riwayat({
            title: absensi?.title,
            note: absensi?.note,
            coordinates: absensi?.coordinates,
            tickets: userAbsence,
        })

        await history.save()
        // laporan
        // const users = await User.find({})
        // const report = {
        //     msg: 'Absensi ditutup untuk semua pengguna',
        //     tidak: absensi?.users?.filter(x => x.absen === false).length || 0,
        //     // belum: null,
        //     sudah: absensi?.users?.filter(x => x.absen === true).length || 0
        // }
        // report.belum = users.length - report.tidak - report.belum
        
        // await User.updateMany({}, { $set: {absen: null, keterangan: null, waktuAbsen: null, kode: '-', koordinat: [0, 0]} })

        // res.status(200).json({...report, absensi})
        console.log(absensi)
        res.status(200).json({msg: 'ok', absensi})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Internal server error'})   
    }
})

route.delete('/buang/:id', async (req, res) => {
    try {
        const absensi = await Absensi.findOneAndDelete({ _id: req.params.id }, {
            $set: {
                openedBy: req.body.closedBy || null,
                status: false,
                date: Date.now(),
                title: null,
                note: null
            }
        }, {new: true})
        
        res.status(200).json({absensi})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Internal server error'})   
    }
})


export default route
