import mongoose from "mongoose";

const userAttendanceSchema = new mongoose.Schema({
    absen: {
        type: Boolean,
        default: null
    },
    kode: {
        type: String,
        enum: ['I', 'S', 'A', 'H', '-'],
        default: '-'
    },
    keterangan: {
        type: String,
        default: '',
    },
    waktuAbsen: {
        type: Date,
        default: new Date(),
    },
    koordinat: {
        type: [Number],
        default: [0, 0],
    },
    _id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
})

const riwayatSchema = new mongoose.Schema({
    users: {
        type: [userAttendanceSchema],
        default: []
    },
    date: {
        type: Date,
        default: Date.now()
    },
    title: {
        type: String,
        default: 'Dzuhur'
    },
    note: {
        type: String,
        default: ''
    },
    coordinates: {
        first: {
            type: [Number],
            default: [],
        },
        second: {
            type: [Number],
            default: [],
        },
    },
})

// riwayatSchema.virtual('tidakAbsen').get(function() {
//     return this.users.filter(user => user.absen === false)
// })
// riwayatSchema.virtual('belumAbsen').get(function() {
//     return this.users.filter(user => user.absen === null)
// })
// riwayatSchema.virtual('sudahAbsen').get(function() {
//     return this.users.filter(user => user.absen === true)
// })

const Riwayat = mongoose.model('Riwayat', riwayatSchema)
export default Riwayat