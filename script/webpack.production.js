const base = require("./webpack.config");
const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");

module.exports = merge(base, {
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.[hash].js",
  },
  devtool: "source-map",
  plugins: [],
});