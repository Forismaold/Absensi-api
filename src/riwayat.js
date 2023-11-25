import express from 'express'
import Riwayat from './schema/Riwayat.js'
const route = express.Router()

route.get('/all', async (req, res) => {
    try {
        const riwayats = await Riwayat.find({})
        res.json({riwayats})
    } catch (error) {
        console.log(error)
        res.json({msg: 'Internal server error'})
    }
})

route.get('/:userId', async (req, res) => {
    try {
        const riwayats = await Riwayat.find({})
        const mappingRiwayat = riwayats.map(riwayat => {
            const user = riwayat.users.find(user => user._id.equals(req.params.userId))
            return {title: riwayat.title, absen: user?.absen, date: user?.waktuAbsen, _id: riwayat?._id, koordinat: user?.koordinat}
        })

        res.json({riwayats: mappingRiwayat})
    } catch (error) {
        console.log(error);
        res.json({msg: 'Internal server error'})
    }
})

route.delete('/:riwayatId', async (req, res) => {
    try {
        const riwayats = await Riwayat.findByIdAndDelete(req.params.riwayatId)
        console.log(riwayats);
        if (riwayats) return res.json({riwayats: riwayats, msg: 'Berhasil menghapus riwayat'})
        res.status(404).json({riwayats: riwayats, msg: 'Riwayat gagal dihapus'})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Internal server error'})
    }
})

export default route
