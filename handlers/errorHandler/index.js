const errorhandler = require('errorhandler');

exports.init = app => {

  if (app.get('env') !== 'development') {
    app.use(errorhandler());
  } else {
    app.use(require('./middleware/productionHandler'));
  }

};

