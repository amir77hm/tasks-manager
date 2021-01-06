const db = require('../boot/connection')
const taskStatus = require('../models/tasks/tasks_status')

exports.create = (req, res) => {
    res.render('tasks/create')
}

exports.store = (req, res) => {
    let tasks = {
        task_title: req.body.task_title,
        task_category: req.body.task_category,
        task_assignee: req.body.task_assignee,
        task_status: taskStatus.CREATED
    }
    db.query("INSERT INTO `tasks` SET ?", tasks, (error, results, fields) => {

        if (error) throw error

        res.render('tasks/create')
    })
}