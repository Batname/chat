const express = require('express');
const controllers = require('./controllers/chat');
let router = express.Router();

router.get('/', controllers.get);

module.exports = router;
