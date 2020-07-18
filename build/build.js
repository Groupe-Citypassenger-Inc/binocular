// https://github.com/shelljs/shelljs
require('./check-versions')();
require('shelljs/global');

var path = require('path');
var config = require('../config');
var webpack = require('webpack');
var webpackConfig;

if (env.npm_config_env === "production") {
    env.NODE_ENV = 'production';
    webpackConfig = require('./webpack.prod.conf');
} else {
    env.NODE_ENV = 'development';
    webpackConfig = require('./webpack.dev.conf');
}


var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
var errorPath = path.join(config.build.assetsRoot, config.build.assetsPublicPath)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)

webpack(webpackConfig, function (err, stats) {
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
})
