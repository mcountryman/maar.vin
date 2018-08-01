const path = require("path");
const webpack = require("webpack");

module.exports = (env) => ({
  entry: "../src/main.tsx",
  output: {
    path: path.join(__dirname, "..", "dist"),
    filename: "bundle.[hash].js",
  }
});