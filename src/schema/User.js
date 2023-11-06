import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  NIS: {
    type: Number,
    default: null
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
  email: {
    type: String,
    default: '-'
  },
  jenisKelamin: {
    type: String,
    enum: ['L', 'P', '-'],
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
  nomorKelas: {
    type: String,
    required: true,
    default: '-'
  },
  agama: {
    type: String,
    default: 'Islam'
  },
  peran: {
    type: [String],
    default: []
  },
  absen: {
    type: Boolean,
    default: false
  },
  hash: {
    type: String,
    default: ''
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
  lainnya: Object
})

userSchema.virtual('kelasLengkap').get(function() {
  return this.kelas + '-' + this.nomorKelas
})

const User = mongoose.model('User', userSchema)

export default User
