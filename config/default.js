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
};