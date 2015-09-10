const gulp = require('gulp');
const jshint = require('gulp-jshint');

module.exports = options => {
	return () => gulp.src(options.path)
									 .pipe(jshint())
									 .pipe(jshint.reporter('default'));
};