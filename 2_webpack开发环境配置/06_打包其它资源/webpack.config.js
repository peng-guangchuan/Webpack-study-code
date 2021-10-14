
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                // 打包其它资源
                exclude: /\.(css|js|html)$/, // 排除css,js,html资源
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]' // [hash:10]取文件名哈希值的前十位，[ext]用原本的扩展名
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