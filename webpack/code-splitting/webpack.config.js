var path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "none",
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    port: 9000,
    hot: true,
  },
  plugins: [new HtmlWebpackPlugin({ template: "index.html" })],
}
