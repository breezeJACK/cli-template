const path = require("path");
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    publicPath: './',
    outputDir: "dist",
    productionSourceMap: false,
    chainWebpack: config => {
        if (process.env.NODE_ENV === "production") {
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        }

    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === "production") {
            let optimization = {
                runtimeChunk: 'single',
                splitChunks: {
                    chunks: 'all',
                    maxInitialRequests: Infinity,
                    minSize: 20000, // 依赖包超过20000bit将被单独打包
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name(module) {
                                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                                return `npm.${packageName.replace('@', '')}`
                            }
                        }
                    }
                }
            }
            //开启gzip
            config.plugins = [
                ...config.plugins,
                new CompressionPlugin({
                    test: /\.js$|\.html$|.\css/, //匹配文件名
                    threshold: 10240, //对超过10k的数据压缩
                    deleteOriginalAssets: false //不删除源文件
                })
            ]
            Object.assign(config, {
                optimization
            })
        }

    }

}