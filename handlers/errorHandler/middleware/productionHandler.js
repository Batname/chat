const HttpError = require('../libs/httpError').HttpError;

const templatePath = require.resolve('../templates/error.jade');
const templateFn = require('jade').compileFile(templatePath);

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
    err = new HttpError(500);
      res.status(err.status);
      if (res.req.headers['x-requested-with'] == 'XMLHttpRequest') {
        res.json(err);
      } else {
        res.write(templateFn({error: err}));
        res.end();
      }
  }
};