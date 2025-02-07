// gulpfile.js
const gulp = require('gulp');
const fileInclude = require('gulp-file-include');

function html() {
    return gulp
        .src(['src/*.html', '!src/components/*.html'])
        .pipe(
            fileInclude({
                prefix: '@@',
                basepath: '@file',
            })
        )
        .pipe(gulp.dest('dist'));
}

exports.default = html;