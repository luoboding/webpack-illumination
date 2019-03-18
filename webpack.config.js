require('pug-loader');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const defaultConfig = {
  entry: './src/index.js',
  stats: { children: false },
  output: {
    path: path.resolve(__dirname, 'dist/static'),
    filename: 'bundle.[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              eslintPath: require.resolve('eslint'),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '测试项目',
      template: '!!pug-loader!./src/public/template.pug',
    }),
    new CleanWebpackPlugin(),
  ],
};

module.exports = (env, argv) => {
  const { mode } = argv;
  console.log('mode', argv);
  if (mode === 'development') {
    Object.assign(defaultConfig, {
      devtool: 'source-map',
    });
  }
  Object.assign(defaultConfig, {
    mode,
  });
  return defaultConfig;
};
