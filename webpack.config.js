const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
const root = require('app-root-path').path;

module.exports = {
  mode: 'development',
  entry: `${root}/src/index.ts`,
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: 'index.js'
  },
  node: {
    __dirname: false,
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: ['ts-loader'],
    }],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: false,
          mangle: false,
        },
        sourceMap: true
      })
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: './src/config.json',
      to: __dirname + "/dist/config.json"
    }, {
      from: './package.json',
      to: __dirname + "/dist/package.json"
    },{
      from: './src/www',
      to: __dirname + "/dist/www"
    }]),
  ],
  target: 'node',
  externals: [nodeExternals()]
};