const express = require('express');
const generalRouter = require('./routes/web')
const teskRouter = require('./routes/tasks')
const path = require('path')
const bodyParser = require('body-parser')

const application = express();

application.use(bodyParser.urlencoded({ extended: false }))

application.set('views', './views')
application.set('view engine', 'ejs')

application.use(express.static(path.join(__dirname, 'public')))


application.use('/', generalRouter)
application.use('/tasks', teskRouter)




const startApplication = () => {

    application.listen(5000, () => {
        console.log('app is running...')
    })
}

module.exports = startApplication