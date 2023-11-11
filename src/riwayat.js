import express from 'express'
import Riwayat from './schema/Riwayat.js'
const route = express.Router()

route.get('/:userId', async (req, res) => {
    try {
        const riwayats = await Riwayat.find({})
        const mappingRiwayat = riwayats.map(riwayat => {
            const user = riwayat.users.find(user => user._id.equals(req.params.userId))
            return {title: riwayat.title, absen: user?.absen, date: user?.waktuAbsen, _id: riwayat._id}
        })

        res.json({riwayats: mappingRiwayat})
    } catch (error) {
        console.log(error);
        res.json({msg: 'internal server error'})
    }
})

export default route