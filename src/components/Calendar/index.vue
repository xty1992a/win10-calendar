<template>
  <div class="calendar" ref="el">
    <CalendarHead />
    <div class="cell-wrap">
      <transition :name="transitionName">
        <component :is="componentName" />
      </transition>
    </div>
    <Mask :position="position" />
  </div>
</template>

<script>
import { ref, h, provide, computed, watch } from "vue";
import dayjs from "dayjs";
import useMousePosition from "@/hooks/useMousePosition";
import * as Children from "./children";

export default {
  name: "calendar",
  components: {
    ...Children,
  },
  setup() {
    const el = ref(null);
    const displayMode = ref("date");
    const position = useMousePosition(el);
    const date = ref(dayjs().toDate());
    const setDate = (value) => {
      date.value = dayjs(value).toDate();
    };
    const transitionName = ref("out");
    const componentName = ref("date-panel");
    const levels = ["date", "month", "year"];
    watch(displayMode, (now, old) => {
      const nowLevel = levels.indexOf(now);
      const oldLevel = levels.indexOf(old);
      transitionName.value = nowLevel < oldLevel ? "out" : "in";
      // componentName必须在transitionName设置之后或同时设置才不会使transitionName滞后
      componentName.value = {
        date: "date-panel",
        month: "month-panel",
        year: "year-panel",
      }[displayMode.value];
    });

    const setDisplayMode = (mode) => {
      displayMode.value = mode;
    };
    provide("displayMode", [displayMode, setDisplayMode]);
    provide("date", [date, setDate]);

    return {
      el,
      position,
      date,
      setDate,
      componentName,
      transitionName,
    };
  },
};

function setTransitionName(mode) {
  const transition = ref("out");
  const levels = ["date", "month", "year"];
  watch(mode, (now, old) => {
    const nowLevel = levels.indexOf(now);
    const oldLevel = levels.indexOf(old);
    transition.value = nowLevel < oldLevel ? "out" : "in";
    console.log(now, nowLevel, old, oldLevel, transition.value);
  });

  return transition;
}
</script>

<style lang="less" rel="stylesheet/less">
@import "./transition";
.calendar {
  position: relative;
  user-select: none;
  overflow: hidden;
  width: 350px;
  padding: 10px;
  background-color: #000;
  color: #fff;

  .cell-wrap {
    overflow: hidden;
    height: 310px;
    position: relative;
  }

  .cell-list {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    .cell-item {
      &:hover {
        position: relative;
        z-index: 1;
      }
      span {
        z-index: 1;
        position: relative;
      }
    }
  }
  .mask {
    width: 200%;
    height: 200%;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
