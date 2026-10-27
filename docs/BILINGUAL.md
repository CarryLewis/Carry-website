# 中英双语发布

## URL 与语言

- 中文：`/`、`/thinking/`、`/about/`、`/projects/`。
- English：`/en/`、`/en/thinking/`、`/en/about/`、`/en/projects/`。
- 语言切换保留当前路径、查询参数与锚点；不按浏览器语言自动跳转。
- 两套 HTML 使用独立根布局，初始 HTML 即具有正确的 `lang`；核心页面提供 canonical 与中英 hreflang。
- 首屏、问题线索、开篇、About、作品目录及六个项目说明具有对应中英文文案。
- 第一版研究/知识/实验档案保留原文，并明确提示其内容语言；两种导航均可访问。
- Notion 个人文章保留作者原文。英文阅读库翻译界面，明确告知正文仍是原文，不自动生成用户未确认的思想译文。
- 交互演示、静态实验及外部站点保持自身网址与语言设置，不给媒体路径添加 `/en/`。

## 内容维护

`src/i18n/english.json` 保存核心文案译文，`src/i18n/projects.ts` 保存项目说明的中文编辑层。中文个人原稿保留在 `src/data/portrait.ts`。页面由同一组组件呈现，避免两套版式逐渐不一致。

Notion 同步代码及其公开发布门槛继续保留。生成的 `content/notion/` 和 `public/notion/` 不纳入源码提交；构建工作流按现有配置读取公开内容。

字体随网站提供，来源为 Fontsource 中的 Source Serif 4、IBM Plex Sans 与 IBM Plex Mono，使用各自附带的 OFL 许可。构建不再依赖 Google Fonts 网络请求。

## 验证

- `npm run build:site`
- `npx tsc --noEmit`
- `node scripts/check-bilingual.mjs`
- `npm run test:notion`
- `node scripts/verify-notion-export.mjs`

浏览器检查应覆盖：中英同页切换、开篇与项目详情、手机菜单、页面宽度、英文内链，以及进入原有心电模拟器。

本轮验证：77 个页面构建通过；14 个双语入口页的 246 处链接/图片及语言元数据通过；类型检查通过，Notion 同步测试 12/12 通过。手机 390px 上的英文文章、Labwise 详情和 About 无横向溢出，同页切换和联系区锚点保留通过。没有公开 Notion 文章时，阅读库仍可正常静态导出。
