const CLS = require('continuation-local-storage');
const ns = CLS.getNamespace('app');
const reqLogger = require('../modules/logger').request;

exports.init = app => {
  app.use((req, res, next) => {
    reqLogger.info({req: ns.get('context').req}, 'something about handling this request');
    next();
  });
};

