const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, 'src', 'stylesheets')],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  require('tailwindcss')('./tailwind.js'),
                  require('autoprefixer')(),
                ],
              },
            },
            'sass-loader',
          ],
        }),
      },
      {
        test: /\.(html)$/,
        loader: 'html-loader',
      },
      {
        test: /\.handlebars$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]',
              outputPath: './images/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      'chart.js': 'chart.js/dist/Chart.js',
    },
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin({
      filename: 'style.[hash].css',
    }),
    new HtmlWebpackPlugin({
      favicon: './src/images/favicon.ico',
      template: './src/index.html',
    }),
    new HtmlWebpackPlugin({
      favicon: './src/images/favicon.ico',
      filename: 'tos.html',
      template: './src/tos.html',
    }),
    new CompressionPlugin(),
  ],
};
