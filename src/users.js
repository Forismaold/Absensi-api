import express from 'express'
import User from './schema/User.js'
const route = express.Router()

route.get('/all', async (req, res) => {
    const users = await User.find({}).select('nama _id NIS kelas nomorKelas nomorAbsen peran')
    res.json(users)
})

route.get('/class/:class/:classNumber', async (req, res) => {
    console.log(req.params)
    const users = await User.find({kelas: req.params.class, nomorKelas: req.params.classNumber}).select('nama _id NIS kelas nomorKelas nomorAbsen')
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