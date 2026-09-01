import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useAppStore } from "@/store/modules/app";
import { useUserStore } from "@/store/modules/user";
import { useMultiTabStore } from "@/store/modules/multi-tab";
import storage from "@/utils/storage";
import * as userApi from "@/api/user";

describe("Pinia Store Units", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    storage.clear();
  });

  it("appStore should update theme, layout and color correctly", () => {
    const appStore = useAppStore();
    expect(appStore.theme).toBe("dark");

    appStore.ToggleTheme("light");
    expect(appStore.theme).toBe("light");

    appStore.ToggleLayoutMode("topmenu");
    expect(appStore.layout).toBe("topmenu");

    appStore.ToggleColor("#52C41A");
    expect(appStore.color).toBe("#52C41A");

    appStore.ToggleWeak(true);
    expect(appStore.weak).toBe(true);

    appStore.setSidebar(false);
    expect(appStore.sidebar).toBe(false);
  });

  it("userStore should handle role and logout properly", async () => {
    vi.spyOn(userApi, "logout").mockResolvedValue({ code: 0 });

    const userStore = useUserStore();
    expect(userStore.token).toBe("");
    expect(userStore.name).toBe("");

    userStore.SET_TOKEN("test-token-12345");
    userStore.SET_NAME({ name: "Admin", welcome: "欢迎回来" });
    userStore.SET_ROLES({ id: "admin", permissions: [{ permissionId: "dashboard" }] });

    expect(userStore.token).toBe("test-token-12345");
    expect(userStore.name).toBe("Admin");
    expect(userStore.roles.permissions.length).toBe(1);

    await userStore.Logout();
    expect(userStore.token).toBe("");
    expect(userStore.roles.length).toBe(0);
  });

  it("multiTabStore should add and remove tabs", () => {
    const multiTabStore = useMultiTabStore();
    expect(multiTabStore.tabList).toEqual([]);

    multiTabStore.SET_MULTI_TAB(["/dashboard", "/example/table"]);
    expect(multiTabStore.tabList.length).toBe(2);

    const mockView = { name: "ExampleTable", meta: { Cache: false } };
    multiTabStore.ADD_EXCLUDE_VIEW(mockView);
    expect(multiTabStore.excludeViews).toContain("ExampleTable");

    multiTabStore.DEL_EXCLUDE_VIEW(mockView);
    expect(multiTabStore.excludeViews).not.toContain("ExampleTable");
  });
});
