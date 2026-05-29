const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const { ModuleFederationPlugin } = webpack.container

module.exports = {
  entry: './src/index.ts',
  output: { filename: 'bundle.js', path: path.resolve(__dirname, 'dist'), publicPath: 'auto' },
  resolve: { extensions: ['.tsx','.ts','.js'] },
  module: { rules: [{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }] },
  plugins: [
    new ModuleFederationPlugin({
      name: 'mfRspack',
      filename: 'remoteEntry.js',
      exposes: { './App': './src/App' },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
    }),
    new HtmlWebpackPlugin({ template: './index.html' }),
  ],
}
