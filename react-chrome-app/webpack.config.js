const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: { noEmit: false },
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "..", "extension"),
    filename: "content.js"
  },
  devtool : 'source-map' // I added this 
};

// the below do the same thing, so that is not the problem 
//console.log(path.resolve("C:/Users/61429/Documents/FIT4701/Rental-Finder-Tool/extension"))
//console.log(path.resolve(__dirname, "..", "extension"))