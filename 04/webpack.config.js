
const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    page: "./src/page.js" //
  },
  output: {
    publicPath: __dirname + "/dist/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js"
  }
};
