
const app = require('./modules/application');
const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const config = require('config');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const defaultLogger = require('./modules/logger').default;


// view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'jade');

// Middleware
app.use(logger('dev'));
app.requireHandler(__dirname, ['session']);
app.requireHandler(__dirname, ['loadUser']);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'))

// handlers middlewares loaders
app.requireHandler(__dirname, ['clsContext', 'requestUrlLogger']);

// load handlers
app.requireHandler(__dirname, ['home', 'auth', 'users', 'chat', 'errorHandler']);

app.use((req, res) => res.status(404).send('Page not found'));

http.createServer(app).listen(config.port, () => {
	defaultLogger.info(`Express server listening on port ${config.port}`);
});