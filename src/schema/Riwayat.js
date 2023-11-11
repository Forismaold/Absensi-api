import mongoose from "mongoose";

const riwayatSchema = new mongoose.Schema({
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

riwayatSchema.virtual('tidakAbsen').get(function() {
    return this.users.filter(user => user.absen === false)
})
riwayatSchema.virtual('belumAbsen').get(function() {
    return this.users.filter(user => user.absen === null)
})
riwayatSchema.virtual('sudahAbsen').get(function() {
    return this.users.filter(user => user.absen === true)
})

const Riwayat = mongoose.model('Riwayat', riwayatSchema)
export default Riwayat