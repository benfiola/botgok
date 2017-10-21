var path = require("path");
var webpack = require('webpack');

var config = {
    rules: [
        {
            test: /\.js[x]?$/,
            exclude: /(node_modules|dist)/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react', 'stage-1']
                    }
                }
            ]
        },
        {
            test: /\.css$/,
            exclude: /(node_modules|dist)/,
            use: [
                {
                    loader:'style-loader'
                },
                {
                    loader:'css-loader',
                    options: {
                        sourceMap: true,
                        modules: true,
                        camelCase : true
                    }
                }
            ]
        }
    ]
};

var context = path.join(__dirname, 'src/game_bot/server_ui');
var target = path.join(__dirname, 'src/game_bot/server/ui/static/js');
module.exports = [
    {
        entry: './index.js',
        context: context,
        devtool: "eval-source-map",
        module: config,
        output: {
            filename: 'app.js',
            path: target
        }
    }
];
