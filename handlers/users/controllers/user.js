const User = require('../models/user').User;

exports.list = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.json(users);
  });
};

exports.user = (req, res, next) => {
  try {
    let id = new ObjectID(req.params.id);
  } catch (e) {
    return next(404);
  }

  User.findById(id, (err, user) => {
    if(err) return next(err);
    res.json(user);
  });

};