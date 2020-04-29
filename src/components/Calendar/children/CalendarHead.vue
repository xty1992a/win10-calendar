<template>
  <div class="cell-list calendar-head">
    <span @click="setPanelMode">{{ dateString }}</span>
    <div class="icon-wrap">
      <Icon name="arrow_up" @click="upward"/>
      <Icon name="arrow_down" @click="downward"/>
    </div>
  </div>
</template>

<script>
  import {computed, inject, ref} from "vue";
  import dayjs from "dayjs";
  import Icon from "@/components/Icon";

  const fmt = (fmtString) => (date) =>
    dayjs(date).isValid() ? dayjs(date).format(fmtString) : date;
  const fmtDay = fmt("YYYY-MM-DD");
  const fmtDate = fmt("YYYY年M月");
  const fmtYear = fmt("YYYY年");

  export default {
    name: "calendar-head",
    components: {Icon},
    setup(props, ctx) {
      const [displayMode, setDisplayMode] = inject("displayMode", [
        ref("date"),
        (v) => v,
      ]);
      const [date, setDate] = inject("date", [ref(new Date()), (v) => v]);
      const dateString = computed(() => (displayMode.value === "date" ? fmtDate : fmtYear)(date.value));

      const setPanelMode = () => {
        let mode = "date";
        if (displayMode.value === "date") {
          mode = "month";
        }
        if (displayMode.value === "month") {
          mode = "year";
        }
        if (displayMode.value === "year") {
          mode = "year";
        }
        setDisplayMode(mode);
      };

      const setMonth = (isAdd) => () => {
        const unitMap = {
          date: "month",
          month: "year",
        };

        const setMap = {
          date: {
            value: 1,
            unit: "month",
          },
          month: {
            value: 1,
            unit: "year",
          },
          year: {
            value: 16,
            unit: "year",
          },
        };

        const setter = setMap[displayMode.value];

        /*      const value = isAdd
          ? dayjs(date.value).add(1, unitMap[displayMode.value])
          : dayjs(date.value).subtract(1, unitMap[displayMode.value]);*/
        const value = isAdd
          ? dayjs(date.value).add(setter.value, setter.unit)
          : dayjs(date.value).subtract(setter.value, setter.unit);
        setDate(value.toDate());
      };
      const upward = setMonth(false);
      const downward = setMonth(true);

      return {
        upward,
        downward,
        setPanelMode,
        dateString,
      };
    },
  };
</script>

<style lang="less" rel="stylesheet/less">
  .calendar-head {
    position: relative;
    z-index: 1;
    padding: 10px 18px;
    justify-content: space-between;

    span {
      color: #fff;
    }

    .icon-wrap {
      margin-right: -10px;

      svg {
        cursor: pointer;
        margin: 0 10px;
      }
    }
  }
</style>
