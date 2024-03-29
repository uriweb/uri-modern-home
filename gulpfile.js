var gulp = require('gulp');
var pkg = require('./package.json');

var banner = ['/*',
  'Theme Name: <%= pkg.themeName %>',
  'Theme URI: <%= pkg.homepage %>',
  'Author: <%= pkg.author %>',
  'Author URI: <%= pkg.authorURI %>',
  'Description: <%= pkg.description %>',
  'Template: <%= pkg.template %>',
  'Version: <%= pkg.version %>',
  'License: <%= pkg.license %>',
  'License URI: <%= pkg.licenseURI %>',
  'Text Domain: <%= pkg.textDomain %>',
  'Tags: education, theme-options',
  '',
  '@version v<%= pkg.version %>',
  '@author Brandon Fuller <bjcfuller@uri.edu>',
  '@author John Pennypacker <jpennypacker@uri.edu>',
  '',
  '*/',
  ''].join('\n');

// include plug-ins
var eslint = require('gulp-eslint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var terser = require('gulp-terser');
var sass = require('gulp-sass')(require('sass'));
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var path = require('path');
var header = require('gulp-header');
var shell = require('gulp-shell');


// options
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed' //expanded, nested, compact, compressed
};

// JS concat, strip debugging and minify
gulp.task('scripts', scripts);

function scripts(done) {

  gulp.src('./src/js/*.js')
    .pipe(eslint(done))
    .pipe(eslint.format());

  gulp.src('./src/js/*.js')
    .pipe(concat('script.min.js'))
    //.pipe(stripDebug())
    .pipe(terser())
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('./js/'));

	done();
 // console.log('scripts ran');
}

// Theme CSS concat, auto-prefix and minify
gulp.task('styles', styles);

function styles(done) {

	gulp.src('./src/sass/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(concat('style.css'))
        .pipe(postcss([ autoprefixer() ]))
		.pipe(header(banner, { pkg : pkg } ))
		.pipe(sourcemaps.write('./map'))
		.pipe(gulp.dest('.'));

  done();
  //console.log('styles ran');
}

// Features CSS
gulp.task('featuresCSS', featuresCSS);

function featuresCSS(done) {

	gulp.src('./features/**/src/*.scss')
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(rename(function(file) {
			file.dirname = path.dirname(file.dirname);
			return file;
		}))
        .pipe(postcss([ autoprefixer() ]))
		.pipe(header('/* built */'))
		.pipe(gulp.dest('./features/'));

	done();
	//console.log('features css ran');
}

// Features JS
gulp.task('featuresJS', featuresJS);

function featuresJS(done) {

  gulp.src('./features/**/src/*.js')
    .pipe(eslint(done))
    .pipe(eslint.format());

	gulp.src('./features/**/src/*.js')
		.pipe(rename(function(file) {
			file.dirname = path.dirname(file.dirname);
			return file;
		}))
    .pipe(terser())
		.pipe(header('/* built */'))
    .pipe(gulp.dest('./features/'));

	done();
	//console.log('features js ran');
}

// minify new images
gulp.task('images', images);

function images(done) {
  var imgSrc = './src/images/**/*',
      imgDst = './images';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
	done();
  //console.log('images ran');
}

// run codesniffer
gulp.task('sniffs', sniffs);

function sniffs(done) {

    return gulp.src('.', {read:false})
        .pipe(shell(['./.sniff']));

}

// watch
gulp.task('watcher', watcher);

function watcher(done) {
	// watch for JS changes
	gulp.watch('./src/js/*.js', scripts);

	// watch for Theme CSS changes
	gulp.watch('./src/sass/**/*', styles);

	// watch for Features CSS changes
	gulp.watch('./features/**/*.scss', featuresCSS);

	// watch for Features JS changes
	gulp.watch('./features/**/src/*.js', featuresJS);

	// watch for image changes
	gulp.watch('./src/images/**/*', images);

    // watch for PHP change
    gulp.watch('./**/*.php', sniffs);

	done();
}

gulp.task( 'default',
	gulp.parallel('images', 'scripts', 'styles', 'featuresCSS', 'featuresJS', 'sniffs', 'watcher', function(done){
		done();
	})
);


function done() {
	console.log('done');
}
