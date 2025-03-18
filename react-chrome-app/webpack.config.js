const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: //['raw-loader' , // I added this 
          {
            loader: "ts-loader",
            options: {
              compilerOptions: { noEmit: false },
            },
          },
        //],
        exclude: /node_modules/,
      },
      {
        test: /\.(js)$/, // Handle JavaScript files  /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },      
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'assets/images/', // Output folder (relative to build folder)
              publicPath: '/assets/images/', // Path to access the images
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "..", "extension"),
    filename: "content.js",
    //publicPath: '/extension/', // Ensure that assets are resolved relative to the root of the build output
  },
  devtool : 'source-map' // I added this 
};

// the below do the same thing, so that is not the problem 
//console.log(path.resolve("C:/Users/61429/Documents/FIT4701/Rental-Finder-Tool/extension"))
//console.log(path.resolve(__dirname, "..", "extension"))