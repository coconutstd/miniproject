const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtratPlugin = require("mini-css-extract-plugin")

module.exports = {
  mode: "none",
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "my-app.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtratPlugin.loader,
          },
          "css-loader",
        ],
      },
    ],
  },
  devServer: {
    port: 9000,
    hot: true,
  },
  plugins: [
    new MiniCssExtratPlugin(),
    new HtmlWebpackPlugin({ template: "index.html" }),
  ],
}
