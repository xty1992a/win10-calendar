const calendar = require('./calendar.js');

const plugin = (option, dayjsClass, dayjsFactory) => {
  dayjsClass.prototype.isTerm = function() {
	return this.toLunar().isTerm
  }

  dayjsClass.prototype.formatLunar = function (modelString = 'YY年MM月DD日 tt') {
	const lunarObj = this.toLunar()
	return modelString.replace(/YY/, lunarObj.gzYear)
		.replace(/MM/, lunarObj.gzMonth)
		.replace(/DD/, lunarObj.gzDay)
		.replace(/tt/, lunarObj.isTerm? lunarObj.Term: '')
  }

  dayjsClass.prototype.toLunar = function () {
    return calendar.solar2lunar(this.$y, this.$M+1, this.$D)
  }
}

module.exports = plugin
