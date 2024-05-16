import express from 'express'
import User from './schema/User.js'
const route = express.Router()

route.get('/all', async (req, res) => {
    const users = await User.find({}).select('nama _id NIS absen keterangan kode koordinat waktuAbsen')
    res.json(users)
})

route.get('/space', async (req, res) => {
    try {
        const users = await User.find({ });
        const userWithSpace = users.filter(user => /[ ]$/.test(user.username));
        console.log(userWithSpace);
        res.json({length: users.length, users: userWithSpace});
    } catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }    
})


export default route