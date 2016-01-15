global.hostname = "localhost";

var gulp = require('gulp'),
sass = require('gulp-sass'),
jade = require('gulp-jade'),
autoprefixer = require('gulp-autoprefixer'),
minifycss = require('gulp-minify-css'),
rename = require('gulp-rename'),
spritesmith = require('gulp.spritesmith');

gulp.task('express', function() {
	var express = require('express');
	var app = express();
	app.use(require('connect-livereload')({port: 35729}));
	app.use(express.static(__dirname + '/app'));
	app.listen('8000', hostname);
});

var tinylr;
gulp.task('livereload', function() {
	tinylr = require('tiny-lr')();
	tinylr.listen(35729);
});

function notifyLiveReload(event) {
	var fileName = require('path').relative(__dirname, event.path);
	tinylr.changed({
		body: {
			files: [fileName]
		}
	});
}

gulp.task('styles', function () {
	gulp.src('assets/sass/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	})).on('error', sass.logError)
	.pipe(rename({suffix: '.min', prefix : '_'}))
	.pipe(autoprefixer({
		browsers: ['last 15 versions'],
		cascade: false
	}))
	.pipe(minifycss())
	.pipe(gulp.dest('app'));
});

gulp.task('jade', function() {
		return gulp.src('assets/jade/*.jade')
				.pipe(jade({
					pretty: true
				})).on('error', console.log)
				.pipe(gulp.dest('app'));
});


gulp.task('sprite', function() {
		var spriteData = 
				gulp.src('assets/sprite/*.*')
						.pipe(spritesmith({
								imgName: 'sprite.png',
								cssName: 'sprite.sass',
								cssFormat: 'sass',
								algorithm: 'binary-tree',
								cssTemplate: 'sass.template.mustache',
								cssVarMap: function(sprite) {
										sprite.name = 's-' + sprite.name
								}
						}));
		spriteData.img.pipe(gulp.dest('app/img/'));
		spriteData.css.pipe(gulp.dest('assets/sass/libs/'));
});

gulp.task('watch', function() {
	gulp.watch('assets/sass/*.sass', ['styles']);
	gulp.watch('assets/jade/*.jade', ['jade']);
	gulp.watch('assets/sprite/*.*', ['sprite']);
	gulp.watch('assets/app/*.css', notifyLiveReload);
	gulp.watch('assets/app/*.html', notifyLiveReload);
});

gulp.task('default', [ 'sprite' ,'styles', 'jade', 'express', 'livereload', 'watch'], function() {

});
