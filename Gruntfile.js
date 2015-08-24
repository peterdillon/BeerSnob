module.exports = function(grunt) {

require('time-grunt')(grunt);
require('load-grunt-tasks')(grunt);

grunt.initConfig({

pkg: grunt.file.readJSON('package.json'),

  // CSS Build
  postcss: {
    options: {
      map: {
          inline: false, 
          annotation: 'dist/css/maps/'
      },
      processors: [
        require('postcss-import')(),
        require('postcss-simple-vars')(),
        require('pixrem')(),
        require('postcss-color-function')(),
        require('postcss-color-rgba-fallback')(),
        require('postcss-nested')(),
        require('postcss-simple-extend')(),
        require('postcss-merge-rules')(),
        require('postcss-center')(),
        require('autoprefixer-core')('last 3 versions'),
        require('postcss-discard-comments')({removeAll: true}),
        ]
    },
    dist: {
      src: 'dev-css/styles.css',
      dest: 'public/css/styles.css'
        }
    },

    //Javascript build 
    jshint: {
      all: ['Gruntfile.js', 'dev-js/*.js',]
    },
    concat: {
      basic: {
        src: ['dev-js/geolocation.js','dev-js/isNumber.js'],
        dest: 'dev-js/custom-build.js',
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> <%= grunt.template.today("longTime") %> */\n'
      },
      build: {
        src: 'dev-js/custom-build.js',
        dest: 'public/js/custom-build.min.js'
      }
    }, 


});




grunt.registerTask('default', ['postcss', 'jshint', 'concat', 'uglify']);

};

