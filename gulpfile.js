/**
 * Created by zhangrui on Fri Jan 29 2016.
 */
var gulp = require("gulp");
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var insert = require('gulp-insert');
var concat = require('gulp-concat');
var umdwrap = require('gulp-ngm-umdwrap');

var buildPath = './build';

gulp.task('wrap', function () {
    gulp.src(['./src/canvas-combo.js'])
        .pipe(umdwrap())
        .pipe(concat('canvas-combo.common.js'))
        .pipe(uglify())
        .pipe(gulp.dest(buildPath));
});

gulp.task('compress', function () {
    gulp.src(['./src/canvas-combo.js'])
        .pipe(uglify())
        .pipe(gulp.dest(buildPath));
});

gulp.task('clean', function () {
    return gulp.src(buildPath + '/*').pipe(clean());
});

gulp.task("build", ["clean"], function(){
    gulp.start("wrap", "compress");
});

gulp.task("default", ["build"]);
