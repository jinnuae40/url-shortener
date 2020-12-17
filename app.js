global.baseDir = __dirname
global.logger = require(`${baseDir}/config/logger`)
require('dotenv').config()

var express = require('express');
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
require(`${baseDir}/config/mongoose`)(mongoose)

var indexRouter = require(`${baseDir}/routes/index`);
var app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/', indexRouter);

var port = process.env.PORT
app.listen(port, () => {
  logger.info({
    label: 'run',
    message: `Application is running on port ${port} `
  })
});