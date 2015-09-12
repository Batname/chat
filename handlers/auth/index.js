const login = require('./router').login;
const logout = require('./router').logout;

exports.init = app => {
  app.use('/login', login);
  app.use('/logout', logout);
};

