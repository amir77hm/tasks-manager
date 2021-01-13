const express = require('express')
const tasksController = require('../controllers/tasksController')

const router = express.Router()

router.get('/add', tasksController.create)
router.post('/add', tasksController.store)
router.get('/delete/:id', tasksController.remove)
router.get('/edit/:id', tasksController.edit)

module.exports = router