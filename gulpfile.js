const browserify = require('browserify');
const babelify = require('babelify');
const gulp = require('gulp');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const notify = require('gulp-notify');
const del = require('del');
const karmaServer = require('karma').Server;

gulp.task('scripts', function () {
    bundleApp();
});

gulp.task('deploy', function () {
    bundleApp();
});

gulp.task('test', function (done) {
    new karmaServer({
        configFile: __dirname + '/karma.conf.js',
    }, done).start();
});

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('watch', function () {
    gulp.watch('source/*.js', ['scripts']);
});

gulp.task('default', ['clean'], function () {
    gulp.start('test', 'scripts', 'watch');
});


function bundleApp() {
    const appBundler = browserify({
        entries: './source/app.js',
        debug: true
    });

    appBundler
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .on('error', gutil.log)
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(notify({message: 'Scripts task complete'}));
}