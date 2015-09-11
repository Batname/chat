const redis   = require("redis");
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const client  = redis.createClient();
const config = require('config');
const _ = require('lodash');

exports.init = app => {
  app.use(session(_.merge(config.session,{store: new RedisStore(_.merge(config.redis, {client: client}))})));
};

