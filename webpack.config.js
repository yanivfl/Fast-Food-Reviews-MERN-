require('dotenv').config();
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const outputDirectory = 'dist';


module.exports = {
  entry: ['babel-polyfill', './src/client/main.js'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(gif|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
        {
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    port: 8080,
    open: true,
    proxy: {
      '/api': 'http://localhost:8000'
    },
    historyApiFallback: true
  },
  plugins: [
    new Dotenv({
      path: './.env', // Path to .env file (this is the default)
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      environment: {
				REACT_APP_KEY: process.env.REACT_APP_KEY
			}
    })
  ]
};
