const nodemon = require('gulp-nodemon');

module.exports = () => {
	return cb => {
		nodemon({
			'script': 'app.js',
			nodeArgs: ['--harmony_arrow_functions', '--use-strict']
		})
		.on('restart', () => console.log('restart'));
	};
};