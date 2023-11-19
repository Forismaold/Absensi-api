import mongoose from "mongoose"

const absensiSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: 'Dzuhur'
    },
    status: {
        type: Boolean,
        default: false
    },
    openedBy: {
        type: String,
        default: 'Anon'
    },
    note: {
        type: String,
        default: ''
    }
})

const Absensi = mongoose.model('Absensi', absensiSchema)

export default Absensi