import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import csso from 'gulp-csso';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import sass from 'gulp-sass';
import plumber from 'gulp-plumber';
import { spawn } from 'child_process';
import browserSync from 'browser-sync';

const jekyllCommand = (/^win/.test(process.platform)) ? 'jekyll.bat' : 'jekyll';

gulp.task('jekyll-build', function (done) {
    return spawn(jekyllCommand, ['build'], { stdio: 'inherit' }).on('close', done);
});

gulp.task('jekyll-rebuild', gulp.series(['jekyll-build'], function (done) {
    browserSync.reload();
    done();
}));

gulp.task('browser-sync', gulp.series(['jekyll-build'], function(done) {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
    done();
}));

gulp.task('sass', function() {
    return gulp.src('src/styles/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(csso())
        .pipe(gulp.dest('assets/css/'));
});

gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*.{ttf,woff,woff2}')
        .pipe(plumber())
        .pipe(gulp.dest('assets/fonts/'));
});

// gulp.task('imagemin', function() {
//     return gulp.src('src/img/*', { encoding: false })
//         .pipe(imagemin([
//             imageminMozjpeg({ quality: 80, progressive: true })
//         ]))
//         .pipe(gulp.dest('assets/img'));
// });
// gulp.task('imagemin', function() { return gulp.src('src/img/*.*', { encoding: false }) .pipe(imagemin()) .pipe(gulp.dest('assets/img')); });

gulp.task('imagemin', function() {
    return gulp.src('src/img/*', { encoding: false })
        .pipe(imagemin([
            imageminMozjpeg({ quality: 80, progressive: true })
        ]))
        .on('data', function(file) {
            console.log('File being processed: ', file.path);
        })
        .pipe(gulp.dest('assets/img'))
		.pipe(gulp.dest('_site/assets/img'));
});

gulp.task('copy-images', function() { return gulp.src('assets/img/*') .pipe(gulp.dest('_site/assets/img')); });

gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/'));
});

gulp.task('watch', function() {
    gulp.watch('src/styles/**/*.scss', gulp.series(['sass', 'jekyll-rebuild']));
    gulp.watch('src/js/**/*.js', gulp.series(['js', 'jekyll-rebuild']));
    gulp.watch('src/fonts/**/*.{tff,woff,woff2}', gulp.series(['fonts']));
    gulp.watch('src/img/**/*.{jpg,png,gif}', gulp.series(['imagemin']));
    gulp.watch(['*html', '_includes/*html', '_layouts/*.html'], gulp.series(['jekyll-rebuild']));
});

gulp.task('default', gulp.series(['js', 'sass', 'fonts', 'copy-images','browser-sync', 'watch']));
