module.exports = {
  entry: [
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react'
          ]
        }
      }
    ]
  }
}

// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
// 	mode: 'development',
// 	entry: ['./client/index.js'],
// 	output: {
// 		path: path.resolve(__dirname, 'output'),
// 		filename: './public/bundle.js',
// 	},
// 	resolve: {
// 		extensions: ['.js', '.jsx'],
// 	},
// 	module: {
// 		rules: [
// 			{
// 				test: /\.(js|jsx)$/,
// 				exclude: /node_modules/,
// 				use: {
// 					loader: 'babel-loader',
// 				},
// 			},
// 			{
// 				test: /\.css$/i,
// 				use: ['style-loader', 'css-loader'],
// 			},
// 		],
// 	},
// 	plugins: [
// 		new HtmlWebpackPlugin({
// 			template: './public/index.html',
// 			filename: './index.html',
// 		}),
// 	],
// };
