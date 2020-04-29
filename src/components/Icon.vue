<template>
  <svg class="svg-icon" :class="name" aria-hidden="true">
    <use :xlink:href="`#${name}`"></use>
  </svg>
</template>

<script>
export default {
  name: "Icon",
  props: {
    name: String,
  },
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
