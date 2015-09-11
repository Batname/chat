exports.home = (req, res, next) => {
  req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
  res.render('index', { body: 'Express', title: 'Home page', numberOfVisits: req.session.numberOfVisits});
};