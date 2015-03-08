'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('connect', function () {
    //move files
    gulp.src("bower_components/d3/d3.js")
        .pipe(gulp.dest("app/scripts/"));
    gulp.src("bower_components/bootstrap/dist/css/bootstrap.css")
        .pipe(gulp.dest("app/styles"));
    gulp.src("bower_components/bootstrap/dist/css/bootstrap.css.map")
        .pipe(gulp.dest("app/styles"));

    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('app'))
        .use(connect.directory('app'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('serve', ['connect'], function () {
    require('opn')('http://localhost:9000');
});

gulp.task('watch', ['connect', 'serve'], function () {
    var server = $.livereload();

    gulp.watch([
        'app/*.html',
        'app/styles/**/*.css',
        'app/scripts/**/*.js'
    ]).on('change', function (file) {
        server.changed(file.path);
    });
});

