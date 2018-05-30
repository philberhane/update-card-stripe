const express = require('express')
const errorhandler = require('errorhandler')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')




let app = express()
app.use(express.static('../client'))


app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())
app.use(cors())




app.post('/updateCard', routes.updateCard)

app.get('/', function (req, res) {
    const path = require('path')
    res.sendFile(path.resolve('../client/index.html'))
})



app.listen(3000)
