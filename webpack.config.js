const path = require('path'),
  webpack = require('webpack'),
  UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
  postcssFlexbugsFixes = require('postcss-flexbugs-fixes'),
  autoprefixer = require('autoprefixer')
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  isProd = process.env.NODE_ENV === 'production';

const plugins = isProd ? [
  new UglifyJSPlugin({
    test: /\.js$/,
    minimize: isProd,
    sourceMap: isProd, // map error message locations to modules
    // https://github.com/mishoo/UglifyJS2#compressor-options
    compress: {
      warnings: !isProd,
      dead_code: true,
      drop_debugger: true,
      drop_console: false,
    },
  })] :
  [];

const config = {
  target: 'web',
  //input
  entry: './src',
  //output
  output: {
      path: path.join(__dirname, isProd ? 'docs' : 'dist'),
      filename: 'bundle.js'
  },
  //sourcemaps
  devtool: isProd ? 'source-map' : 'eval',
  //loader rules
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: { 
              minimize: isProd,
              sourceMap: isProd
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isProd,
              plugins: [
                postcssFlexbugsFixes,
                autoprefixer({
                  browsers: [
                    'last 3 Chrome versions',
                    'last 3 Firefox versions',
                    'last 3 Opera versions',
                    'Explorer >= 10',
                    'Safari >= 8',
                    'iOS >= 8',
                    'android >= 4',
                  ],
                }),
              ],
            },
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
            options: { sourceMap: isProd },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ],
  },
  //plugins
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
  ].concat(plugins),
};

if(!isProd) {
  //devServer
  config.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    compress: true,
  };
}

module.exports = config;