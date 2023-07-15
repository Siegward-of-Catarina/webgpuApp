const path = require("path");
module.exports = {
  context: __dirname,
  entry: "./src/hex-verter/main.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/"
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      }
    ]
  },

  resolve: {
    extensions: [".ts"]
  }
}