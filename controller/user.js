const userModel = require('../model/user')
const bcrypt = require('bcrypt')
const { requestRespone } = require('../config')

exports.register = (data) =>
  new Promise((resolve, reject) => {
    userModel.findOne({
      username: data.username
    }).then(user => {
      if (user) {
        resolve(requestRespone.gagal('username is already exist'))
      } else {
        bcrypt.hash(data.password, 10, (rr, hash) => {
          data.password = hash
          userModel.create(data)
            .then(() => resolve(requestRespone.sukses('username has been registered')))
            .catch(() => reject(requestRespone.serverError))
        })
      }
    })
  })

exports.login = (data) =>
  new Promise((resolve, reject) => {
    userModel.findOne({
      username: data.username
    }).then((user) => {
      if (user) {
        if (bcrypt.compareSync(data.password, user.password)) {
          resolve(requestRespone.suksesLogin(user))
        } else {
          reject(requestRespone.gagal('wrong password'))
        }
      } else {
        reject(requestRespone.gagal('Username does not exist'))
      }
    })
  })

exports.getAllUser = () =>
  new Promise((resolve, reject) => {
    userModel.find({
      level: 2
    }).then(user => {
      resolve(requestRespone.suksesWithData(user))
    }).catch(() => reject(requestRespone.serverError))
  })