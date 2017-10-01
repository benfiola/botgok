var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/botgok_server/ui/static/js');
var APP_DIR = path.resolve(__dirname, 'src/botgok_server/ui/src');

var config = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'botgok_frontend.js'
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', 'css-loader'
                ]
            }
        ]
    }
};

module.exports = config;
