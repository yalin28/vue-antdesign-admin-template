# Vue Ant Design Admin Template (Vue 3.x)

根据 [ant-design-pro-vue](https://github.com/sendya/ant-design-pro-vue) 改造后的 **开箱即用** 的后台管理系统模板，优化了很多内容，更轻量，更简洁，可以在此模板上快速、便捷地去构建自己的后台项目。 项目预览：[点我预览](https://yalin28.github.io/vue-antdesign-admin-template/)

## 🌟 特性与优化

- **优化**：项目结构和文件夹命名，项目结构更加合理
- **优化**：只保留基础的实例路由和页面，删除了其他页面
- **优化**：顶部 multiTab 的样式，可跟随 header 固定
- **优化**：[prettier](https://prettier.io/) 升级为最新的 2.x/3.x 规范
- **优化**：打包配置，可根据不同打包环境输出不同目录
- **优化**：multiTab 右键呼出菜单可选范围覆盖到整个 tab
- **优化**：切换路由的效果，并提供了两种切换效果
- **新增**：配置打包分析和快速 lint-fix 命令
- **新增**：全局可用的 less 变量
- **新增**：权限控制是否开启的配置
- **新增**：Tinymce 富文本编辑器
- **新增**：mock 提供了两种权限的账号，不同账号拥有不同菜单权限和相应的展示（super/admin，密码和账户名一致）
- **修复**：开启 multiTab 选项后，打开通过 multiTab 关闭的页面，页面组件继续缓存的问题
- **Vue 3 升级**：深度适配 **Vue 3.5+** 与 **Ant Design Vue 4.x**（CSS-in-JS + Design Token 动态主题变色）
- **工程化**：全面迁移至 **Vite 6** 极速构建与 **Pinia 2** 现代化状态管理
- **测试保障**：内置 **Vitest + @vue/test-utils** 覆盖 Store、路由算法、工具函数及核心组件

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
