const sass = require('sass');

module.exports = function(grunt) {
  grunt.initConfig({
    sass: {                              // Task
      options: {
       implementation: sass
      },
      dist: {                            // Target
        options: {                       // Target options
          // outputStyle: 'expanded'
        },
        files: {                         // Dictionary of files
          'assets/css/main.css': 'assets/css/main.sass',       // 'destination': 'source'
          'assets/css/reset.css': 'assets/css/reset.sass'
        }
      },
      build: {
        options: {
          //outputStyle: 'compact'
        },
        files: {
          'docs/assets/css/main.css': 'assets/css/main.sass',
          'assets/css/reset.css': 'assets/css/reset.sass'
        }
      }
    },

    imagemin: {
      jpg: {
        options: {
          progressive: true
        },
        files: [
          {
            // Set to true to enable the following options…
            expand: true,
            // cwd is 'current working directory'
            cwd: 'assets/img/',
            src: ['**/*.jpg'],
            // Could also match cwd. i.e. project-directory/img/
            dest: 'docs/assets/img/',
            ext: '.jpg'
          }
        ]
      }
    },

    clean: {
      build: {
        src: [ 'docs' ]
      },
    },

    copy: {
      build: {
        cwd: '.',
        src: ['**/*.html', '!**/node_modules/**'],
        dest: 'docs',
        expand: true
      },
      resets: {
        cwd: 'assets/css/',
        src: ['reset.css'],
        dest: 'docs/assets/css',
        expand: true
      },
      pdfs: {
        cwd: 'assets/pdf/',
        src: ['**/*.pdf'],
        dest: 'docs/assets/pdf',
        expand: true
      },
      icons: {
        cwd: 'assets/icons/',
        src: ['**/*.png', '**/*.ico', '**/*.webmanifest'],
        dest: 'docs/assets/icons',
        expand: true
      }
    },

    uglify: {
      build: {
        files: {
          'docs/assets/js/functions.js': ['assets/js/functions.js']
        }
      }
    },

    watch: {
      files: ['assets/css/*.sass'],
      tasks: ['sass']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['sass:dist']);
  grunt.registerTask('build', ['clean', 'copy', 'sass:build','imagemin', 'uglify']);
};
