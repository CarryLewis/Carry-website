# Clinical Case Workspace · 公开项目简介

项目正文：`/projects/prototype/clinical-case-workspace/`（英文入口为 `/en/projects/prototype/clinical-case-workspace/`）。独立展示入口：`/clinical-case-workspace/`。个人网站上的项目介绍与合成样例，展示理念、功能、证据工作流、知识关联架构及路线图。

## 内容范围

保留合成原型截图、批注来源交互及注明日期的原型验证说明。课程、疾病与病例只介绍各自角色及关联方式，不发布个人知识库记录数量、关系数量或审计快照。公开目录不提供知识库元数据 JSON 下载。

原型说明与真实服务的状态分别标注：本地合成目录可演示关系确认，真实 OCR、模型、循证检索和 Notion 尚未接入。截图只含虚构教学资料，不包含私人 Notion 链接、库 ID、病历正文或私有源码。

## 网站入口

- 中英文作品列表和项目详情页。
- 项目详情直接展示 HTML 设计的完整正文，替代通用项目模板；无需再次点击演示按钮。
- `/knowledge/medical-basement/` 顶部的项目与架构链接。

项目条目提供中英文文案；独立 HTML 主体为中文。

## 交互与边界

栏目键盘切换、工作流阶段详情、合成批注选择与学习语义演示、截图放大。交互在当前页面完成，无上传、表单提交、模型或 Notion 请求，CSP 限制连接。

## 验证与发布

```sh
node scripts/check-clinical-case-showcase.mjs
npm run build:site
node scripts/check-bilingual.mjs
```

`build:site` 只构建，不运行 Notion 同步。检查脚本防止知识库统计及旧下载入口重新出现，并检查脚本语法、资源与项目入口。浏览器验证栏目、来源交互、截图弹窗及响应式布局。

本次按用户要求移除可能过时的知识库统计，通过 GitHub PR 合并并沿现有 GitHub Pages 流程发布。不修改域名、Pages/Sites 托管配置或 Notion 发布策略。

## 正文挂载

`ClinicalCaseProject` 在静态构建时复用仓库内 HTML 的正文与样式，以页面原生内容输出；去除独立页导航/页脚并将资源改为站内绝对地址。样式限定于文章容器，交互由 React 组件初始化和清理，不执行 HTML 中的内联脚本，不嵌入 iframe。保留网站导航、项目元信息和中英文路由；本文主体仍为中文。
