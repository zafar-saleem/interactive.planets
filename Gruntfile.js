module.exports = function (grunt) {

    grunt.initConfig({

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            target: {
                src: 'src/js/*.js'
            }
        },

        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            target: {
                src: 'src/css/*.css'
            }
        },

        copy: {
            dist: {
                cwd: 'src/', 
                expand: true, 
                src: '**', 
                dest: 'dist/'
            }
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl: 'dist/js',
                    mainConfigFile: 'dist/js/requireConfig.js',
                    name: 'main',
                    out: 'dist/scripts/scripts.min.js',
                    include: 'libs/requirejs/require.js',
                    optimize: 'uglify',
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true
                }
            }
        },

        cssmin: {
            options: {},
            target: {
                src: 'dist/css/**/*.css',
                dest: 'dist/styles/styles.min.css'
            }
        },

        clean: {
            js: ['dist/js/'],
            css: ['dist/css/']
        },

        processhtml: {
            dist: {
                files: {
                    './index.html': ['./index.html']
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'dist/index.html'
                }
            }
        },
        
        concurrent: {
            dev: {
                tasks: [
                    'nodemon',
                    'watch'
                ],
                options: {
                    limit: 20,
                    logConcurrentOutput: true
                }
            }
        },
        
        nodemon: {
            dev: {
                script: 'server.js',
                options: {}
            }
        },
        
        watch: {
            server: {
                files: [
                    'src/styles/sass/**/*.scss',
                    'src/js/**/*.js',
                    './index.html'
                ],
                tasks: [
                    'jshint',
                    'csslint',
                    'copy',
                    'requirejs',
                    'cssmin',
                    'clean',
                    'processhtml'
                ],
                options: {
                    livereload: true
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-connect');
    
    grunt.registerTask('default', [
            'jshint',
            'csslint',
            'copy',
            'requirejs',
            'cssmin',
            'clean',
            'processhtml', 
            'concurrent'
        ]
    );
}
