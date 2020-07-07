const multer = require('multer')
const path = require('path')
const MAX_SIZE = 20000000
const fs = require('fs')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './statics')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + path.extname(file.originalname))
  }
})

const filefilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/.png' ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: MAX_SIZE
  }
})

const cekNull = (fileupload) => {
  if (fileupload === 'undefined' || fileupload === null) {
    return null
  } else {
    return fileupload[0].filename
  }
}

const deleteimage = (image) => {
  fs.unlinkSync(`./statics/${image}`)
}

module.exports = { multer, upload, cekNull, deleteimage }