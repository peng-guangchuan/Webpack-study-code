 
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
    mode: 'development',

    // 开发服务器 devServer : 用来自动话（自动编译、打开浏览器，自动刷新浏览器）
    // 特点：只会在内存中编译打包，不会有任何输出
    // 启动指令：webpack-dev-server，本地需前面加上npx
    devServer: {
        // 项目构建后路径
        contentBase: resolve(__dirname, 'build'),
        // 启动gzip压缩
        compress: true,
        // 启动端口号
        port: 3000,
        // 自动打开默认浏览器
        open: true
    }
}