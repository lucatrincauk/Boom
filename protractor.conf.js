
exports.config = {
    baseUrl: 'http://localhost:9000',
    framework: 'cucumber',
    //seleniumServerJar: '../node_modules/selenium/selenium-server-standalone-2.42.1.jar',
    specs: ['test/e2e/**/*.feature'],
    cucumberOpts: {
        format: 'pretty',
        tags: '@dev'
    },

    multiCapabilities: [
        {
            'browserName': 'chrome',
            'phantomjs.binary.path': './node_modules/phantomjs/bin/phantomjs',
            'phantomjs.cli.args': ['--ignore-ssl-errors=true', '--web-security=false']
        },
        {
            'browserName': 'firefox',
            'phantomjs.binary.path': './node_modules/phantomjs/bin/phantomjs',
            'phantomjs.cli.args': ['--ignore-ssl-errors=true', '--web-security=false']
        }
    ]
//    sauceUser: "fearms_sauce",
//    sauceKey: "3af34f2a-7f24-4cdb-a254-84636951833d"
};