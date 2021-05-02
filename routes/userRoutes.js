const userRoutes = require('express').Router()
const userController = require('../controllers/userController')


userRoutes.post('/', userController.create)
userRoutes.post('/login', userController.login)
userRoutes.post('/journal', userController.journal)


module.exports = userRoutes