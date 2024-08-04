import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    absen: {
        type: Boolean,
        default: false,
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
})

//           -7.4794339860615695, 110.2207225897892
//           -7.482783196112307, 110.22677857891918

export default ticketSchema