import mongoose from "mongoose";

const userAttendanceSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    kode: {
        type: String,
        enum: ["I", "S", "A", "H", "-"],
        default: "-",
    },
    keterangan: {
        type: String,
        default: "",
    },
    waktuAbsen: {
        type: Date,
        default: Date.now,
    },
    koordinat: {
        type: [Number],
        default: [0, 0],
    },
});

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
    users: {
        type: [userAttendanceSchema],
        default: [],
    },
});

const Absensi = mongoose.model("Absensi", absensiSchema);

export default Absensi;
