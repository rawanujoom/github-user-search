'use strict';

const express = require('express');
const morgan = require('morgan');
const errorHandler = require('../middleware/500.js');
const notFoundHandler = require('../middleware/404.js');
const apiRouter = require('../routes/github.js');

const app = express();
app
    .use(express.json())
    .use(morgan('dev'))
    .use(express.static('client/dist'))
    .use(apiRouter)
    .use('*', notFoundHandler)
    .use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};