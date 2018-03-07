const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SRC_DIR = path.join(__dirname, '/client/app');
const DIST_DIR = path.join(__dirname, '/client/dist');
const userFiles = path.join(__dirname, '/userfiles')
const rules = []
const includePaths = [
  userFiles
]

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
      },
      {
        test: /\.(?:png|jpg|svg)$/,
        include: includePaths,
        loader: 'url-loader',
        options: {
          name: '[path][name]-[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
  ],
};
