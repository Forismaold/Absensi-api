import mongoose from "mongoose"

const absensiSchema = new mongoose.Schema({
    users: {
        type: [{
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
            _id: mongoose.Schema.Types.ObjectId,
            nama: {type: String, default: 'Anon'}
        }],
        default: []
    },
    date: {
        type: Date,
        default: Date.now()
    },
    title: {
        type: String,
        default: 'Dzuhur'
    }
})

const Absensi = mongoose.model('Absensi', absensiSchema)

export default Absensi