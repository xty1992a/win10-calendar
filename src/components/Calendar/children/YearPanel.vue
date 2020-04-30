<template>
  <div class="year-panel cell-list">
    <div class="cell-item" :key="item.toString()" v-for="item in yearList">
      <div class="year-cell" @click="pickYear(item)">
        <span>{{ item.format("YYYY") }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, inject, ref } from "vue";
import dayjs from "dayjs";

export default {
  name: "year-panel",
  setup() {
    const [date, setDate] = inject("date", [ref(new Date()), (v) => v]);
    const [displayMode, setDisplayMode] = inject("displayMode", [
      ref("date"),
      (v) => v,
    ]);
    const pickYear = (item) => {
      setDate(item.toDate());
      setDisplayMode("month");
    };
	const yearList = computed(() => {
	  const year0 = dayjs(date.value);
	  return Array(16)
		  .fill(0)
		  .map((n, i) => year0.add(i, "year"));
	});

    return {
      yearList,
      pickYear,
    };
  },
};
</script>

<style lang="less" rel="stylesheet/less">
.year-panel {
  .cell-item {
    width: 25%;
    padding: 2px;
  }
  .year-cell {
    border: 2px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 73.5px;
  }
}
</style>
