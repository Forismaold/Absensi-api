import express from 'express'
import { jwtDecode } from 'jwt-decode';
import User from './schema/User.js';
const route = express.Router()

route.post('/daftar', (req, res) => {
    const user = new User()

    res.json(user)
})

route.post('/login', (req, res) => {
    try {
        const credential = jwtDecode(req.body.credential.credential)
        console.log(credential);
        res.json(credential)
    } catch (error) {
        res.status(500).json({error})
        console.log(req.body, error);
    }
})

export default route