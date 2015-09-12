const templatePath = require.resolve('../templates/chat.jade');
const templateFn = require('jade').compileFile(templatePath);

exports.get = (req, res)  => {
  res.header("Content-Type", "text/html; charset=utf-8");
  res.write(templateFn({user: req.user}));
  res.end();
};