const path = require('path')
const root = path.join(__dirname, '..')
const user =  require(path.join(root, 'middlewares', 'user'))
const jwt = require(path.join(root, 'middlewares', 'jwt'))
const reservation = require(path.join(root, 'middlewares', 'reservation'))

exports.user = user
exports.jwt = jwt
exports.reservation = reservation