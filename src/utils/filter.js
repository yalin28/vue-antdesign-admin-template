import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

export function NumberFormat(value) {
  if (!value && value !== 0) {
    return "0";
  }
  return value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
}

export function formatDate(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  if (!dataStr) return "";
  return dayjs(dataStr).format(pattern);
}

export default {
  NumberFormat,
  formatDate,
  dayjs: formatDate,
  moment: formatDate,
};
