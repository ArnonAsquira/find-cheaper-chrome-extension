const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  watch: true,
  devtool: "cheap-module-source-map",
  mode: "development",
  entry: "./popup.js",
  output: {
    clean: true,
    path: path.resolve(__dirname, "dist"),
    filename: "popup.[contenthash].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "popup.html",
    }),
  ],
};
