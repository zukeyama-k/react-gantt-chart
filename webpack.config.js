const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        loader: 'source-map-loader',
      },
    ],
  },
  devServer: {
    open: true,
    openPage: 'index.html',
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    port: 3004,
    inline: true,
    hot: true,
  },
};
