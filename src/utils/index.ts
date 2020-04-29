export const debounce = (fn: Function, time = 100) => {
  let timer: number = 0;
  return function () {
    // @ts-ignore
    const context = this;
    let args = arguments;
    clearTimeout(timer);
    // @ts-ignore
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, time);
  };
};

export function throttle(fn: Function, time: number = 16) {
  let pre = Date.now();
  return function () {
    // @ts-ignore
    const context = this;
    const now = Date.now();
    if (now - pre >= time) {
      fn.apply(context, arguments);
      pre = Date.now();
    }
  };
}
