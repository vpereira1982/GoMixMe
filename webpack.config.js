const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SRC_DIR = path.join(__dirname, '/client/app');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test : /\.css$/,
        include : path.join(__dirname),
        loader: ExtractTextPlugin.extract('css-loader', 'css')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
  ],
};
