<template>
  <div class="app">
    <Calendar/>
  </div>
</template>

<script>
  import Calendar from "@/components/Calendar";

  export default {
    components: {Calendar},
    setup() {
    }
  };

</script>

<style lang="less">
  .app {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
