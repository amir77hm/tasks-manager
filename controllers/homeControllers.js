const db = require('../boot/connection')

exports.home = (req, res) => {
    db.query('SELECT * FROM `tasks`', (error, results, fildes) => {
        if (error) throw error

        res.render('tasks/list', { tasks: results })
    })
} 