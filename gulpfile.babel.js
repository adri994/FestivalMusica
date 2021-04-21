//Serie es para ejecutar varias funciones
// Busqueda de archivo
//Verifica si hay cambios
import { src,series,dest,watch } from "gulp";
import sass from "gulp-sass";
import imagemin from "gulp-imagemin";
import notify from "gulp-notify";
import webp from "gulp-webp";
import concat from "gulp-concat";

//utilidades css
import autoprefixer from "autoprefixer";
import postcss from "gulp-postcss"; // para esto necesitas instalar postcss y tenemos que crear el archivo postcss.config.js
import cssnano from "cssnano"; //optimiza el css
import sourcemaps from "gulp-sourcemaps"; //ayuda que el archivo final no se vea tan raro

import terser from "gulp-terser-js"
import rename from "gulp-rename"

const paths={
    img:"./src/asset/img/**/*",
    scss:"./src/scss/**/*.scss",
    js:"./src/js/**/*.js"
}

export const imgWebp = () =>{
    return src(paths.img)
            .pipe(webp())
            .pipe(dest("./build/img"))
            .pipe(notify({message:"webp listo"}))
}

// Compilar SaSS
export const css = () =>{
    return src("./src/scss/app.scss")
            .pipe(sourcemaps.init())
            .pipe(sass()) //al tener css nano no necsitamos poner mas varoles alli
            .pipe(postcss([autoprefixer(),cssnano()]))
            .pipe(sourcemaps.write('.')) //pone un mapa en nuestor dsico duro para saber el archivo de sass
            .pipe(dest("./build/css"))
}


export const javascript = () =>{
    return src(paths.js)
            .pipe(sourcemaps.init())
            .pipe(concat('app.js'))
            .pipe(terser())
            .pipe(sourcemaps.write("."))
            .pipe(rename({suffix:".min"}))
            .pipe(dest("./build/js"))
}

export const comImg = () =>{
    return src(paths.img)
            .pipe(imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.mozjpeg({ quality: 30, progressive: true }),
                imagemin.optipng({ optimizationLevel: 1 })
            ]))
            .pipe(dest("./build/img"))
            .pipe(notify({message:"Imagen minificada"}))
}

export const watchFile = () =>{
    watch(paths.js,javascript)
    watch(paths.scss,css) //todos los archivos con esa extension
}


 exports.css = css 
exports.watchFile = watchFile
exports.comImg = comImg 

exports.default = series(css, javascript, imgWebp,watchFile)