import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import replace from 'gulp-replace';

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
        src: 'js/**/*', // Все файлы и папки в lib
        dest: 'docs/js/',
    },
    images: {
        src: 'img/**/*.{jpg,jpeg,png,svg,gif}',
        dest: 'docs/img/',
    },
};

// Обработка HTML с инклюдами
export const html = () =>
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

export const lib = () =>
    gulp.src(paths.lib.src).pipe(gulp.dest(paths.lib.dest));

// Копирование CSS
export const css = () =>
    gulp.src(paths.css.src).pipe(gulp.dest(paths.css.dest));

export const js = () =>
    gulp.src(paths.js.src).pipe(gulp.dest(paths.js.dest));

// Копирование изображений
export const images = () =>
    gulp.src(paths.images.src).pipe(gulp.dest(paths.images.dest));

// Основная задача сборки
export const build = gulp.series(html, css, images, lib, js);

export default build;
