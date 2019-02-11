const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { env } = process;
const isDevelopment = env.NODE_ENV === 'development';
const plugins = [];

if (!isDevelopment) {
  plugins.push(new CleanWebpackPlugin(['dist'], { root: path.resolve(__dirname, '../') }));
}

plugins.push(
  new HtmlWebpackPlugin({
    title: 'Title',
    template: 'src/index.html',
    inject: true,
    compress: !isDevelopment,
  }),
);

const extractStyles = new ExtractTextPlugin({
  filename: '[name]-[contenthash].css',
  allChunks: true,
  disable: isDevelopment,
});

const config = {
  entry: {
    app: ['./src/index'],
  },
  mode: isDevelopment ? 'development' : 'production',
  output: {
    filename: isDevelopment ? '[name].bundle.js' : '[name]-[chunkhash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '', // TODO 根据需要修改
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css?$/,
        exclude: /node_modules.*\.css/,
        loader: extractStyles.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: isDevelopment,
              minimize: true,
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          }, {
            loader: 'postcss-loader',
          }],
        }),
      },
      {
        test: /node_modules.*\.css$/,
        loader: extractStyles.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: false,
              minimize: true,
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]',
            },
          }],
        }),
      }],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.join(__dirname, '../src'),
      path.join(__dirname, '../node_modules'),
    ],
    alias: {
      $constants: path.join(__dirname, '../src/constants'),
      $redux: path.join(__dirname, '../src/redux'),
      $components: path.join(__dirname, '../src/components'),
      $containers: path.join(__dirname, '../src/containers'),
      $routes: path.join(__dirname, '../src/routes'),
    },
  },
};

if (isDevelopment) {
  config.devServer = {
    contentBase: 'dist',
    port: 5926,
    inline: true,
    host: 'localhost',
    hot: true,
    open: true, // 自动打开页面
  };
  config.entry.app = ['react-hot-loader/patch', ...config.entry.app];
  // config.module.rules.push({
  //   test: /\.jsx?$/,
  //   loader: 'react-hot-loader/webpack',
  // });
  plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
  //
}
plugins.push(extractStyles);

config.optimization = {
  splitChunks: {
    cacheGroups: {
      vendors: {
        name: 'vendors',
        chunks: 'all',
        priority: 1,
        test(module, chunks) {
          const name = module.nameForCondition && module.nameForCondition();
          return chunks.some(() => /[\\/]node_modules[\\/]/.test(name));
        },
      },
    },
  },
};

module.exports = config;
