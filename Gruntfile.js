module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            js: {
                src: ['src/js/*.js'],
                dest: 'src/scripts.js'
            }
        },
        cssmin: {
            target: {
                src: 'temp/css/styles.css',
                dest: 'release/css/style.min.css'
            }
        },
        imagemin: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/images/'
                }]
            },
            release: {
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'release/images/'
                }]
            }
        },
        sass: {
            build: {
                files: {
                    'build/css/style.css': 'src/sass/style.scss'/*,
                    'build/css/sprite.css': 'src/css/sprite.scss'*/
                }
            },
            release: {
                files: {
                    'temp/css/style.css': 'src/sass/style.scss'/*,
                     'build/css/sprite.css': 'src/css/sprite.scss'*/
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
            },
            build: {
                src: 'build/css/style.css',
                dest: 'build/css/style.css'
            },
            release: {
                src: 'temp/css/style.css',
                dest: 'temp/css/style.css'
            }
        },
        sprite:{
            build: {
                src: 'src/images/*.png',
                /*retinaSrcFilter: ['src/images/sprite/sprite-icons-retina/*.png'],*/
                dest: 'build/images/lc_pillar.png',
                //retinaDest: 'build/images/sprite-retina.png',
                destCss: 'build/css/sprite.css'
            },
            release: {
                src: 'src/images/sprite/**/*.png',
                retinaSrcFilter: ['src/images/sprite/sprite-icons-retina/*.png'],
                dest: 'release/images/sprite.png',
                retinaDest: 'release/images/sprite-retina.png',
                destCss: 'temp/css/sprite.css'
            }
        },
        csslint: {
            strict: {
                options: {
                    import: 2
                },
                src: ['build/css/*.css']
            },
            lax: {
                options: {
                    import: false
                },
                src: ['build/css/*.css']
            }
        },
        includes: {
            files: {
                cwd: 'src/',
                src: ['index.html', 'include/*.html'],
                dest: 'build/',
                options: {
                    flatten: true,
                    debug: true,
                    includePath: 'src/include'
                }
            },
            release: {
                cwd: 'src/',
                src: ['index.html', 'include/*.html'],
                dest: 'release/',
                options: {
                    flatten: true,
                    debug: false,
                    includePath: 'src/include'
                }
            }
        },
        clean: {
            build: ["build/include", "build/images/sprite"],
            release: ["release/include", "release/images/sprite", "temp"]
        },
        processhtml: {
            build: {
                files: {
                    'release/index.html' : ['release/index.html']
                }
            }
        },
        copy: {
            files: {
                cwd: ['src/js', 'templates/*'],
                src: '**/*',
                dest: ['build/js', 'templates/*'],
                expand: true
            }
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ['src/js/*.js'],
                tasks: ['clean','concat:js'],
                options: {
                    spawn: false
                }
            },
            /*images: {
                files: ['src/images/*.{png,jpg,gif}'],
                tasks: ['imagemin'],
                options: {
                    spawn: false
                }
            },*/
            css: {
                files: ['src/sass/*.scss'],
                tasks: ['sass', 'autoprefixer', 'csslint:strict'],
                options: {
                    spawn: false
                }
            }/*,
            html: {
                files: ['src/*.html', 'src/include/*.html'],
                tasks: ['includes'],
                options: {
                    spawn: false
                }
            }*/
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['includes:files', 'processhtml', 'imagemin:build', 'sprite:build',
                        'sass:build', 'autoprefixer:build', 'csslint:lax',
                        'copy', 'clean:build']);
    grunt.registerTask('release', ['includes:release', 'processhtml', 'imagemin:release', 'sprite:release',
                        'sass:release', 'concat:css', 'autoprefixer:release', 'cssmin',
                        'concat:js', 'concat:ie8js', 'uglify',
                        'clean:release']);
    grunt.registerTask('cssprod', ['sass', 'concat:css', 'autoprefixer', 'cssmin']);
    grunt.registerTask('cssdev', ['sass', 'concat:css', 'csslint']);
    grunt.registerTask('img', ['imagemin', 'sprite']);
};
