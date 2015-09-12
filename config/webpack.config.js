import webpack, { DefinePlugin, BannerPlugin } from 'webpack';
import path from 'path';
import merge from 'lodash/object/merge';
import autoprefixer from 'autoprefixer-core';
import minimist from 'minimist';

let sassPaths = require('node-neat').with([
  path.resolve(__dirname, "./assets/css")
]).map((sassPath) => {
  return "includePaths[]=" + sassPath;
}).join("&");

const output = './public/js/'
const argv = minimist(process.argv.slice(2));
const DEBUG = !argv.release;
const STYLE_LOADER = 'style-loader/useable';
const CSS_LOADER = DEBUG ? 'css-loader' : 'css-loader?minimize';
const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 20',
  'Firefox >= 24',
  'Explorer >= 8',
  'iOS >= 6',
  'Opera >= 12',
  'Safari >= 6'
];
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  '__DEV__': DEBUG
};

let getEntry = handler => `./handlers/${handler}/client/index.js`;
//
// Common configuration chunk to be used for both
// client-side (app.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

const config = {
  output: {
    publicPath: './',
    sourcePrefix: '  '
  },

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ],

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js']
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],

    loaders: [
      {
        test: /\.css$/,
        loader: `${STYLE_LOADER}!${CSS_LOADER}!postcss-loader`
      },
      {
        test: /\.less$/,
        loader: `${STYLE_LOADER}!${CSS_LOADER}!postcss-loader!less-loader`
      },
      {
        test: /\.scss$/,
        loader: `${CSS_LOADER}!sass-loader?${sassPaths}`
      },
      {
        test: /\.gif/,
        loader: 'url-loader?limit=10000&mimetype=image/gif'
      },
      {
        test: /\.jpg/,
        loader: 'url-loader?limit=10000&mimetype=image/jpg'
      },
      {
        test: /\.png/,
        loader: 'url-loader?limit=10000&mimetype=image/png'
      },
      {
        test: /\.svg/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.jade$/,
        loader: "jade-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  postcss: [autoprefixer(AUTOPREFIXER_BROWSERS)]
};

//
// Configuration for the client-side bundle (app.js)
// -----------------------------------------------------------------------------

const clientConfig = merge({}, config, {
  entry: {
    'login': getEntry('auth'),
  },
  output: {
    path: output,
    filename: "[name].js"
  },
  devtool: DEBUG ? 'source-map' : false,
  plugins: config.plugins.concat([
      new DefinePlugin(merge(GLOBALS, {'__SERVER__': false}))
    ].concat(DEBUG ? [] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
    ])
  )
});


export default clientConfig;
