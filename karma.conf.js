// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['mocha', 'chai', 'sinon'],

        // list of files / patterns to load in the browser
        files: [
            'app/libs/angular/angular.js',
            'app/libs/angular-animate/angular-animate.js',
            'app/libs/angular-sanitize/angular-sanitize.js',
            'app/libs/angular-ui-router/release/angular-ui-router.js',
            'app/libs/ionic/release/js/ionic.js',
            'app/libs/ionic/release/js/ionic-angular.js',
            'app/libs/angular-mocks/angular-mocks.js',
            'app/scripts/**/*.js',
            'test/spec/**/*.js',
            'app/index.html',
            'app/templates/**/*.html'
        ],

        preprocessors: {
            '**/*.jade': 'ng-jade2js',
            '**/*.html': 'ng-html2js',
            '**/*.coffee': 'coffee'
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'app/',
            moduleName: 'Boom'
        },

        ngJade2JsPreprocessor: {
            stripPrefix: ''
        },

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8080,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
