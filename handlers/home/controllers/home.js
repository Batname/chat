const templatePath = require.resolve('../templates/home.jade');
const templateFn = require('jade').compileFile(templatePath);

exports.home = (req, res, next) => {
  req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
  res.write(templateFn({ body: 'Express', title: 'Home page', numberOfVisits: req.session.numberOfVisits}));
  res.end();
};