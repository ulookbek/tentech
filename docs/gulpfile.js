// gulpfile.js
const gulp = require('gulp');

const fileInclude = require('gulp-file-include');
const replace = require('gulp-replace');

function fixImagePaths() {
    return gulp.src('src/**/*.html')               // берем все HTML-файлы из папки src
        .pipe(replace(/src=(["'])\.\.\/img\//g, 'src=$1/tentech/img/')) // заменяем пути
        .pipe(gulp.dest('docs'));                      // сохраняем результат в папку docs
}

// Если изображения в CSS, можно аналогично заменить пути:
function fixCssPaths() {
    return gulp.src('src/**/*.css')
        .pipe(replace(/url\(["']?img\//g, 'url("/tentech/img/'))
        .pipe(gulp.dest('docs'));
}

function html() {
    return gulp
        .src(['./*'])
        .pipe(
            fileInclude({
                prefix: '@@',
                basepath: '@file',
            })
        )
        .pipe(gulp.dest('docs'));
}

// Определяем экспортируемые задачи
// exports.build = html;
// Если хотите, чтобы по умолчанию сборка запускалась и затем следила за изменениями:
exports.default = gulp.series(fixImagePaths, fixCssPaths, html);
