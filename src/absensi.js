import express from 'express'
import Riwayat from './schema/Riwayat.js'
import Absensi from './schema/Absensi.js'
const route = express.Router()
import mongoose from 'mongoose'

route.get('/', async (req, res) => {
    try {
        const data = await Absensi.find().populate('tickets.user', 'nama kelas nomorKelas nomorAbsen')
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
        const data = await Absensi.find().select('title note date openedBy status allowedGrades') // why isnt work
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

// route.get('/howto', async (req, res) => {
//     const dahell = ["66b560c0a9df1007b1061f74", "663431a23ac3c6955a5a3e8c", "66b560bea9df1007b1061f6e", "65c42611d09ad9080c2d4f50", "66b56311a9df1007b1062a88", "65c42835cf5f6762f720a4ff", "66b5617fa9df1007b1062515", "65c4289355182d9461218f5f", "66b56337a9df1007b1062ade", "66b56291a9df1007b1062970", "66342fb13ac3c6955a59ed0f", "6634325f3ac3c6955a5a7b16", "66b56374a9df1007b1062bde", "65c4271846dfe23919773274", "663434a13ac3c6955a5aef8c", "65c425ee5283db7b18dce906", "65b2fee6378eaeabc3c16080", "66b560a8a9df1007b1061f37", "65c42836cf5f6762f720a543", "65c425d35283db7b18dce8e2", "65c4293172a5292ad74db841", "66b5630fa9df1007b1062a85", "65c426ff46dfe239197731d8", "65c426845283db7b18dce991", "66b55e7ba9df1007b1061ccb", "66b5609ea9df1007b1061f1c", "65c42629cf5f6762f7209504", "6634310e3ac3c6955a5a0f0e", "65c42684d09ad9080c2d5044", "663430673ac3c6955a59f922", "65c4261855182d94612180d5", "65c4270e46dfe23919773231", "65c42976a607d0127f4e83be", "663431a93ac3c6955a5a404a", "65c425dc5283db7b18dce8ed", "65c425e355182d9461218074", "65b301161da9bd6078aa4add", "66b560cba9df1007b1061f8c", "65c426225283db7b18dce938", "65c42a18d5e0b3d303f66807", "65b2fecfdd4e1065c59ff877", "65c4284ecf5f6762f720aa2b", "65c426f65283db7b18dced1f", "65c4268c5283db7b18dce99a", "65c4292a72a5292ad74db6e5", "65b2ff111da9bd6078aa4a2b", "65c429c85283db7b18dd061d", "663430c13ac3c6955a5a01e0", "65c426a646dfe23919772fb0", "66b56057a9df1007b1061e7e", "66b55e85a9df1007b1061cd2", "65c4296fa607d0127f4e80ca", "65b2feccdd4e1065c59ff86a", "65b2feb6ac3b1d7bbba5248a", "66342f613ac3c6955a59e8d5", "663431a13ac3c6955a5a3e88", "65c4277297e3d77261b9c8d6", "65c42646d09ad9080c2d4fab", "65c4265c46dfe23919772efe", "66b5628aa9df1007b106295e", "6543e4ed9d5ed7e3bc476723", "65c4271dcf5f6762f72098dc", "65c42684d09ad9080c2d5041", "663431e83ac3c6955a5a5690", "65c426945283db7b18dce9e1", "66b55fffa9df1007b1061de7", "66b55ea5a9df1007b1061cfb", "6634318b3ac3c6955a5a362c", "663431f73ac3c6955a5a5b71", "65c42722cf5f6762f720990b", "65c42881a607d0127f4e5232", "663433513ac3c6955a5ac73d", "65c4283997e3d77261b9d24c", "65c425da55182d9461218054", "65c426e0cf5f6762f72096d5", "65c426e0cf5f6762f72096d5", "663433193ac3c6955a5abae5", "65c4284e5283db7b18dcf9d3", "65b2fe9cdd4e1065c59ff80c", "65c426545283db7b18dce956", "65c42610d09ad9080c2d4f4d", "65c426a6cf5f6762f72095a5", "66b56353a9df1007b1062b5c", "663434923ac3c6955a5aeefa", "66b5645ca9df1007b1069d78", "66b5606ea9df1007b1061eb0", "6634329f3ac3c6955a5a94a4", "663432d63ac3c6955a5aa535", "65c42862d5e0b3d303f62042", "65c4281546dfe239197738cf", "66b56464a9df1007b106a0c5", "65c42683d09ad9080c2d503e", "66b56225a9df1007b10628a6", "66b564c2a9df1007b106d705", "6634324c3ac3c6955a5a7474", "66b5646aa9df1007b106a219", "65b2fe7cac3b1d7bbba5245b", "65b2fe7cac3b1d7bbba5245b", "65a207a8d35db65a1bfaf912", "65c425b655182d9461218041", "65c4263dd09ad9080c2d4fa4", "663431243ac3c6955a5a12cc", "66b5656ea9df1007b10731e7", "66b5660fa9df1007b1074d75", "66b5650da9df1007b1070653", "66b564f9a9df1007b10701ee", "66b560fea9df1007b1062121", "66b56935a9df1007b10783c5"]
//     const absensi = new Absensi({
//         coordinates: {
//             first: [ -7.482044510981448, 110.22200388577714 ],
//             second: [ -7.482209927696517, 110.22228020994946 ]
//         },
//         _id: '66b55957a9df1007b1061aaf',
//         title: 'Literasi SpiritualXI',
//         status: true,
//         openedBy: 'Maulana Choirul Aziz',
//         note: '',
//         date: +new Date("2024-08-09T00:31:48.802Z"),
//         tickets: dahell.map(x => ({
//             user: x,
//             absen: true,
//             kode: '-',
//             keterangan: null,
//             waktuAbsen: + new Date("2024-08-09T00:31:50.251Z"),
//             koordinat: [-7.482044510981448, 110.22200388577714],
//         }))
//     })
//     await absensi.save()
//     res.json({message: "ok"})
// })

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

route.post('/', async (req, res) => { // faster
    try {
        const absensi = new Absensi(req.body)
        await absensi.save()
        console.log(absensi)

        // const list = await Absensi.find().populate('tickets.user', 'nama kelas nomorKelas nomorAbsen')

        // res.status(200).json({ createdAbsence: absensi, list })
        res.status(200).json({ createdAbsence: absensi })
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error', error: error.message })
    }
});


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
        const list = await Absensi.find().populate('tickets.user', 'nama kelas nomorKelas nomorAbsen')

        if (absensi) {
            res.status(200).json({msg: 'Absensi diperbarui', absensi, list })
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
        const data = await Absensi.findById(req.params.id).populate('tickets.user', 'nama kelas nomorKelas nomorAbsen')

        if (data) {
            res.status(200).json({data})
        } else {
            res.status(404).json({ msg: 'Absensi tidak ditemukan' })
        }
    } catch (error) {
        res.status(500).json({msg: 'Internal server error'})
    }
})

route.get('/users/:id', async (req, res) => {
    try {
        const absensi = await Absensi.findById(req.params.id).select('tickets').populate('tickets.user', 'nama kelas nomorKelas nomorAbsen')
        res.status(200).json(absensi?.tickets.map(x => x.user) || [])
    } catch (error) {
        console.log(error);
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
        const list = await Absensi.find().populate('tickets.user', 'nama kelas nomorKelas nomorAbsen')
        if (absensi) {
            res.status(200).json({msg: 'Absensi dibuka untuk semua pengguna', absensi, list })
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
        const list = await Absensi.find().populate('tickets.user', 'nama kelas nomorKelas nomorAbsen')
        if (absensi) {
            res.status(200).json({msg: 'Absensi ditutup untuk semua pengguna', absensi, list })
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
        // const userAbsence = absensi?.tickets?.map(user => ({...getUserStatus(user), user: user.user}))
        const history = new Riwayat({
            title: absensi?.title,
            openedBy: req.body.closedBy,
            note: absensi?.note,
            coordinates: absensi?.coordinates,
            tickets: absensi?.tickets,
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
        const list = await Absensi.find().populate('tickets.user', 'nama kelas nomorKelas nomorAbsen')
        
        res.status(200).json({msg: 'ok', absensi, list})
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
        const list = await Absensi.find().populate('tickets.user', 'nama kelas nomorKelas nomorAbsen')
        res.status(200).json({absensi, list})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Internal server error'})   
    }
})

export default route
