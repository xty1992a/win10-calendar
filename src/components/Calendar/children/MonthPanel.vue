<template>
  <div class="month-panel cell-list">
    <div class="cell-item" :key="item.toString()" v-for="item in monthList">
      <div :class="getClass(item)" @click="pickMonth(item)">
        <span>{{ item.format("M月") }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, inject, ref } from "vue";
import dayjs from "dayjs";
export default {
  name: "month-panel",
  setup() {
    const [date, setDate] = inject("date", [ref(new Date()), (v) => v]);
    const [displayMode, setDisplayMode] = inject("displayMode", [
      ref("date"),
      (v) => v,
    ]);
    const pickMonth = (item) => {
      setDate(item.toDate());
      setDisplayMode("date");
    };
	const monthList = computed(() => {
	  const month0 = dayjs(date.value).month(0);
	  return Array(16)
		  .fill(0)
		  .map((n, i) => month0.add(i, "month"));
	});
	const getClass = (item) => {
	  return [
		"month-cell",
		item.month() === dayjs(date.value).month() && " current-month ",
		item.year() === dayjs(date.value).year() && " current-year ",
	  ].join(" ");
	};

    return {
      monthList,
      getClass,
      pickMonth,
    };
  },
};
</script>

<style lang="less" rel="stylesheet/less">
.month-panel {
  .cell-item {
    width: 25%;
    padding: 2px;
  }
  .month-cell {
    border: 2px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 73.5px;
    color: #999;
    &.current-year {
      color: #fff;
    }
  }
}
</style>
