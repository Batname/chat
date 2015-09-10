const bunyan = require('bunyan');

function reqSerializer(req) {
  return {
    method: req.method,
    url: req.url,
    headers: req.headers
  };
}

exports.request = bunyan.createLogger({
  name: 'myapp',
  serializers: {
    req: reqSerializer
  }
});

exports.default = bunyan.createLogger({
  name: "app",
  level: 'debug'
});