const path = require('path');
const RemoveWrapAndPrependPlugin = require('./RemoveWrapAndPrependPlugin'); // Adjust the path if necessary

module.exports = {
  entry: './src/index.js',
  mode: "production",
  externals: {
    'react': 'React'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          //options: {
          //  presets: ['@babel/preset-env', '@babel/preset-react'],
          //},
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  output: {
    path: path.resolve(__dirname, "..", "extension2.0"),
    filename: "content.js",
    //libraryTarget: 'object',
  },
  //plugins: [
  //  new RemoveWrapAndPrependPlugin({
  //    prependText: '!function()' // Customize if needed
  //  })
  //],
  devtool : 'source-map' // I added this 
};