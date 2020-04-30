<template>
  <div class="date-panel">
    <div class="cell-list week-list">
      <div class="cell-item" :key="item" v-for="item in weeks">
        <span>{{ item }}</span>
      </div>
    </div>

    <DateList :list="dateList" />
  </div>
</template>

<script>
import dayjs from "dayjs";
import lunarPlugin from '@/utils/lunar'
dayjs.extend(lunarPlugin)
import { computed, h, inject } from "vue";
function DateList(props) {
  // 日期数组中间的值,必然是本月
  const middleDay = props.list[Math.ceil(props.list.length / 2)];
  const mDayMonth = middleDay.month();
  const getClass = (item) =>
    ["date-cell", item.month() === mDayMonth && "current-month"]
      .filter(Boolean)
      .join(" ");

  return (
    <div class="cell-list date-list">
      {props.list.map((item) => (
        <div class="cell-item" key={item.toString()}>
          <div class={getClass(item)}>
            <span>{item.date()}</span>
            <span class="lunar">{item.isTerm() ? item.formatLunar('tt') : item.formatLunar('DD')}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
export default {
  name: "date-panel",
  components: { DateList },
  setup(props, ctx) {
    const [date] = inject("date");
    const dateList = computed(() => getDateList(date.value));
    return {
      dateList,
      weeks: ["日", "一", "二", "三", "四", "五", "六"],
    };
  },
};

// 生成日历表
function getDateList(date) {
  // 本月第一天
  const day0 = dayjs(date).startOf("month");
  // 本月第一个星期的星期日
  const firstDay = day0.subtract(day0.get("day"), "day");
  // 星期数,以上月剩余天数+本月天数
  const rows = 6; //Math.ceil((day0.get("day") + day0.daysInMonth()) / 7);
  return Array(rows * 7)
    .fill(0)
    .map((n, i) => firstDay.add(i, "day"));
}
</script>

<style lang="less" rel="stylesheet/less">
.date-panel {
  .cell-item {
    width: 14.286%;
  }
  .week-list {
    .cell-item {
      line-height: 24px;
      padding: 5px 0;
    }
  }

  .date-list {
    .cell-item {
      padding: 2px;
      .date-cell {
        height: 42px;
        border: 2px solid #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #999;

        .lunar{
          font-size: 12px;
          transform: scale(.8);
        }
      }
      .current-month {
        color: #fff;
      }
    }
  }
}
</style>
