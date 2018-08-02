const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");

const node_modules = path.resolve(__dirname, "..", "node_modules");

module.exports = {
  context: path.resolve(__dirname, ".."),

  output: {
    path: path.resolve(__dirname, "..", "dist"),
    filename: "bundle.js",
    publicPath: "/dist/",
  },
  module: {
    rules: [
      { test: /.(ts|tsx)$/, use: "awesome-typescript-loader" },
      {
        test: /.(css|sass|scss)$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              includePaths: [
                path.join(node_modules, "bourbon-neat", "core"),
                path.join(node_modules, "bourbon", "core"),
              ],
            },
          },
        ]
      }
    ],
  },
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".html",
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: path.resolve(__dirname, "..", "index.html"),
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
  },
};