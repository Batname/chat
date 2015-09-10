const HttpError = require('../libs/httpError').HttpError;

module.exports = (err, req, res, next) => {
  if (typeof err == 'number') { // next(404);
    err = new HttpError(err);
  }
  if (err instanceof HttpError) {
      res.status(err.status);
      if (res.req.headers['x-requested-with'] == 'XMLHttpRequest') {
        res.json(err);
      } else {
        res.render("error", {error: err});
      }
  } else {
    console.error(err);
    err = new HttpError(500);
      res.status(err.status);
      if (res.req.headers['x-requested-with'] == 'XMLHttpRequest') {
        res.json(err);
      } else {
        res.render("error", {error: err});
      }
  }
};