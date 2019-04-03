/* eslint-env node */
/* eslint-disable no-console */
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = () => {
  return {
    devtool: "source-map",
    entry: { style: "./style.scss" },
    output: {
      path: path.resolve(__dirname, "dist")
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract([
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                sourceMap: true
              }
            },
            { loader: "resolve-url-loader", options: { sourceMap: true } },
            { loader: "adjust-sourcemap-loader", options: { debug: true } },
            { loader: "sass-loader", options: { sourceMap: true } }
          ])
        },
        {
          test: /\.svg$/,
          use: { loader: "file-loader" }
        }
      ]
    },
    plugins: [new ExtractTextPlugin("[name].[chunkhash].css")]
  };
};