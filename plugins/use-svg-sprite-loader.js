const utils = require('./utils');

module.exports = config => {
  config.module
	  .rule('svg')
	  .exclude.add(utils.src('icons'))
	  .end();

  config.module
	  .rule('icons')
	  .test(/\.svg$/)
	  .include.add(utils.src('icons'))
	  .end()
	  .use('svg-sprite-loader')
	  .loader('svg-sprite-loader')
	  .options({
		symbolId: '[name]'
	  });
};
