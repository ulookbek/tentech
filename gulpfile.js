// gulpfile.js
const gulp = require('gulp');

const fileInclude = require('gulp-file-include');

function html() {
    return gulp
        .src(['scss/**/*','img/**/*', 'js/**/*', 'lib/**/*', 'css/**/*','src/*.html', '!src/components/*.html'])
        .pipe(
            fileInclude({
                prefix: '@@',
                basepath: '@file',
            })
        )
        .pipe(gulp.dest('docs'));
}

// Определяем экспортируемые задачи
exports.build = html;
// Если хотите, чтобы по умолчанию сборка запускалась и затем следила за изменениями:
exports.default = gulp.series(html);
