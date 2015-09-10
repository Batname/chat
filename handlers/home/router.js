const express = require('express');
const controllers = require('./controllers/home');
let router = express.Router();

router.get('/', controllers.home);

module.exports = router;