const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 设置nodejs环境变量
// process.env.NODE_ENV = 'development';

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          /**
           * css兼容性处理：postcss --> postcss-loader postcss-preset-env
           */
          
          {
            loader: 'postcss-loader', // 使用loader的默认配置 'postcss-loader'
            options: { // 修改'postcss-loader'参数
              ident: 'postcss-loader',
              plugins: () => [
                // postcss的插件，帮助postcss找到package.json中browserslist里面的配置，然后通过配置加载指定的css兼容性模式
                // 默认看生产环境，设置nodejs环境变量可以改成开发模式：process.env.NODE_ENV = development
                // "browserslit": {
                //   "development": [ // 开发环境，兼容chrom, firefox, safari浏览器最后一个版本
                //     "last 1 chrom version", 
                //     "last 1 firefox version",
                //     "last 1 safari version"
                //   ],
                //   "production": [ // 生产环境
                //     ">0.01%", 兼容百分之99.9%的浏览器
                //     "not dead", 不兼容已经die了的浏览器
                //     "not op_mini all" 不兼容所有open浏览器
                //   ]
                // }
                require('postcss-preset-env')()
              ]
            }
          }
      
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    })
  ],
  mode: 'development'
};
