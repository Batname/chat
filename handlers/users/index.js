const router = require('./router');

exports.User = require('./models/user');

exports.init = app => {
  app.use('/users', router);
};

