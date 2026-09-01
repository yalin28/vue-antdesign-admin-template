import { describe, it, expect } from "vitest";
import { whiteList, notFoundRouter } from "@/router/router.config";
import { listToTree, generator } from "@/router/generator-routers";

describe("Router & Generator Units", () => {
  it("should match whiteList routes", () => {
    expect(whiteList).toContain("login");
    expect(whiteList).toContain("register");
    expect(whiteList.includes("analysis")).toBe(false);
  });

  it("should have correct 404 path match in Vue Router 4", () => {
    expect(notFoundRouter.path).toBe("/:pathMatch(.*)*");
    expect(notFoundRouter.redirect).toBe("/404");
  });

  it("listToTree should convert flat list to hierarchical tree correctly", () => {
    const flatList = [
      { id: 1, parentId: 0, name: "dashboard", title: "仪表盘" },
      { id: 2, parentId: 1, name: "analysis", title: "分析页" },
      { id: 3, parentId: 0, name: "example", title: "示例" },
    ];
    const tree = [];
    listToTree(flatList, tree, 0);

    expect(tree.length).toBe(2);
    expect(tree[0].name).toBe("dashboard");
    expect(tree[0].children.length).toBe(1);
    expect(tree[0].children[0].name).toBe("analysis");
  });

  it("generator should format route objects with path and meta", () => {
    const mockMenu = [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { title: "工作台", icon: "dashboard" },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
          },
        ],
      },
    ];

    const generated = generator(mockMenu);
    expect(generated.length).toBe(1);
    expect(generated[0].path).toBe("/dashboard");
    expect(generated[0].meta.title).toBe("工作台");
    expect(generated[0].children.length).toBe(1);
    expect(generated[0].children[0].path).toBe("/dashboard/analysis");
  });
});
