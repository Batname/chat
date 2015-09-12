const User = require('./users/models/user').User;

exports.init = app => {
  app.use((req, res, next) => {
    req.user = res.locals.user = null;

    if (!req.session.user) return next();

    User.findById(req.session.user, (err, user) => {
      if (err) return next(err);

      req.user = res.locals.user = user;
      next();
    });
  });
};

