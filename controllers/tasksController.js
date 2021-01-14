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

    })
    res.redirect('/tasks/add')
}

exports.remove = (req, res) => {
    db.query(`DELETE FROM tasks WHERE task_id = ${req.params.id}`, function (error, results, fields) {
        if (error) throw error;
        res.redirect('/')
    })
}

exports.edit = (req, res) => {

    const urlParams = parseURLParams(req.url)
    if (urlParams !== undefined) {

        let task_status;
        switch (urlParams.inlineRadioOptions[0]) {
            case 'option1':
                task_status = 1
                break;
            case 'option2':
                task_status = 2
                break;
        }

        db.query('UPDATE tasks SET task_title = ?, task_category = ?, task_assignee = ?, task_status =?  WHERE task_id = ?', [`${urlParams.task_title}`, `${urlParams.task_category}`, `${urlParams.task_assignee}`, task_status, req.params.id], function (error, results, fields) {
            if (error) throw error;
            console.log(urlParams)
        });
    }


    res.render('tasks/edit')
}

// get value from url
function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}
