// Requirements
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var gulpsync = $.sync(gulp);
var htmlReplace = require('gulp-html-replace');
var args = require('yargs').argv;
var runSequence = require('run-sequence');
var babel = require('babelify');
var browserify = require('browserify');
var watchify = require('watchify');
var vinyl_source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

// variables
var useSourceMaps = args.sourceMaps ? true : false;


var source = {
    html: 'react_src/index.html',
    jsx: 'react_src/main.jsx'
};

var dist = {
    html: 'templates/project',
    scripts: 'static/js'
};

// Compile and Watch
function compile() {

    var bundler = watchify(browserify(
        {
            entries: source.jsx,
            debug: true,
            extensions: ['.jsx']
        }).transform(babel, {presets: ['es2015', 'react']}));

    function rebundle() {
        bundler.bundle()
            .on('error', function(err) {console.error(err); this.emit('end'); })
            .pipe(vinyl_source('bundle.js'))
            .pipe(buffer())
            .pipe($.if(useSourceMaps, $.sourcemaps.init({ loadMaps: true })))
            .pipe($.if(useSourceMaps, $.sourcemaps.write('./')))
            .pipe(gulp.dest(dist.scripts));
    }

    if (watch) {
        // watch html
        gulp.watch(source.html, ['replaceHTML']);

        bundler.on('update', function() {
            console.log('-> rebundle...');
            rebundle();
        })
    }

    rebundle();
}

function watch() {
    return compile(true);
}


// build jsx
gulp.task('build', function() {
    return compile();
});

gulp.task('watch', function() {
    return watch();
});


// build html
gulp.task('replaceHTML', function () {
    gulp.src(source.html)
        .pipe(htmlReplace({
            'js': '<script src="{% static \'js\\bundle.js\' %}"></script>'
        }))
        .pipe(gulp.dest(dist.html));
});


// main tasks
gulp.task('default',[
    'replaceHTML',
    'watch'
]);

gulp.task('build',[
    'replaceHTML',
    'build'
]);