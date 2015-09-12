const express = require('express');
const controllers = require('./controllers/auth');
let login = express.Router();
let logout = express.Router();

login.post('/', controllers.login);
login.get('/', controllers.get);
logout.post('/', controllers.logout);

exports.login = login;
exports.logout = logout;