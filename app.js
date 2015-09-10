
const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const config = require('config');
const router = express.Router();
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const defaultLogger = require('./modules/logger').default;

let homeRouters = require('./routes/index');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'jade');

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// middlewares loaders
const middlewares = fs.readdirSync(path.join(__dirname, '/middlewares')).sort();
middlewares.forEach((middleware) => {
  app.use(require('./middlewares/' + middleware)());
});

app.use('/', homeRouters);

app.use((req, res) => res.status(404).send('Page not found'));

http.createServer(app).listen(config.port, () => {
	defaultLogger.info(`Express server listening on port ${config.port}`);
});