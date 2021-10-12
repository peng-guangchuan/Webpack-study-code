/*
    webpack.config.js 是webpack的配置文件
        作用：当运行webpack时，会先加载配置文件。指示webpack工作内容。
    
    所有构建工具都是基于nodejs平台运行。模块化会默认采用commonjs
*/

// resolve用来拼接绝对路径的方法
const { resolve } = require('path');

module.exports = {
    // webpack配置内容
    // 入口起点
    entry: './src/index.js',
    // 输出
    output: {
        // 输出文件名
        filename: 'built.js',
        // 输出路径
        // __dirname nodejs的变量，代表当前文件的目录绝对路径
        path: resolve(__dirname, 'build')
    },
    // loader的配置
    module: {
        rules: [
            // 详细的loader配置
            // 不同的文件要用不同的loader处理
            {
                // test的值为匹配哪些文件
                test: /\.css$/,
                // use为使用指定的loader
                use: [ // use数组中loader执行顺序为：从右到左，从下到上。依次执行
                    // 创建style标签，将js中的样式资源插入进行，添加到head中生效
                    'style-loader',
                    // 将css文件变成commonjs模块加载js中，里面内容为样式字符串
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 将less文件编译成css文件，需要下载less-loader和less
                    'less-loader'
                ]
            }
        ]
    },
    // plugins的配置
    plugins: [
        // 详细的plugins的配置
    ],
    // 模式
    mode: 'development', // 开发模式
    // mode: 'production', // 生产模式
}