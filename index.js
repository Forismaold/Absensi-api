// import
import express from 'express'
import { connectDB } from './src/database/connectDB.js'
import User from './src/schema/User.js'
// config
const app = express()
const port = process.env.PORT || 3001

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

app.use((req, res) => {
    res.send('404, kami belum selesai membuat backend!')
})

connectDB().then(() => {
    app.listen(port, () => {
        console.log("listening for requests", port)
    })
})