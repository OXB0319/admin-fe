var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    path: config.dev.assetsRoot,
    publicPath: config.dev.assetsPublicPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'common': path.resolve(__dirname, '../src/common'),
      'utils': path.resolve(__dirname, '../src/utils'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'views': path.resolve(__dirname, '../src/views'),
      'routes': path.resolve(__dirname, '../src/routes'),
      'store': path.resolve(__dirname, '../src/vuex/store'),
      'components': path.resolve(__dirname, '../src/components'),
      '@': path.resolve(__dirname, '../src'),
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
        {
            test: /\.svg$/,
            loader: 'svg-sprite-loader',
            include: [resolve('src/icons')],
            options: {
                symbolId: 'icon-[name]'
            }
        }
    ]
  },
  vue: {
    loaders: utils.cssLoaders(),
    postcss: [require('postcss-cssnext')()]
  },

  plugins: []
};
