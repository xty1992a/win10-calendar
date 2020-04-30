const path = require("path");
const useProxy = require("./plugins/use-proxy");
const useAlias = require("./plugins/use-alias");
const useResourcesLoader = require("./plugins/use-resources-loader");
const useSvgSpriteLoader = require("./plugins/use-svg-sprite-loader");

const development = process.env.NODE_ENV === "development";

module.exports = {
  configureWebpack: (config) => {
    useProxy(config);
    useResourcesLoader(config);
  },
  chainWebpack: (config) => {
    useSvgSpriteLoader(config);
    useAlias(config);
    config.module
      .rule("ts-loader")
      .test(/\.tsx?$/)
      .use("ts-loader")
      .loader("ts-loader")
      .options({
        appendTsSuffixTo: [/\.vue$/],
      });
  },
};
