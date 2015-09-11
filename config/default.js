module.exports = {
	port: 3000,
  projectRoot: process.cwd(),
	env: 'development',
  mongoose: {
    uri:     'mongodb://localhost/chat',
    options: {
      server: {
        socketOptions: {
          keepAlive: 1
        },
        poolSize: 5
      }
    }
  },
  session:{
    secret: 'chat',
    saveUninitialized: true,
    resave: false,
    prefix: 'chat-sess:',
    key: 'PHPSESSID',
    cookie: {
      maxAge: null,
      path: '/',
      httpOnly: true
    }
  },
  redis: {
    host: 'localhost',
    port: 6379,
  }
};