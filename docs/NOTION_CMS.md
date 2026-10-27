# carrylewis.com：最简 Notion Headless CMS

本次仅修改本地源码，没有推送 GitHub、修改线上设置、建立 Notion 数据库或执行部署。CMS 默认关闭；按下方步骤准备好数据源后再启用。

## 已核实的现状与选择

- GitHub 仓库：[CarryLewis/Carry-website](https://github.com/CarryLewis/Carry-website)，公开仓库，默认分支 `main`。
- 远端 `package.json` 与本地均使用 Next.js 16.2.12、React 19、TypeScript、Tailwind；本地 `version` 为 1.0.0，远端为 0.1.0，说明本地已有未在远端体现的改动，不能整包覆盖远端。
- 远端与本地 `next.config.ts` 均为 `output: "export"`、`trailingSlash: true`，输出 `out/`。
- 远端 `.github/workflows/deploy.yml` 使用 GitHub Pages；`public/CNAME` 为 `carrylewis.com`。查到的最近一次工作流运行在 main 成功：[run 40320673130](https://github.com/CarryLewis/Carry-website/actions/runs/40320673130)，对应提交 `40bb62c25bb9b883ae795f1d6e1b7c401b8dc95c`。
- 当前工作目录没有 `.git`，是源码副本；没有可安全直接提交的本地分支。准备上线前，要把本次相关文件合入真实仓库的新分支并检查差异。
- 未发现项目级 Vercel 配置或关联记录；本轮没有 Vercel 管理接口，不据此断言账户内没有 Vercel 项目。

因此沿用 **Notion API → 构建时标准化 JSON + 本地图片 → Next.js 静态页面 → 现有 GitHub Actions / Pages**。不增加数据库服务、后端进程、Markdown 渲染依赖或新的托管平台。

浏览器只读取站点原生 HTML 和本站图片。`/journal/` 分为书单、随笔、排行榜；详情地址为 `/journal/book/<slug>/`、`/journal/essay/<slug>/`、`/journal/ranking/<slug>/`。入口在“探索 → 阅读与记录”和“思考”页面。原有 medical-basement iframe 不受这套独立 CMS 管理。

## 1. 在 Notion 建一个专用数据库

新建完整数据库 `Website Content`，使用一个数据源，不要把私人知识库整体共享给集成。不需要 Publish to Web。

属性名称与类型必须完全一致（可以为属性添加中文说明）：

- `Title`：Title（标题）。将默认 Name 属性重命名为 Title。
- `Slug`：Text（富文本）。稳定的英文小写路径，例如 `the-phantoms-in-the-brain`；只支持字母、数字和单个短横线。
- `Type`：Select。选项为 `book`、`essay`、`ranking`。
- `Status`：Select，**不是 Notion 的 Status 属性类型**。选项为 `Draft`、`Published`、`Withdrawn`，新条目保持 Draft。
- `PublishedAt`：Date。Published 条目必须填写；建议包含时间和 `Asia/Shanghai` 时区。仅填日期按 UTC 00:00 判断，上海为当日 08:00。
- `Summary`：Text。列表摘要，也用于页面描述。
- `Author`：Text。可空，用于书籍作者等。
- `Rank`：Number。可空，填写时必须是正整数；用于书单排序。排行榜本身是一篇页面，榜内名次使用正文编号列表，便于编辑。
- `Tags`：Multi-select。可空。

正文写在条目页面内；封面使用页面封面，插图使用图片块。

建议建立三个 Type 视图和一个 Draft 视图；视图仅帮助编辑，API 的发布规则独立执行。不要依赖视图过滤来保护草稿。

## 2. 建立最小权限连接

1. 在 [Notion connections](https://www.notion.so/profile/integrations) 创建内部连接（Internal connection），仅授予读取内容所需权限；不需要更新、插入或读取用户信息。
2. 在专用数据库的 Connections 中添加该连接，只共享这个数据库。
3. 在数据库的 Manage data sources 中复制 **data source ID**。不是页面 URL、视图 ID，也不要直接把 database ID 当成 data source ID。数据源与数据库的区分见 [Notion 查询接口](https://developers.notion.com/reference/query-a-data-source)。
4. 保存连接密钥到本地 `.env.local` 和 GitHub Actions Secret，不要发到聊天、Notion 页面或代码里。

本次代码固定 `Notion-Version: 2026-03-11`，使用 `POST /v1/data_sources/{id}/query` 与分页 blocks API。[版本说明](https://developers.notion.com/reference/versioning)；[2026-03-11 变更](https://developers.notion.com/guides/get-started/upgrade-guide-2026-03-11)。

## 3. 本地配置与预览（不会部署）

使用 Node.js 22+。把 `.env.example` 复制为 `.env.local` 后，在本地编辑器填写：

```dotenv
NOTION_SYNC_ENABLED=true
NOTION_TOKEN=在本地填写实际连接密钥
NOTION_DATA_SOURCE_ID=在本地填写实际数据源UUID
NOTION_IMAGE_HOSTS=
```

这些中文值是说明，不是可用的配置。`.env.local` 已被忽略。命令会读取该文件；不要把真实密钥直接写进命令历史。

```bash
npm ci
npm run test:notion
npm run sync:notion
npm run dev
```

打开本地 `/journal/` 和 `/thinking/`。`npm run dev` 读取最近一次同步快照；在 Notion 修改内容后先重新执行 `npm run sync:notion`。

生产静态导出验证：

```bash
npm run build
node scripts/verify-notion-export.mjs
```

`npm run build` 先同步再构建。没有配置时默认生成空列表，不会放入假文章；明确启用但密钥/ID 缺失时立即失败。`npm run build:site` 只渲染已有快照，给已经完成同步的 CI 使用，不能当作新的线上内容同步。

## 4. GitHub 配置与触发

在仓库 Settings → Secrets and variables → Actions 中配置：

- **Secret** `NOTION_TOKEN`：只读内部连接密钥。
- **Variable** `NOTION_DATA_SOURCE_ID`：专用数据源 UUID。
- **Variable** `NOTION_SYNC_ENABLED`：完成验证后设为字符串 `true`；缺省或 `false` 时不启用 Notion 内容，也跳过定时部署。
- **Variable** `NOTION_IMAGE_HOSTS`：可选，精确外部图片域名，逗号分隔；默认留空即可使用上传到 Notion 的图片。

工作流只把 Secret 交给同步步骤。Next.js 构建步骤不接收该密钥；没有 `NEXT_PUBLIC_` 环境变量，也没有把密钥写入配置或快照。工作流仍只需 `contents: read`、`pages: write`、`id-token: write`，不回写生成内容到公开仓库。

本地已加入以下触发配置，合入真实仓库后才生效：

- 原有 push main / workflow_dispatch / ECG 等通知保留。
- 每小时第 17 分钟轮询，只有 `NOTION_SYNC_ENABLED=true` 时运行。调度基于 UTC；上海时间同样是每小时第 17 分钟。GitHub 调度可能延迟，不承诺即时发布或撤稿。
- 手动 Actions → Deploy to GitHub Pages → Run workflow 可以立即请求一次构建；勾选 `notion_full_refresh` 可忽略正文缓存。
- 预留 `repository_dispatch: notion-updated`，没有自动开通 Notion webhook；MVP 不依赖 webhook 或额外 PAT。
- `Check Notion CMS without deployment` 可在 PR/手动运行，使用空快照验证测试与静态导出，不接收 Notion 密钥，也不部署。

**正式切换前**：将本次相关修改放入 `codex/notion-cms` 等新分支，比较远端已有改动，先运行不部署的检查。需要带真实内容审阅时，先在本地验证完整静态导出。合并到 main 或手动运行现有 Deploy 工作流会真正发布，须由网站所有者明确决定。本次未执行这些操作。

## 发布门槛、增量与撤稿

同步器先核对全部属性类型，再向 API 查询 `Status = Published`，取完所有分页，随后再次检查本地发布门槛：没有在垃圾箱/归档，PublishedAt 已到且合法，Title/Slug/Type/Rank 合法，同类内容路径不重复。Published 条目缺失必要字段会阻止整次构建；未来时间条目暂不发布。未知 Status 永不发布。

每次均获取完整的已发布成员清单，不能只查询“最近编辑”，否则无法发现撤稿或删除。正文按 `page.id + last_edited_time` 复用，图片文件存在才允许命中；缓存满 24 小时自动重抓正文和图片，以修正嵌套块编辑时间不传播、外链图片内容变动等情况。需要立刻确保所有嵌套内容更新时执行：

```bash
npm run sync:notion -- --full
```

GitHub Actions 缓存仅保存这份**已经公开的**标准化 JSON 和本地图片，按分支隔离；缓存不是发布真相来源，恢复缓存后仍必须成功查询 Notion。缓存丢失只会导致重新下载，查询不完整、分页异常、HTTP/字段/图片错误会阻断本次部署。429/529 等有界重试尊重 Retry-After，普通请求按约每秒 2.8 次串行执行。[Notion 限流说明](https://developers.notion.com/reference/request-limits)。

同步末尾再次查询已发布清单，若期间状态或元数据发生变化就停止，避免发布较早抓取的正文。它不是 Notion 的跨请求事务：最终检查之后的修改仍要等下一次成功部署；24 小时纠偏也不是实时同步。

撤稿：把 Status 改为 Withdrawn/Draft，或移到垃圾箱、删除、移出该数据源。下一次**成功**同步会从快照中剔除该条目，并清理不再被引用的图片；全量静态导出不再生成旧详情页。改 Slug 同样删除旧路径，不自动重定向。移除整个数据源的授权会导致失败，不能用“断开连接”代替撤稿。

需要撤空全站 CMS：在数据源将所有条目撤稿后运行一次部署，或把 `NOTION_SYNC_ENABLED=false` 并手动运行一次部署。只是关闭定时任务不会改动已经在线的页面。

线上旧页面在新部署成功前继续存在，浏览器/CDN 缓存、搜索引擎、历史构建产物和 GitHub Actions 缓存也不会被远程抹除。敏感误发时应立即修正源数据、触发部署，并删除相关 Actions 缓存和构建产物；如曾把敏感内容提交 Git 历史，还需单独处理历史。回滚整个旧构建可能重新公开已撤文章，优先修正代码后从当前 Notion 状态重新构建。

## 图片和正文支持范围

Notion 托管文件的签名 URL 会过期，因此在构建时下载，最终仅保存 `/notion/<SHA256>.<ext>`。内容哈希避免同名图片互相覆盖，也让新内容使用新 URL。[Notion 文件有效期说明](https://developers.notion.com/guides/data-apis/retrieving-files)。

支持上传到 Notion 的常见文件域名；外链图片需要显式配置精确 HTTPS 域名，重定向每一跳都检查域名，不向图片服务器发送 Notion 密钥。每张上限 10 MiB，验证 MIME 和文件签名，仅允许 PNG/JPEG/GIF/WebP/AVIF。SVG、PDF、视频和未知图片域名会停止同步，建议先转为支持的图片并上传到 Notion。下载失败不会静默留下临时链接或破图。

支持段落、三级标题、粗体/斜体/删除线/行内代码、安全链接、嵌套有序/无序列表、引用、callout、toggle、to-do、代码、分隔线、图片、表格和列（列会变为顺序正文）。图片 caption 同时作为替代文字。正文由 React 转义渲染，不执行原始 HTML，不允许 javascript 链接。

不支持的块（子页面、内嵌数据库、synced block、embed、公式等）会明确报错并停止同步，不会递归抓取未单独发布的页面，也不会悄悄丢失正文。将子页面拆成独立 Published 条目并用公开站点地址链接。

## 验收顺序

1. 在专用数据源建立三条测试内容，Type 分别 book/essay/ranking；先全部 Draft。同步并构建，确认 `/journal/` 空列表，导出目录、页面源代码和网络请求中没有草稿正文。
2. 将三条设为 Published，填写过去的 PublishedAt 和不同 Slug。完整同步/构建，检查列表、三种详情页、中文、嵌套列表、表格、代码和封面/插图。页面应保持网站原生样式，不是 iframe。
3. 添加一条未来时间 Published、一条 Draft，确认都不出现在快照和 out/。故意将 Slug 重复或字段类型设错，确认构建失败且旧快照不被覆盖。
4. 不修改再次同步，日志应显示 reused；编辑正文或元数据后观察 fetched。测试深层块后运行 --full，确认变化出现；去掉缓存目录应仍能完整恢复。
5. 先导出某条，再改为 Withdrawn、移到垃圾箱、改 Slug 或清空所有 Published；每种情况重新同步/构建并运行 verify-notion-export，检查旧 HTML 和孤立图片消失。
6. 人为撤销连接读取权限或使用无效图片地址，确认本轮失败，不生成可部署的新快照；恢复权限后可重新构建。
7. 浏览器开发者工具中确认只请求本站图片，没有 api.notion.com 请求；检查静态产物无连接密钥、签名图片地址和草稿文字。
8. 经明确决定部署后，在真实域名复核 `/journal/`、详情直达、手机布局、图片和被撤旧地址 404；记录该次部署时间。到这一步才算完成真实线上联调。

## Vercel（未来可选）

本轮不迁移。若以后明确决定使用 Vercel，可保留当前静态导出，安装命令 `npm ci`、构建命令 `npm run build`、输出目录 `out`，把相同四个变量安全配置在目标环境。Preview 和 Production 分别控制启用，不把生产密钥交给不可信的预览构建。Vercel 的内容更新需要额外触发新构建（人工或受保护的部署钩子）；不能假定 GitHub Pages 的定时任务会自动更新 Vercel。域名/DNS/部署钩子均需单独确认并实施。
