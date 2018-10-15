import path from 'path';
import webpack from 'webpack';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import appRootDir from 'app-root-dir';
import nodeExternals from 'webpack-node-externals';

const dir = process.env.DIR;
const isProd = process.env.NODE_ENV === 'production';
const buildPath = `./build/${dir}/server`;
const entryPath = `./${dir}/${!isProd ? 'start' : 'index'}.js`;
const publicPath = isProd ? '' : `http://localhost:${process.env.PORT}/`;

const developmentPlugins = () => {
  if (!isProd) {
    const StartServerPlugin = require('start-server-webpack-plugin');

    return [
      new StartServerPlugin('index.js'),
      new webpack.HotModuleReplacementPlugin(),
      new FriendlyErrorsWebpackPlugin(),
    ];
  }

  return [];
};

const webpackConfig = {
  target: 'node',

  bail: isProd,

  mode: isProd ? 'production' : 'development',

  context: path.resolve(appRootDir.get(), `./${dir}`),

  performance: false,

  entry: {
    index: [
      path.resolve(appRootDir.get(), entryPath)
    ]
  },

  watch: !isProd,

  output: {
    path: path.resolve(appRootDir.get(), buildPath),
    filename: '[name].js',
    chunkFilename: !isProd
      ? 'chunk.[name].js'
      : 'chunk.[name].[chunkhash:8].js',
    publicPath,
    libraryTarget: 'commonjs2'
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
                  ].filter(Boolean)
                }
              }
            ]
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

  externals: [
    /^\.\/assets\.json$/,
    /**
     * Ignore node_modules being bundled
     * on server build
     */
    nodeExternals({
      whitelist: [
        !isProd && 'webpack/hot/poll?1000',
        'source-map-support/register',
        /\.(svg|png|jpg|jpeg|gif|ico)$/,
        /\.(css|scss|sass|sss|less)$/,
      ],
    }),
  ],

  optimization: {
    minimize: false,
  },

  plugins: [
    ...(!isProd ? developmentPlugins() : []),
  ],
};

if (!isProd) {
  webpackConfig.entry.index.push('webpack/hot/poll?1000')
}

export default webpackConfig;
