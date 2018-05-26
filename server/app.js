const express = require('express')
const errorhandler = require('errorhandler')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')
const stripe = require("stripe")("sk_test_SomoK17KafHOIXWqNAegapd5");



let app = express()


app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())
app.use(cors())




app.get('/updateCard', routes.updateCard)



app.listen(3000)
