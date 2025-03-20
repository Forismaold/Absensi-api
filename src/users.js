import express from 'express'
import User from './schema/User.js'
import { maskEmail } from './utils.js'
const route = express.Router()

route.get('/takeall', async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

route.get('/all', async (req, res) => {
    const users = await User.find({}).select('nama _id NIS kelas nomorKelas nomorAbsen peran')
    res.json(users)
})
route.get('/adminGetAll', async (req, res) => {
    const users = await User.find({}).select('nama _id NIS kelas nomorKelas nomorAbsen peran email')
    const maskedUsers = users.map((user) => {
        return ({...user, email: maskEmail(user.email)})
    })
    res.json(maskedUsers)
})

route.get('/all/analyze', async (req, res) => {
    const users = await User.find({}).select('nama _id NIS kelas nomorKelas nomorAbsen peran')
    res.json(users)
})

route.get('/class/:class/:classNumber', async (req, res) => {
    try {
        console.log(req.params)
        const users = await User.find({kelas: req.params.class, nomorKelas: req.params.classNumber}).select('nama _id NIS kelas nomorKelas nomorAbsen')
        res.json(users)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
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

// route.get('/delete/kakel', async (req, res) => {
//     try {
//       // Delete users where the author is either "garry" or "larry"
//       const result = await User.deleteMany({ kelas: { $in: ['XII MIPA', 'XII IPS'] } });
//       res.status(200).json({ message: `${result.deletedCount} users deleted.` });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });



export default route