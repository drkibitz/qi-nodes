module.exports = function(grunt) {
    'use strict';

    var banner = [
        '/**',
        ' * <%= pkg.name %> <%= pkg.version %>',
        ' * <%= pkg.homepage %>',
        ' * Copyright (c) 2013 Dr. Kibitz, http://drkibitz.com',
        ' * <%= pkg.description %>',
        ' * built: ' + new Date(),
        ' */',
        ''
    ].join('\n');

    grunt.initConfig({
        pkg: require('./package.json'),
        docstrap: 'node_modules/grunt-jsdoc/node_modules/ink-docstrap/template',
        jshint: {
            test: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        jsdoc: {
            docs: {
                src: ['package.json', 'README.md', 'src/**/*.js'],
                dest: 'build/docs'
            },
            options: {
                template: '<%= docstrap %>',
                configure: 'jsdoc.conf.json'
            }
        },
        mochaTest: {
            source: {
                src: ['test/unit/**/*.js'],
                options: {
                    require: ['test/source']
                }
            },
            dist: {
                src: ['test/unit/**/*.js'],
                options: {
                    require: ['test/dist']
                }
            },
            options: {
                reporter: 'spec'
            }
        },
        uglify: {
            dist: {
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
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('test', ['jshint', 'uglify', 'mochaTest:dist']);
    grunt.registerTask('default', ['test', 'jsdoc']);
};
