var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var clean = require('gulp-clean');
var del = require('del');
// pull in the project TypeScript config
var tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', ['copyJson'], () => {
  return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("build"));
});

gulp.task('copyJson', function () {
  gulp.src('src/**/*.json')
    .pipe(gulp.dest('build'));
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('clean-build', function () {
  return gulp.src('build')
    .pipe(clean({ force: true }));
});

gulp.task('default', ['watch','clean-build']);