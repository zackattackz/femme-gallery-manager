const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require("path");

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new Dotenv()
];
