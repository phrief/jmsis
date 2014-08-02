var express = require('express')
var app = exports.app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

require('./static')
require('./api')

app.listen(8866)