// import
import express from 'express'
import { connectDB } from './src/database/connectDB.js'
import bodyParser from 'body-parser'
import cors from 'cors'

import User from './src/schema/User.js'
import akun from './src/akun.js'
import users from './src/users.js'
import absen from './src/absen.js'
import moment from 'moment-timezone'
import riwayats from './src/riwayat.js'
import absensi from './src/absensi.js'

// config
const app = express()
const port = process.env.PORT || 3001
const nodeEnv = process.env.NODE_ENV || undefined

// middleware
app.use('*', cors({
    origin: nodeEnv === 'development' ? ['http://localhost:3000'] : ['https://absensiswa.netlify.app'],
    methods: 'GET,PUT,POST,DELETE',
}))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({hello: 'world'})
})

app.use('/akun', akun)

app.use('/users', users)

app.use('/absen', absen)

app.use('/absensi', absensi)

app.use('/riwayats', riwayats)













app.use((req, res) => {
    res.status(404).send('404, kami belum selesai membuat backend!')
})

connectDB().then(() => {
    app.listen(port, () => {
        console.log("listening for requests", port)
    })
})