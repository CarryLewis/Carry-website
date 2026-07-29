# Carry-website

[carrylewis.com](https://carrylewis.com) 的源代码仓库。推送到 `main` 分支后网站会自动部署。

## 项目结构

```
├── index.html          # 网站首页
├── CNAME               # 自定义域名配置
├── .github/workflows/  # 自动部署配置
└── README.md
```

## 本地开发

直接用浏览器打开 `index.html` 即可预览，或使用任意静态服务器：

```bash
npx serve .
```

## 部署

推送到 `main` 分支即自动部署，无需手动操作。