const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

rules.push({
  test: /\.css$/,
  use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
});

rules.push({
  test: /\.less$/i,
  use: [
    // compiles Less to CSS
    {loader: 'style-loader'},
    {loader: 'css-loader'},
    {
      loader: 'less-loader',
      options: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  ],
});

const config = {
  mode: 'development',
  // your default config
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      src: path.join(__dirname, 'src'),
    },
  },
  devtool: 'source-map',
};

if (process.env.NODE_ENV === 'production') {
  config.mode = 'production';
  config.devtool = 'source-map';
  config.optimization = {
    ...(config.optimization || {}),
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_fnames: /AbortSignal/,
        },
      }),
    ],
  };
}

module.exports = config;
