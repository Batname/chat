const router = require('./router');

exports.init = app => {
  app.use('/', router);
};

