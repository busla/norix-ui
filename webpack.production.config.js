var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  devtool: 'source-map',
  resolve: {
    // you can now require('file') instead of require('file.js')
    extensions: ['', '.js', '.json']
  },
  entry:
    './src/app.js', 
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    externals: {
      "jquery": "jQuery",
    },       
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?source-map'        
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        loader: 'url?limit=100000'
      },
      { test: /\.json$/, loader: "json-loader" }    
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html', // Load a custom template 
    inject: 'body' // Inject all scripts into the body     
  })]  
};

module.exports = config;