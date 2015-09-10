exports.home = (req, res, next) => {
  res.render('index', { body: 'Express', title: 'Home page'});
};