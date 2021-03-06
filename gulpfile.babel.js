'use strict';

const gulp = require('gulp');

function laziRequireLoad(path){
	let args = [].slice.call(arguments, 1);
	return cb => {
		let task = require(path).apply(this, args);

		return task(cb);
	};
}

// Webpack build
const webpackConfig = {watch: true};
gulp.task('webpack', laziRequireLoad('./tasks/webpack', webpackConfig));

gulp.task('jshint', laziRequireLoad('./tasks/jshint', {path: ['./**/*js', '!node_modules/**/*']}));
gulp.task('user:test', laziRequireLoad('./tasks/userTest', {}));
gulp.task('test', ['jshint']);
gulp.task('run', laziRequireLoad('./tasks/nodemon'));