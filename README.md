## vue3-ts-admin-template

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-3.2.36-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/element-plus/element-plus">
    <img src="https://img.shields.io/badge/element--plus-2.2.12-brightgreen.svg" alt="element-plus">
  </a>
  <a href="https://github.com/vuejs/vuex">
    <img src="https://img.shields.io/badge/vuex-4.0-brightgreen" alt="vuex">
  </a>
</p>

> vue3-ts-admin-template 是一个管理端模板解决方案，它是基于vue3.2+ts+vuex+webpack+element-plus。

```shell script
# 克隆项目
git clone  [you_git_repository_address]
# 安装依赖
npm install

# 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run serve
```

## 发布

```shell script
# 构建开发环境
npm run dev
# 构建测试环境
npm run sit
# 构建预uat环境
npm run uat
# 构建生产环境
npm run prod
```

## [Git 提交规范](https://npmmirror.com/package/dh-scm/v/0.1.26)

**格式示例：**

```
<type>: <subject>
```
### type

用于说明本次提交的类别，必须是以下可选类别中的一个:

- `ci`: ci 配置文件和脚本的变动;
- `chore`: 构建系统或辅助工具的变动;
- `polish`: 代码或者功能模块的改进和完善;
- `fix`: 代码 BUG 修复;
- `feat`: 新功能;
- `perf`: 性能优化和提升;
- `refactor`: 仅仅是代码变动，既不是修复 BUG 也不是引入新功能;
- `style`: 代码格式调整，可能是空格、分号、缩进等等;
- `docs`: 文档变动;
- `test`: 补充缺失的测试用例或者修正现有的测试用例;
- `revert`: 回滚操作;
