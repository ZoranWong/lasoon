const gulp = require('gulp');
const rename = require('gulp-rename');
const del = require('del');
gulp.task('clean', async function () {
    return await del.sync(['./config/app.json']);
});
gulp.task('prod', gulp.series('clean', function () {
    console.log('-------- prod -------');
    return gulp.src('./environment/app.prod.json').pipe(rename('app.json')).pipe(gulp.dest('./config/'));
}));

gulp.task('dev', gulp.series('clean', function () {
    console.log('-------- prod -------');
    return gulp.src('./environment/app.dev.json').pipe(rename('app.json')).pipe(gulp.dest('./config/'));
}));
