const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const TerserPlugin = require('terser-webpack-plugin')


rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

const config = {
  mode: 'development',
  // your default config
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
  },
  devtool: 'source-map',
}

if (process.env.NODE_ENV === 'production') {
  config.mode = 'production'
  config.devtool = 'source-map'
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
  }
}

module.exports = config;