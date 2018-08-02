const base = require("./webpack.config");
const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");

module.exports = merge(base, {
  mode: "development",
  entry: [
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/only-dev-server",
    "./src/index.tsx",
  ],
  devServer: {
    hot: true,
    publicPath: "/dist/",
    contentBase: [
      path.resolve(__dirname, ".."),
      path.resolve(__dirname, "..", "dist"),
    ],
  },
  devtool: "cheap-module-eval-source-map",
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
});