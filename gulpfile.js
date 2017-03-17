/*jshint node:true*/
'use strict';

var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    map    = require('map-stream'),
    uglify = require('gulp-uglify'),
    pkg    = require('./package.json'),
    date   = new Date(),
    banner = [
        '/**',
        ' * ' + pkg.name + ' ' + pkg.version,
        ' * ' + pkg.homepage,
        ' * Copyright (c) 2013-' + date.getFullYear() + ' Dr. Kibitz, http://drkibitz.com',
        ' * ' + pkg.description,
        ' * built: ' + date,
        ' */',
        ''
    ].join('\n');

gulp.task('jshint', function () {
    gulp.src(['gulpfile.js', 'src/**/*.js', 'test/**/*.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('uglify', function () {
    return gulp.src('src/index.js')
        .pipe(map(function (file, cb) {
            file.contents = Buffer.concat([
                new Buffer('(function(module,exports){'),
                file.contents,
                new Buffer('}(module,exports));')
            ]);
            cb(null, file);
        }))
        .pipe(uglify({wrap: 'nodes'}))
        .pipe(map(function (file, cb) {
            file.contents = Buffer.concat([new Buffer(banner), file.contents]);
            cb(null, file);
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['jshint', 'uglify']);
