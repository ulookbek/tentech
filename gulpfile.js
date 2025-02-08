const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const replace = require('gulp-replace');

// Пути к исходным и собранным файлам
const paths = {
    html: {
        src: 'src/**/*.html',
        dest: 'docs/',
    },
    css: {
        src: 'css/**/*.css',
        dest: 'docs/css/',
    },
    lib: {
        src: 'lib/**/*', // Все файлы и папки в lib
        dest: 'docs/lib/',
    },
    js: {
        src: 'js/**/*.js',
        dest: 'docs/js/',
    },
    images: {
        src: 'img/**/*.{jpg,jpeg,png,svg,gif}',
        dest: 'docs/img/',
    },
};

// Обработка HTML с инклюдами
const html = () =>
    gulp
        .src(paths.html.src)
        .pipe(
            fileInclude({
                prefix: '@@', // Префикс для инклюдов
                basepath: '@file', // Базовый путь к инклюдам
            })
        )
        // Исправление путей к изображениям
        .pipe(replace(/(\.\.\/)+img\//g, './img/')) // Заменяем все '../img/' на './img/'
        .pipe(replace(/(\.\.\/)+lib\//g, './lib/'))
        .pipe(replace(/(\.\.\/)+css\//g, './css/'))
        .pipe(replace(/(\.\.\/)+js\//g, './js/'))
        .pipe(gulp.dest(paths.html.dest));

// Копирование библиотеки lib
const lib = () =>
    gulp.src(paths.lib.src).pipe(gulp.dest(paths.lib.dest));

// Копирование CSS
const css = () =>
    gulp.src(paths.css.src).pipe(gulp.dest(paths.css.dest));

// Копирование JS
const js = () =>
    gulp.src(paths.js.src).pipe(gulp.dest(paths.js.dest));

// Копирование изображений
const images = () =>
    gulp.src(paths.images.src).pipe(gulp.dest(paths.images.dest));

// Основная задача сборки
const build = gulp.series(html, css, images, lib, js);

module.exports = {
    html,
    lib,
    css,
    js,
    images,
    build,
    default: build,
};
