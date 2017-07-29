const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',

  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        })
      }
    ]
  },

  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  },

  plugins: [
    new ExtractTextPlugin('styles.css')
  ],

  node: {
    net: 'empty',
    dns: 'empty'
  }
}
