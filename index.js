// import
import express from 'express'
import { connectDB } from './src/database/connectDB.js'
import bodyParser from 'body-parser'
import cors from 'cors'

import User from './src/schema/User.js'
import akun from './src/akun.js'
import users from './src/users.js'
// config
const app = express()
const port = process.env.PORT || 3001

// middleware
app.use('*', cors({
    origin: process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : ['https://absensiswa.netlify.app'],
    methods: 'GET,PUT,POST,DELETE',
}))
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//     next()
// })
app.use(bodyParser.json())

app.use('/akun', akun)

app.use('/users', users)

app.get('/new', async (req, res) => {
    const data = new User({
        "NIS": 123426,
        "avatar": "https://th.bing.com/th/id/OIP.ZvirSVF47jPTxgL0yJ6pyAAAAA?pid=ImgDet&rs=1",
        "nama": "Saha",
        "nama_panggilan": "Eta",
        "password": "adipass123",
        "email": "adi.susanto@example.com",
        "jenis_kelamin": "L",
        "nomor_absen": 1,
        "kelas": "XI IPS 2",
        "agama": "Islam",
        "peran": ["siswa"],
        "absen": false
    })
    data.save().then(data => {
        res.json(data)
    })
})

app.post('/test', (req, res) => {
    res.json({text: 'Hola ' + req.body.text})
})


















app.use((req, res) => {
    res.send('404, kami belum selesai membuat backend!')
})

connectDB().then(() => {
    app.listen(port, () => {
        console.log("listening for requests", port)
    })
})