const journalRoutes = require('express').Router()
const journalController = require('../controllers/journalController')


journalRoutes.post('/journal', journalController.create)



module.exports = journalRoutes