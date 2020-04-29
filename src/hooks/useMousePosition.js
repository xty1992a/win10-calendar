import { onMounted, onUnmounted, ref, toRefs, reactive } from "vue";

// 传入一个dom引用,鼠标移入该元素时,派发鼠标在该元素上的位置
export default function (elRef) {
  const state = reactive({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    enter: false,
  });
  let rect = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  };

  function onEnter() {
    if (!elRef || !elRef.value) return;
    state.enter = true;
    rect = elRef.value.getBoundingClientRect();
    state.height = rect.height;
    state.width = rect.width;
  }
  function onMove(e) {
    const { clientX, clientY } = e;
    state.x = clientX - rect.left;
    state.y = clientY - rect.top;
  }
  function onLeave() {
    state.enter = false;
  }

  onMounted(() => {
    if (!elRef || !elRef.value) return;
    elRef.value.addEventListener("mouseenter", onEnter);
    elRef.value.addEventListener("mousemove", onMove);
    elRef.value.addEventListener("mouseleave", onLeave);
  });

  onUnmounted(() => {
    if (!elRef || !elRef.value) return;
    elRef.value.removeEventListener("mousemove", onMove);
    elRef.value.removeEventListener("mouseenter", onEnter);
    elRef.value.removeEventListener("mouseleave", onLeave);
  });

  return {
    ...toRefs(state),
  };
}
