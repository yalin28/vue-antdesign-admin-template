import { defineStore } from "pinia";

export const useMultiTabStore = defineStore("multiTab", {
  state: () => ({
    tabList: [],
    excludeViews: [],
  }),
  actions: {
    SET_MULTI_TAB(tabList) {
      this.tabList = tabList;
    },
    ADD_EXCLUDE_VIEW(view) {
      if (this.excludeViews.includes(view.name)) return;
      if (!view.meta?.Cache) {
        this.excludeViews.push(view.name);
      }
    },
    DEL_EXCLUDE_VIEW(view) {
      const index = this.excludeViews.indexOf(view.name);
      if (index > -1) {
        this.excludeViews.splice(index, 1);
      }
    },
    addNoCachedView(view) {
      this.ADD_EXCLUDE_VIEW(view);
    },
    delNoCachedView(view) {
      this.DEL_EXCLUDE_VIEW(view);
      return Promise.resolve([...this.excludeViews]);
    },
  },
});

export default useMultiTabStore;
