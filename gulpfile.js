// Подключаем Gulp
let gulp = require("gulp");
// Подключаем плагины Gulp
let sass = require("gulp-sass"), // переводит SASS в CSS
    cleanCSS = require('gulp-clean-css'), // Минимизация CSS
    autoprefixer = require('gulp-autoprefixer'), // Проставлет вендорные префиксы в CSS для поддержки старых браузеров
    imagemin = require('gulp-imagemin'), // Сжатие изображений
    concat = require("gulp-concat"), // Объединение файлов - конкатенация
    uglify = require("gulp-uglify"), // Минимизация javascript
    rename = require("gulp-rename"), // Переименование файлов
    browserSync = require('browser-sync');


// Создаем простой таск
gulp.task('myFirstTask', async function() {
    console.log('Привет, я твой первый таск!');
});
// Запуск тасков по умолчанию
// gulp.task("default", gulp.series("myFirstTask"));

// Копирование файлов HTML в папку dist
gulp.task("fonts", function() {
    return gulp.src("src/fonts/**/*.+(eot|otf|ttf|woff|woff2)")
        .pipe(gulp.dest("dist/fonts"));
});
gulp.task("icons", function() {
    return gulp.src("src/fonts/font-awesome-4.7.0/fonts/fontawesome-webfont.*")
        .pipe(gulp.dest("dist/fonts/fonts"));
});
// Копирование файлов HTML в папку dist
gulp.task("html", function() {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("dist"));
});
// Объединение, компиляция Sass в CSS, простановка венд. префиксов и дальнейшая минимизация кода
gulp.task("sass", function() {
    return gulp.src(['src/scss/*.scss', ])
        .pipe(concat('styles.scss'))
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream(true));
});
// Объединение и сжатие JS-файлов
gulp.task("scripts", function() {
    return gulp.src([
        "node_modules/jquery/dist/jquery.js",
        "node_modules/bootstrap/dist/js/bootstrap.js",
        "src/js/owl.carousel.min.js",
        "node_modules/scrollwatch/dist/ScrollWatch-2.0.1.js",
        "src/js/*.js"]) // директория откуда брать исходники
        .pipe(concat('scripts.js')) // объеденим все js-файлы в один
        .pipe(uglify()) // вызов плагина uglify - сжатие кода
        .pipe(rename({ suffix: '.min' })) // вызов плагина rename - переименование файла с приставкой .min
        .pipe(gulp.dest("dist/js")); // директория продакшена, т.е. куда сложить готовый файл
});
// Сжимаем картинки
gulp.task('imgs', function() {
    return gulp.src("src/images/**/*.+(jpg|jpeg|png|gif)")
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true
        }))
        .pipe(gulp.dest("dist/images"))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: ["./dist"]
        },
        notify: false,
        browser: "firefox",

    });

    gulp.watch("src/scss/*.scss", ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task("watch", function() {
    gulp.watch("src/*.html", gulp.series('html'));
    gulp.watch("src/js/*.js", gulp.series('scripts'));
    gulp.watch("src/scss/*.scss", gulp.series('sass'));
    gulp.watch("src/images/*.+(jpg|jpeg|png|gif)", gulp.series('imgs'));
});
gulp.task("default", gulp.series("html", "sass", "scripts", "imgs", "fonts", "myFirstTask", "icons", "watch", "browser-sync"));