module.exports = {
  publicRoot: './dist/',
  markup: {
    input: '.',
    output: './dist',
  },
  images: {
    input: './src/img',
    output: './dist/img',
  },
  styles: {
    input: './src/sass',
    output: './dist/css',
  },
  scripts: {
    input: './src/js',
    output: './dist/js',
  },
};

// module.exports = {
//   publicRoot: './dist/',
//   markup: {
//     inputFiles: './index.html',
//     outputFolder: './dist/',
//   },
//   images: {
//     inputFiles: './src/img/*.{png,jpg,ico}',
//     outputFiles: './dist/img/*',
//     outputFolder: './dist/img/',
//   },
//   styles: {
//     inputFiles: './src/sass/**/*.{scss, css}',
//     outputFiles: './dist/css/*',
//     inputSASS: './src/sass/**/*.scss',
//     outputCSS: './dist/css/*.css',
//     outputFolder: './dist/css/',
//   },
//   scripts: {
//     inputFiles: './src/js/index.js',
//     outputFiles: './dist/js/*.js',
//     outputFolder: './dist/js/',
//   },
// };
