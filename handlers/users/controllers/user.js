const User = require('../models/user').User;
const ObjectID = require('mongodb').ObjectID;

exports.list = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.json(users);
  });
};

exports.user = (req, res, next) => {
  let id;
  try {
    id = new ObjectID(req.params.id);
  } catch (e) {
    return next(e);
  }

  User.findById(id, (err, user) => {
    if(err) return next(err);
    res.json(user);
  });

};