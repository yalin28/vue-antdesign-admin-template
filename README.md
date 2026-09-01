# Vue Ant Design Admin Template (Vue 3.x)

基于 **Vue 3.5+**、**Ant Design Vue 4.x**、**Vite 6**、**Pinia 2** 与 **Vue Router 4** 的现代中后台前端解决方案。

[🔗 点击在线预览 (Live Demo)](https://yalin28.github.io/vue-antdesign-admin-template/)

## 🌟 特性

- ⚡️ **极速开发构建**：基于 Vite 6，毫秒级热更新，生产环境高效打包。
- 🎨 **Ant Design Vue 4.x 深度适配**：CSS-in-JS + Design Token 原生动态主题切换，无运行时 CSS 闪烁。
- 🛡 **企业级权限路由**：支持前端静态路由与基于后端角色权限树（RBAC）的动态路由生成与守卫。
- 🧩 **全套通用组件**：多标签页（MultiTab）、侧边栏/顶部导航布局（BasicLayout/UserLayout）、全局图标动态解析（Icon）、富文本编辑器（Tinymce）、异常页（403/404/500）等。
- 📊 **完整状态管理**：基于 Pinia 构建模块化 Store（app, user, permission, multiTab）。
- 🧪 **自动化测试套件**：基于 Vitest + @vue/test-utils 覆盖 Store、路由权限、工具函数与核心组件。
- 🛠 **开箱即用 Mock 服务**：内置 Mock.js 模拟登录、动态菜单树、用户信息与表格数据。
- 🚀 **自动化 CI/CD**：内置 GitHub Actions，代码推送至 `main` 自动测试并发布至 GitHub Pages。

## 📦 技术栈

| 技术 | 说明 | 版本 |
| --- | --- | --- |
| [Vue 3](https://vuejs.org/) | 渐进式 JavaScript 框架 | ^3.5.13 |
| [Ant Design Vue](https://www.antdv.com/) | 优秀的企业级 UI 组件库 | ^4.2.6 |
| [@ant-design/icons-vue](https://github.com/vueComponent/ant-design-icons-vue) | Ant Design 官方 Vue 图标库 | ^7.0.1 |
| [Vite](https://vitejs.dev/) | 下一代前端开发与构建工具 | ^6.1.1 |
| [Pinia](https://pinia.vuejs.org/) | Vue 官方直观状态管理库 | ^2.3.1 |
| [Vue Router](https://router.vuejs.org/) | Vue 官方路由管理器 | ^4.5.0 |
| [Vitest](https://vitest.dev/) | 现代极速单元测试框架 | ^3.0.6 |
| [Dayjs](https://day.js.org/) | 极简现代化日期库 | ^1.11.13 |
| [Axios](https://axios-http.com/) | Promise 驱动的 HTTP 请求库 | ^1.7.9 |

## 🚀 快速上手

### 安装依赖

```bash
# 推荐使用 pnpm
pnpm install

# 或者使用 npm
npm install
```

### 本地开发

```bash
pnpm dev
```

默认访问地址：`http://localhost:8000`

**测试账号：**
- 管理员账号：`admin`，密码：`admin`
- 超级账号：`super`，密码：`super`

### 运行测试

```bash
pnpm test
```

### 生产打包

```bash
pnpm build
```

### 预览生产包

```bash
pnpm preview
```
