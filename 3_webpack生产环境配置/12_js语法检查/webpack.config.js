const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // 语法检查：eslint-loader eslint
            // 注意只检查自己写的代码，不检查第三方库
            // 设置检查规则：package.json中eslintConfig中设置，
                //   "eslintConfig": { "extends": "airbnb-base" }
            // 依赖包：airbnb --> eslint-config-airbnb-base eslint eslint-plugin-import
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    // 自动修复eslint中检查到的错误
                    fix: true
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}