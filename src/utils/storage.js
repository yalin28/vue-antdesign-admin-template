import { storageOptions } from "@/config/index";

const prefix = storageOptions.namespace || "PRO__";

export const storage = {
  get(key, defaultValue = null) {
    try {
      const fullKey = prefix + key;
      const raw = localStorage.getItem(fullKey);
      if (!raw) return defaultValue;
      const item = JSON.parse(raw);
      if (item.expire && item.expire < Date.now()) {
        localStorage.removeItem(fullKey);
        return defaultValue;
      }
      return item.value !== undefined ? item.value : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },
  set(key, value, expire = null) {
    try {
      const fullKey = prefix + key;
      const data = {
        value,
        expire: expire ? Date.now() + expire : null,
      };
      localStorage.setItem(fullKey, JSON.stringify(data));
    } catch (e) {
      console.error("storage set error", e);
    }
  },
  remove(key) {
    const fullKey = prefix + key;
    localStorage.removeItem(fullKey);
  },
  clear() {
    localStorage.clear();
  },
};

export const ls = storage;
export default storage;
