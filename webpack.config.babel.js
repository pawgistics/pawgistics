// @flow

import path from 'path';
import webpack from 'webpack';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeJsPlugin from 'optimize-js-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ZopfliPlugin from 'zopfli-webpack-plugin';
import BrotliPlugin from 'brotli-webpack-plugin';
// import Visualizer from 'webpack-visualizer-plugin';

import { WDS_PORT } from './src/shared/config';
import { isProd } from './src/shared/util';

const { ifProduction, ifDevelopment } = getIfUtils(process.env.NODE_ENV);

export default {
  entry: removeEmpty([
    ifDevelopment('react-hot-loader/patch'),
    './src/client',
  ]),
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ifProduction('/static/', `http://localhost:${WDS_PORT}/dist/`),
  },
  module: {
    rules: [
      { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.m\.s?css$/,
        use: ifProduction(
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader?modules,localIdentName="[name]-[local]-[hash:base64:6]"', 'sass-loader'],
          }),
          ['style-loader', 'css-loader?modules,localIdentName="[name]-[local]-[hash:base64:6]"', 'sass-loader'],
        ),
      },
      {
        test: /^((?!\.m).)*\.s?css$/,
        use: ifProduction(
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader'],
          }),
          ['style-loader', 'css-loader', 'sass-loader'],
        ),
      },
    ],
  },
  devtool: ifProduction(false, 'source-map'),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: WDS_PORT,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: removeEmpty([
    ifProduction(new UglifyJsPlugin({
      parallel: true,
    })),
    ifProduction(new OptimizeJsPlugin({
      sourceMap: false,
    })),
    ifProduction(new OptimizeCssAssetsPlugin()),
    ifProduction(new ExtractTextPlugin({ filename: 'css/styles.css' })),
    ifProduction(new ZopfliPlugin()),
    ifProduction(new BrotliPlugin()),
    ifDevelopment(new webpack.HotModuleReplacementPlugin()),
    ifDevelopment(new webpack.NamedModulesPlugin()),
    new webpack.DefinePlugin({
      PROD: isProd,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new Visualizer(),
  ]),
};