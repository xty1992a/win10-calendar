const utils = require('./utils');

function useResourcesLoader(config) {
  const rules = config.module.rules;
  const less = rules.find(it => (it.test + '') === '/\\.less$/');
  less.oneOf.forEach(rule => {
	rule.use.push(
		{
		  loader: 'sass-resources-loader',
		  options: {
			resources: utils.src('styles/variable.less')
		  }
		}
	);
  });
}

module.exports = useResourcesLoader;
