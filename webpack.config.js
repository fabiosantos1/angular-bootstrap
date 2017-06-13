const path = require('path')
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
        entry: {
            'app': [
                './src/index'
            ]
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].js',
      libraryTarget: 'umd'
    },
    devServer: {
      contentBase: path.join(__dirname, "./dist")
    }
}