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

        res.redirect('/tasks/add')
    })
}

exports.remove = (req, res) => {
    db.query(`DELETE FROM tasks WHERE task_id = ${req.params.id}`, function (error, results, fields) {
        if (error) throw error;
        res.redirect('/')
    })
}

exports.edit = (req, res) => {
    // db.query('UPDATE tasks SET task_title = ?, task_category = ?, task_assignee = ? , task_status = ? WHERE id = ?', ['a', 'b', 'c', req.params.id], function (error, results, fields) {
    //     if (error) throw error;
    //     // ...
    // })
    // console.log(req.body.task_title)
    res.render('tasks/edit')

}