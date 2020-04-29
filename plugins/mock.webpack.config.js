/* 该文件是提供给 webstorm 读取的.用于识别webpack中配置的别名*/
const useAlias = require('./use-alias');
const path = require('path');

const config = {
  context: path.resolve(__dirname, "../"),
  entry: {
	app: "./src/main.js"
  },
  output: {
	path: path.resolve(__dirname, 'dist'),
	filename: "[name].js",
	publicPath: '/'
  },
  resolve: {
	extensions: [".js", ".jsx", ".vue", ".json"],
	alias: {
	  set(name, path) {
		this[name] = path;
		return this;
	  }
	}
  },
  module: {
	rules: []
  }
};
useAlias(config);
delete config.resolve.alias.set;

console.log(config);

module.exports = config;
