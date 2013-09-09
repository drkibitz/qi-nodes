module.exports = function(grunt) {
    "use strict";

    var banner = [
    '/**',
    ' * <%= package.name %> <%= package.version %>',
    ' * <%= package.homepage %>',
    ' * Copyright (c) 2013 Dr. Kibitz, http://drkibitz.com',
    ' * <%= package.description %>',
    ' * built: ' + new Date(),
    ' */',
    ''].join("\n");

    grunt.initConfig({
        package: require('./package.json'),
        docstrap: 'node_modules/grunt-jsdoc/node_modules/ink-docstrap/template',
        jshint: {
            test: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        jsdoc: {
            all: {
                src: ['package.json', 'README.md', 'src/**/*.js'],
                dest: 'build/artifacts/api'
            },
            options: {
                template: '<%= docstrap %>',
                configure: 'jsdoc.conf.json'
            }
        },
        simplemocha: {
            test: { src: ['test/**/*.js'] },
            options: {
                reporter: 'spec'
            }
        },
        uglify: {
            min: {
                files: {
                    'index.js': ['src/index.js']
                }
            },
            options: {
                banner: banner,
                wrap: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('test', ['jshint', 'uglify', 'simplemocha']);
    grunt.registerTask('default', ['test', 'jsdoc']);
};
