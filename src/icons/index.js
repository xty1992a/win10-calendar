/*
 * 使用svg-sprite-loader将svg挂载到页面上,使用<use>标签引用
 *
 * 为便于使用,注册一个<svg-icon>全局组件
 * 直接使用<svg-icon icon="xxx">即可引入图标
 * */

/*import Vue from "vue";
Vue.component("svg-icon", (props) => (
  <svg class="svg-icon" class={props.className} aria-hidden="true">
    <use xlinkHref={`#icon-${props.icon}`} />
  </svg>
));*/

const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
const req = require.context("./svg", false, /\.svg$/);
const iconMap = requireAll(req);

export default iconMap;
