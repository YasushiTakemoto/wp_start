var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var jade = require('gulp-jade-php');
var postcss = require('gulp-postcss');
var cssnext = require('gulp-cssnext');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

var SortedCSS = [
    'src/css/app.css',
    'src/css/foundation.css',
    'src/css/test.css'
];

gulp.task('imagemin', function(){
    gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img/'))
        .pipe(reload({stream:true}));  
});

gulp.task('css',function(){
    gulp.src(SortedCSS)
        .pipe(plumber())
        .pipe(postcss([require('postcss-nested')]))
        .pipe(cssnext([require('gulp-cssnext')]))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./'))
        .pipe(notify('css task finished'))
        .pipe(reload({stream:true}));        
});

gulp.task('jade',function(){
    gulp.src('src/jade/*.jade')
        .pipe(plumber())
        .pipe(jade({pretty:true}))
        .pipe(gulp.dest('./'))
        .pipe(notify('jade task finished'))
        .pipe(reload({stream:true}));
});

gulp.task('js', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(notify('js task finished'))
    .pipe(reload({stream:true}));
});

gulp.task('default',function(){
    browserSync.init({
        server: "./"
    });
    gulp.watch('src/css/*.css',['css']);
    gulp.watch('src/jade/*.jade',['jade']);
    gulp.watch('src/js/*.js',['js']);
    gulp.watch('src/img/**/*',['imagemin']);
});
