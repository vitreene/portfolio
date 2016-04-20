var fs = require('fs');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

function extractForProduction(loaders) {
  return ExtractTextPlugin.extract('style', loaders.substr(loaders.indexOf('!')));
}

module.exports = function(options) {
  options.lint = fs.existsSync(__dirname + '/../.eslintrc') && options.lint !== false;

  var localIdentName = options.production ? '[hash:base64]' : '[path]-[local]-[hash:base64:5]';
  var cssLoaders = 'style!css?localIdentName=' + localIdentName + '!autoprefixer?browsers=last 2 versions';
  var scssLoaders = cssLoaders + '!sass';
  var sassLoaders = scssLoaders + '?indentedSyntax=sass';
  var lessLoaders = cssLoaders + '!less';

  if (options.production) {
    cssLoaders = extractForProduction(cssLoaders);
    sassLoaders = extractForProduction(sassLoaders);
    scssLoaders = extractForProduction(scssLoaders);
    lessLoaders = extractForProduction(lessLoaders);
  }

  var jsLoaders = ['babel'];
  var jsonLoader = "json";
  // var jsonLoader = "json!./file.json";

  return {
    entry: './app/index.jsx',
    // entry: options.production ? './app/index.jsx' : [
    //   'webpack-dev-server/client?http://localhost:8080',
    //   'webpack/hot/only-dev-server',
    //   './app/index.jsx',
    // ],
    debug: options.production,
    devtool: options.devtool,
    /*
    output: {
      path: options.production ? './dist' : './build',
      publicPath: options.production ? '' : 'http://localhost:8080/',
      filename: options.production ? 'app.[hash].js' : 'app.js',
    },
    */
    output: {
      path:  '../site-MetalSmith-statt/assets/local' ,
      publicPath:   '' ,
      filename: 'portfolio-react.js', // 'app.[hash].js'
    },
    module: {
      preLoaders: options.lint ? [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'eslint',
        },
      ] : [],
      loaders: [
        {
          test: /\.json$/,
          exclude: /node_modules/,
          loader: jsonLoader,
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: jsLoaders,
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loaders: options.production ? jsLoaders : ['react-hot'].concat(jsLoaders),
        },
        {
          test: /\.css$/,
          loader: cssLoaders,
        },
        {
          test: /\.sass$/,
          loader: sassLoaders,
        },
        {
          test: /\.scss$/,
          loader: scssLoaders,
        },
        {
          test: /\.less$/,
          loader: lessLoaders,
        },
        {
          test: /\.png$/,
          loader: "url?limit=100000&mimetype=image/png",
        },
        {
          test: /\.svg$/,
          loader: "url?limit=100000&mimetype=image/svg+xml",
        },
        {
          test: /\.gif$/,
          loader: "url?limit=100000&mimetype=image/gif",
        },
        {
          test: /\.jpg$/,
          // loader: "file",
          loader: 'file-loader?name=assets/[name].[ext]',
        },
      ],
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.sass', '.scss', '.less', '.css'],
    //  alias: {
    //    images: path.join(__dirname, 'public/images')
    //    }
    },
    plugins: [
      // Important to keep React file size down
      new webpack.DefinePlugin({
        "process.env": {
          "NODE_ENV": JSON.stringify("production"),
        },
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
      new CopyWebpackPlugin([{
        from:'app/components/Portfolio/style.scss',
        to: 'portfolio-react.scss'
      }])
      /*
      new ExtractTextPlugin("app.[hash].css"),
      new HtmlWebpackPlugin({
        template: './conf/tmpl.html',
        production: true,
      }),
      */
    ],
  };
};
