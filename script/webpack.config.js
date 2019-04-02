const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "statics/js/[name].[hash].js",
    chunkFilename: 'statics/js/[id].chunk.[hash].js',
    publicPath: "/",                          //路径前缀
    hashDigestLength: 8,                      //hash长度
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.ts']
  },
  mode: "production",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(eot|woff2?|ttf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: '[name].[hash].[ext]',
              limit: 5120,
              outputPath: "statics/fonts"
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: '[name].[hash].[ext]',
              outputPath: "statics/images"
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          'ts-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",                                   // translates CSS into CommonJS
          "sass-loader"                                   // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",                                   // translates CSS into CommonJS
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      chunks: ['main'],
      filename: '/index.html',
      chunksSortMode: 'auto'
    }),
    new MiniCssExtractPlugin({                              //分离css为单独文件的插件
      filename: "/statics/style/[name].[hash].css",
      chunkFilename: "/statics/style/[name].[hash].css"
    })
  ],
  optimization: {
    // runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      minChunks: 1,
      name: false,
      cacheGroups: {
        vendor: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1,
          priority: -10,
          enforce: true,
          minSize: 0
        },
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};