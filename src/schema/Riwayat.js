import mongoose from "mongoose";
import ticketSchema from "./Ticket.js";

const riwayatSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    openedBy: {
        type: String,
        default: 'Anon'
    },
    title: {
        type: String,
        default: 'Dzuhur'
    },
    note: {
        type: String,
        default: ''
    },
    allowedGrades: {
        type: [String],
        default: ['X.E', 'XI.F', 'XII.F'],
        enum: ['X.E', 'XI.F', 'XII.F']
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
    tickets: {
        type: [ticketSchema],
        default: []
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