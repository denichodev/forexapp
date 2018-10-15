import appRootDir from 'app-root-dir';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import SimpleProgressWebpackPlugin from 'simple-progress-webpack-plugin';

const dir = process.env.DIR;
const isProd = process.env.NODE_ENV === 'production';
const buildPath = './build/web/client';
const publicPath = isProd ? '/' : `http://0.0.0.0:${process.env.PORT}/`;

const webpackConfig = {
  target: 'web',

  bail: isProd,

  mode: isProd ? 'production' : 'development',

  context: path.resolve(appRootDir.get(), `./${dir}`),

  entry: {
    mobile: [path.resolve(appRootDir.get(), `./${dir}/index.js`)]
  },

  output: {
    path: path.resolve(appRootDir.get(), buildPath),
    publicPath,
    filename: isProd ? '[name].[chunkhash:8].js' : '[name].js',
    chunkFilename: isProd ? 'chunk.[name].[chunkhash:8].js' : 'chunk.[name].js',
    crossOriginLoading: 'anonymous'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules'],
    symlinks: false,
    cacheWithContext: false
  },

  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  babelrc: false,
                  cacheDirectory: true,
                  cacheCompression: isProd,
                  presets: [
                    [
                      '@babel/preset-env',
                      { modules: false, useBuiltIns: 'entry' }
                    ],
                    [
                      '@babel/preset-react',
                      { development: !isProd, useBuiltIns: true }
                    ]
                  ],
                  plugins: [
                    'babel-plugin-macros',
                    ['@babel/plugin-proposal-decorators', { legacy: true }],
                    [
                      '@babel/plugin-proposal-class-properties',
                      { loose: true }
                    ],
                    '@babel/plugin-proposal-export-default-from',
                    '@babel/plugin-proposal-export-namespace-from',
                    [
                      '@babel/plugin-proposal-object-rest-spread',
                      { useBuiltIns: true }
                    ],
                    '@babel/plugin-proposal-optional-chaining',
                    '@babel/plugin-syntax-async-generators',
                    '@babel/plugin-syntax-dynamic-import',
                    [
                      '@babel/plugin-transform-destructuring',
                      { useBuiltIns: true }
                    ],
                    [
                      '@babel/plugin-transform-runtime',
                      { helpers: false, regenerator: true }
                    ],
                    [
                      'babel-plugin-emotion',
                      { autoLabel: !isProd, hoist: isProd, sourceMap: !isProd }
                    ],
                    'graphql-tag',
                    !isProd && 'react-hot-loader/babel'
                  ].filter(Boolean)
                }
              }
            ]
          },
          {
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            use: ['graphql-tag/loader']
          },
          {
            exclude: [/\.jsx?$/, /\.html$/, /\.json$/],
            use: [
              {
                loader: 'file-loader',
                options: {
                  limit: 1024,
                  name: !isProd ? '[name].[ext]' : '[hash:8].[ext]',
                  publicPath
                }
              }
            ]
          }
        ]
      }
    ]
  },

  plugins: [
    new SimpleProgressWebpackPlugin(),
    ...(isProd
      ? [
          new HtmlWebpackPlugin({
            template: path.resolve(
              appRootDir.get(),
              './web/public/shell.html'
            ),
            chunksSortMode: 'none'
          })
        ]
      : [])
  ],

  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};

export default webpackConfig;
