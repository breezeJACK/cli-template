const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const glob = require("glob-all");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const os = require("os");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

module.exports = {
  publicPath: "./",
  outputDir: "dist",
  transpileDependencies: ["resize-detector"],
  productionSourceMap: false,
  chainWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      //打包文件分析
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
    }
    //别名管理
    config.resolve.alias
      .set("@", path.resolve(__dirname, "./src/"))
      .set("@c", path.resolve(__dirname, "./src/components"))
      .set("@p", path.resolve(__dirname, "./src/pages"));
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.mode = "production";
      let optimization = {
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                return `npm.${packageName.replace("@", "")}`;
              }
            }
          }
        }
      };
      //开启gzip
      config.plugins = [
        ...config.plugins,
        new CompressionPlugin({
          test: /\.js$|\.html$|.\css/, //匹配文件名
          threshold: 10240, //对超过10k的数据压缩
          deleteOriginalAssets: false, //删除源文件
          algorithm: "gzip"
        }),
        //去除无用的css
        new PurgecssPlugin({
          paths: glob.sync([
            path.join(__dirname, "./../src/index.html"),
            path.join(__dirname, "./../**/*.vue"),
            path.join(__dirname, "./../src/**/*.js")
          ])
        }),
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_debugger: true,
              drop_console: true
            },
            warnings: false
          },
          parallel: true
        })
      ];
      Object.assign(config, {
        optimization
      });
    } else {
      //dev环境设置
      config.mode = "development";
    }
    config.plugins = [...config.plugins, new HardSourceWebpackPlugin()];
  },
  parallel: os.cpus().length > 1,
  devServer: {
    port: 2333, // 端口
    https: false, // 启用https
    proxy: {
      "/api": {
        target: "http://www.baidu.com/api",
        changeOrigin: true, // 允许websockets跨域
        // ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    } // 代理转发配置，用于调试环境
  }
};
