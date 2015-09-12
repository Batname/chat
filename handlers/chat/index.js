const router = require('./router');
const checkAuth = require('../auth/middleware/checkAuth');

exports.init = app => {
  app.use('/chat', checkAuth, router);
};


