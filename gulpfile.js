const { src, dest, watch, parallel } = require("gulp");

//css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber')

//IMAGENES
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(done) {
    src('src/scss/**/*.scss')//Identificar el archivo de SASS
        .pipe(plumber())
        .pipe(sass())//Cmpilar el archivo
        .pipe(dest('build/css'))// guardar el archivo
    done()
}
function imagenes(done) {
    const opciones = {
        optimizationLavel: 3

    }
    src('src/img/**/*.{png,jpg,jpeg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))


    done();
}
function versionWebp(done) {
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{png,jpg,jpeg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))

    done();
}
function versionAvif(done) {
    const opciones = {
        quality: 50
    }
    src('src/img/**/*.{png,jpg,jpeg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
    done();
}
function javaScript(done) {
    src('src/js/**/*.js')
        .pipe(dest('build/js'));
    done();
}
function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javaScript);


    done();
}

exports.css = css;
exports.js = javaScript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp; 
exports.versionAvif = versionAvif; 
exports.dev = parallel(imagenes, versionWebp, versionAvif,javaScript, dev);