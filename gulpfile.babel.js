'use strict';

const gulp = require('gulp');

function laziRequireLoad(path){
	let args = [].slice.call(arguments, 1);
	return cb => {
		let task = require(path).apply(this, args);

		return task(cb);
	};
}

gulp.task('jshint', laziRequireLoad('./tasks/jshint', {path: ['./**/*js', '!node_modules/**/*']}));
gulp.task('test', ['jshint']);
gulp.task('run', laziRequireLoad('./tasks/nodemon'));