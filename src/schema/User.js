import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  NIS: {
    type: Number,
    required: true,
  },
  avatar: {
    type: String,
    default: 'https://th.bing.com/th/id/OIP.ZvirSVF47jPTxgL0yJ6pyAAAAA?pid=ImgDet&rs=1'
  },
  nama: {
    type: String,
    required: true
  },
  panggilan: {
    type: String,
    default: '-'
  },
  password: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: '-'
  },
  jenisKelamin: {
    type: String,
    enum: ['L', 'P', '-'],
    required: true,
    default: '-'
  },
  nomorAbsen: {
    type: Number,
    required: true,
    default: '-'
  },
  kelas: {
    type: String,
    required: true,
    default: '-'
  },
  agama: {
    type: String,
    default: 'Tidak diketahui'
  },
  peran: {
    type: [String],
    default: []
  },
  absen: {
    type: Boolean,
    default: false
  },
  lainnya: Object
})

const User = mongoose.model('User', userSchema)

export default User