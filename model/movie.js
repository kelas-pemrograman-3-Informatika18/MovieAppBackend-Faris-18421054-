const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = new Schema({
  judulfilm: {
    type: String
  },
  harga: {
    type: Number
  },
  tahun: {
    type: String,
    default: new Date().getFullYear().toString()
  },
  genre: {
    type: String
  },
  rating: {
    type: Number,
    default: 0
  },
  deskripsi: {
    type: String
  },
  image: {
    type: String
  }
})

module.exports = mongoose.model('movie', MovieSchema)