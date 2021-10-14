
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                // 处理图片资源，同一引用只输出一次
                // 默认不会处理html中img标签的图片（如图片路径）
                test: /\.(jpg|png|gif)$/,
                // 使用一个loader的代码写法
                // url-loader使用es6的module进行解析
                loader: 'url-loader', // 需要下载 url-loader file-loader
                options: {
                    // 如果图片大小小于8kb，就会被base64处理（在客户端本地解析）
                    // 优点：减少请求数量（减轻服务器压力）
                    // 缺点：转码成base64后图片体积会变大（请求速度相较慢一些）
                    // 通常8kb`12kb图片可以转base64处理
                    limit: 8 * 1024,
                    esModule: false, // 关闭url-loader的es6模块，会自动变成使用commonjs解析，与html-loader一致
                    name: '[hash:10].[ext]' // [hash:10]取文件名哈希值的前十位，[ext]用原本的扩展名
                }
            },
            {
                test: /\.html$/,
                // 用于处理html文件中的img图片（负责引入img，从而能被url-loader进行处理）
                // html-loader使用commonjs的module进行解析，与第二步使用url-loader不同，所以会报错
                loader: 'html-loader'
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