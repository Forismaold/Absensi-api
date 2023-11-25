import express from 'express'
import User from './schema/User.js'
const route = express.Router()

route.get('/all', async (req, res) => {
    const users = await User.find({}).select('nama _id NIS absen keterangan kode koordinat waktuAbsen')
    res.json(users)
})

export default route