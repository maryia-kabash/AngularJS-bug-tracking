module.exports = function(grunt) {

    grunt.initConfig({

        // JS TASKS ================================================================
        jshint: {
            all: ['public/js/**/*.js']
        },

        // OTHER TASKS ==============================================================
        watch: {
            js: {
                files: ['public/js/**/*.js'],
                tasks: ['jshint']
            }
        },

        nodemon: {
            dev: {
                script: 'server.js'
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['nodemon', 'watch']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['jshint', 'concurrent']);

};