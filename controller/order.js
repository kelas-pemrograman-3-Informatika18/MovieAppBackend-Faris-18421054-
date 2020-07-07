const orderModel = require('../model/order')
const { requestRespone } = require('../config')
const objectId = require('mongoose').Types.ObjectId

exports.insert = (data) =>
  new Promise((resolve, reject) => {
    try {
      orderModel.create(data)
        .then(() => resolve(requestRespone.sukses('Transaction Done')))
        .catch(() => reject(requestRespone.serverError))
    } catch (error) {
      console.log(error)
    }
  })

exports.getAllOrder = () =>
  new Promise((resolve, reject) => {
    orderModel.aggregate([
      {
        $lookup: {
          from: "movies",
          localField: "idFilm",
          foreignField: "_id",
          as: "dataMovie"
        }
      },
      {   
        $lookup: {
          from: "users",
          localField: "idUser",
          foreignField: "_id",
          as: "dataUser"
        }
      }
    ])
    .then(res => {
      resolve(requestRespone.suksesWithData(res))
    })
    .catch(() => reject(requestRespone.serverError))
  })

exports.konfirmasiOrder = (id) =>
  new Promise((resolve, reject) => {
    orderModel.updateOne({
      _id: objectId(id)
    },
    {
      status: 2
    }).then(() => resolve(requestRespone.sukses('Order has been Confirmed')))
    .catch(() => reject(requestRespone.serverError))
  })

exports.getOrder = (id) =>
  new Promise((resolve, reject) => {
    orderModel.aggregate([
      {
        $match: {
          idUser: objectId(id)
        }
      },
      {
        $lookup: {
          from: "movies",
          localField: "idFilm",
          foreignField: "_id",
          as: "dataMovie"
        }
      }
    ])
    .then(res => {
      resolve(requestRespone.suksesWithData(res))
    })
    .catch(() => reject(requestRespone.serverError))
  })

exports.terimaOrder = (id) =>
  new Promise((resolve, reject) => {
    orderModel.updateOne({
      _id: objectId(id)
    },
    {
      status: 3
    }).then(() => resolve(requestRespone.sukses('Order has been Accepted')))
    .catch(() => reject(requestRespone.serverError))
  })