
# Ant Design Pro Vue Template

根据 [ant-design-pro-vue](https://github.com/sendya/ant-design-pro-vue) 改造后的 **开箱即用** 的后台管理系统模板，优化了很多内容，更轻量，更简洁，可以在此模板上快速、便捷地去构建自己的后台项目。
项目预览：[国内地址点我](https://really28.gitee.io/vue-antdesign-admin-template-pages) | [国外地址点我](https://yalin28.github.io/vue-antdesign-admin-template/) 


* 优化：项目结构和文件夹命名，项目结构更加合理
* 优化：只保留基础的实例路由和页面，删除了其他页面
* 优化：顶部 multiTab 的样式，可跟随 header 固定
* 优化：[prettier](https://prettier.io/) 升级为最新的2.x
* 优化：打包配置，可根据不同打包环境输出不同目录
* 优化：multiTab 右键呼出交菜单可选范围覆盖到整个 tab
* 优化：切换路由的效果，并提供了两种切换效果
* 新增：配置打包分析和快速 lint-ifx 命令
* 新增：全局可用的 less 变量
* 新增：权限控制是否开启的配置
* 新增：Tinymce 富文本编辑器
* 新增：mock 提供了两种权限的账号，不同账号拥有不同菜单权限和相应的展示（super/admin，密码和账户名一致）
* 修复：开启 multiTab 选项后，打开通过 multiTab 关闭的页面，页面组件继续缓存的问题

### 使用说明

#### 1. 拉取项目代码

```
git clone https://github.com/yalin28/vue-antdesign-admin-template.git
```

#### 2. 安装依赖

* 推荐方式

```
yarn 
```
* 备选方式

```
npm i
```

```
cnpm i
```

#### 3. 运行项目
```
npm run dev
```

#### 4. 打包项目

正式环境：
```
npm run build-prod
```

测试环境：
```
npm run build-test
```

#### 5. 打包分析

```
npm run report
```

#### 6. 代码格式修复

```
npm run lint-fix
```



## License

[MIT](http://opensource.org/licenses/MIT)
