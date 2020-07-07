const movieModel = require('../model/movie')
const { requestRespone } = require('../config')
const { Promise } = require('mongoose')
const { deleteimage } = require('../uploadconfig')
const objectId = require('mongoose').Types.ObjectId

exports.insertMovie = (data) =>
  new Promise((resolve, reject) => {
    movieModel.create(data)
    .then(() => resolve(requestRespone.sukses('Product has been inserted')))
    .catch(() => reject(requestRespone.serverError))
  })

exports.getAllMovie = () =>
  new Promise((resolve, reject) => {
    movieModel.find({})
      .then(movie => resolve(requestRespone.suksesWithData(movie)))
      .catch(error => reject(requestRespone.serverError))
  })

exports.getbyId = (id) =>
  new Promise((resolve, reject) => {
    movieModel.findOne({
      _id: objectId(id)
    }).then(movie => resolve(requestRespone.suksesWithData(movie)))
      .catch(error => reject(requestRespone.serverError))
  })

exports.edit = (data, id, changeImage) =>
  new Promise(async(resolve, reject) => {
    movieModel.updateOne({
      _id: objectId(id)
    }, data)
      .then(() => {
        if (changeImage) {
          deleteimage(data.oldImage)
        }
        resolve(requestRespone.sukses('Update Success'))
      }).catch(() => reject(requestRespone.serverError))
  })

exports.delete = (id) =>
  new Promise((resolve, reject) => {
    movieModel.findOne({
      _id: objectId(id)
    }).then(movie => {
      movieModel.deleteOne({
        _id: objectId(id)
      }).then(() => {
        deleteimage(movie.image)
        resolve(requestRespone.sukses('Delete Success'))
      }).catch(() => reject(requestRespone.serverError))
    })
  })