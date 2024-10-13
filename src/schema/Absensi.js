import mongoose from "mongoose";
import ticketSchema from "./Ticket.js";

const absensiSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
        index: true,
    },
    title: {
        type: String,
        default: "Dzuhur",
    },
    status: {
        type: Boolean,
        default: false,
    },
    openedBy: {
        type: String,
        default: "Anon",
    },
    note: {
        type: String,
        default: "",
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
        default: [],
    },
});

const Absensi = mongoose.model("Absensi", absensiSchema);

export default Absensi;
