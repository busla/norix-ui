var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
//var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var webpack = require('webpack');

var config = {
    devtool: 'source-map',
    entry: [
      'webpack-dev-server/client?http://localhost:3000', // WebpackDevServer host and port
      'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
      './src/app.js'
    ],
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],    
    /*
    resolve: {
        alias: {
          'react': pathToReact
          //jquery: "jquery/src/jquery"
        }
    },
    */   
    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        "jquery": "jQuery"
    },    
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
      loaders: [
        { 
          test: /\.js$/, 
          exclude: /node_modules/,
          loaders: ['react-hot', 'babel'], 
          //include: path.resolve(__dirname, 'app/App.js') },      
        },
        /*
        {
          test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
          loader: 'babel' // The module to load. "babel" is short for "babel-loader"
        },
        */  
        {
          test: /\.scss$/,
          loader: 'style!css!sass?sourceMap'        
        },
        {
          test: /\.woff$/,
          loader: 'url?limit=100000'
        },
        {
          test: /\.eot$/,
          loader: 'url?limit=100000'
        },       
        {
          test: /\.ttf$/,
          loader: 'url?limit=100000'
        },         
        {
          test: /\.svg$/,
          loader: 'url?limit=100000'
        },        
        { test: /\.json$/, loader: "json-loader" }
      ],
      //noParse: [pathToReact]
    },
    resolve: {
      // you can now require('file') instead of require('file.js')
      extensions: ['', '.js', '.json'] 
    }      

};

module.exports = config;