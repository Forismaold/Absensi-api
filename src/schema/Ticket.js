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

//           -7.479682671896853, 110.22642752642415
//           -7.482806998088765, 110.23140951254469

export default ticketSchema