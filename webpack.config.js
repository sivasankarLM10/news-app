const webpack = require('webpack');

module.exports = {
  // other webpack configuration options...

  resolve: {
    fallback: {
      fs: false, // or require.resolve('browserify-fs')
      path: require.resolve('path-browserify'),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
