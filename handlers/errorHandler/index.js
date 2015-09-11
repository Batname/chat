const errorhandler = require('errorhandler');
const path = require('path');

exports.init = app => {

  if (app.get('env') === 'development') {
    app.use(errorhandler());
  } else {
    app.use(require('./middleware/productionHandler'));
  }

};

