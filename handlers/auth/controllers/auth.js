const templatePath = require.resolve('../templates/login.jade');
const templateFn = require('jade').compileFile(templatePath);
const User = require('../../users/models/user').User;

exports.get = (req, res)  => {
  res.header("Content-Type", "text/html; charset=utf-8");
  res.write(templateFn({}));
  res.end();
};

exports.login = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  User.authorize(username, password, (err, user)  => {
    if (err) return next(err);
    req.session.user = user._id;
    res.send({});
  });
};

exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
};