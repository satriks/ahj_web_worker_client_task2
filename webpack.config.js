const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader' } },
      { test: /\.html$/, exclude: path.resolve(__dirname, 'src/js/service-worker.js'), use: [{ loader: 'html-loader' }] },
      { test: /\.txt$/, use: 'raw-loader' },
      { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      {
        test: /\.(png|jpg|gif|cur)$/i, dependency: { not: ['url'] }, use: [{ loader: 'url-loader', options: { limit: 8192 } }], type: 'javascript/auto',  // eslint-disable-line
      },
      { test: /\.html$/, include: [path.resolve(__dirname, 'src/js/service-worker.js')], use: { loader: 'file-loader' } },
      { test: /web-worker\.js$/, use: { loader: 'worker-loader' } }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
}
