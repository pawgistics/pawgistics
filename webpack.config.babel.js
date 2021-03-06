// @flow

import path from 'path';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import MinifyPlugin from 'babel-minify-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import OptimizeJsPlugin from 'optimize-js-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ZopfliPlugin from 'zopfli-webpack-plugin';
import BrotliPlugin from 'brotli-webpack-plugin';
// import Visualizer from 'webpack-visualizer-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const { ifProduction, ifDevelopment } = getIfUtils(process.env.NODE_ENV);

export default {
  entry: removeEmpty([
    './src/client',
  ]),
  output: {
    filename: ifProduction('js/bundle.[chunkhash].js', 'js/bundle.js'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: ifProduction('/static/', 'http://localhost:7000/dist/'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            ['@babel/preset-env', { modules: false }],
            ['@babel/preset-react', { development: process.env.NODE_ENV === 'development' }],
            '@babel/preset-flow',
          ],
          plugins: removeEmpty([
            ifDevelopment(['react-hot-loader/babel']),
            ['@babel/plugin-proposal-class-properties', {
              loose: false,
            }],
            'flow-react-proptypes',
            '@babel/plugin-proposal-object-rest-spread',
            ['react-css-modules', {
              generateScopedName: '[name]-[local]-[hash:base64:6]',
              filetypes: {
                '.scss': {
                  syntax: 'postcss-scss',
                },
              },
            }],
            'lodash',
            ['@babel/plugin-transform-runtime', {
              useESModules: true,
              useBuiltIns: true,
            }],
            ['transform-imports', {
              reactstrap: {
                // eslint-disable-next-line no-template-curly-in-string
                transform: 'reactstrap/lib/${member}',
                preventFullImport: true,
              },
            }],
          ]),
        },
        exclude: /node_modules/,
      },
      {
        test: /\.m\.s?css$/,
        loader: ifProduction(
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader?modules,localIdentName=[name]-[local]-[hash:base64:6]', 'postcss-loader', 'sass-loader'],
          }),
          ['style-loader', 'css-loader?modules,localIdentName=[name]-[local]-[hash:base64:6]', 'postcss-loader', 'sass-loader'],
        ),
      },
      {
        test: /^((?!\.m).)*\.s?css$/,
        loader: ifProduction(
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader', 'sass-loader'],
          }),
          ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        ),
      },
    ],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: 7000,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          parse: { ecma: 6 },
          compress: {
            passes: 3,
            drop_console: true,
            hoist_funs: true,
            unsafe: true,
          },
        },
        sourceMap: true,
      }),
      new MinifyPlugin(),
    ],
  },
  plugins: removeEmpty([
    ifProduction(new CopyWebpackPlugin(['public'])),
    ifProduction(new HtmlWebpackPlugin({
      template: 'src/server/index.tpl.html',
      minify: {
        collapseWhitespace: true,
        removeScriptTypeAttributes: true,
      },
    })),
    ifProduction(new LodashModuleReplacementPlugin()),
    ifProduction(new OptimizeJsPlugin({
      sourceMap: false,
    })),
    ifProduction(new OptimizeCssAssetsPlugin()),
    ifProduction(new ExtractTextPlugin({ filename: 'css/styles.[contenthash:hex:20].css' })),
    ifProduction(new ZopfliPlugin()),
    ifProduction(new BrotliPlugin()),
    // new Visualizer(),
    // new BundleAnalyzerPlugin(),
  ]),
};
