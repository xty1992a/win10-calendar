import dayjs from "dayjs";

export function param2Obj(url = location.href) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, " ") +
      '"}'
  );
}

export const uniq = (list) => [...new Set(list)];

export const ellipsis = (count) => (str) =>
  str.length > count ? str.substr(0, count) + "..." : str;

export const copy = (o) => JSON.parse(JSON.stringify(o));

export const sleep = (time) =>
  new Promise((resolve) => setTimeout(resolve, time));

// 将相对图片路径加上OSS域名
// 将http图片,转为https
export const img_cdn = (path) =>
  /^https?/.test(path)
    ? path.replace(/^https?:/, "https:")
    : "https://files.1card1.cn/" + path.replace(/^\//, "");

export const debounce = (fn, time = 100) => {
  let timer = null;
  return function () {
    const context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, time);
  };
};

function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";
  return s.join("");
}

export const getUUID = () => uuid().replace(/-/g, "");

export const lowCaseObject = (object) =>
  Object.keys(object).reduce(
    (pre, key) => ({ ...pre, [key.toLowerCase()]: object[key] }),
    {}
  );

export const query = (key) =>
  lowCaseObject(window.APPLIACTION.$route.query)[key.toLowerCase()];

export const fmt = (str) => (v) =>
  dayjs(v).isValid() ? dayjs(v).format(str) : v;

export const limit = (min, max) => (value) =>
  Math.max(Math.min(max, value), min);

export const rdm = () => Math.random().toString(36).substr(2, 15);

export const findParent = (vm, name) => {
  if (vm.$options.name === name) return vm;
  while ((vm = vm.$parent)) {
    if (vm.$options.name === name) return vm;
  }
  return null;
};
