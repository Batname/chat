const express = require('express');
const controllers = require('./controllers/user');
let router = express.Router();

router.get('/', controllers.list);
router.get('/:id', controllers.user);

module.exports = router;