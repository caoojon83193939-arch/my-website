# caoojon&rsquo;s journal

caoojon 的个人博客 — Medium / Substack 风格的杂志式静态站，基于 [Astro](https://astro.build/) 构建。

🌐 在线访问：[www.43333333.xyz](https://www.43333333.xyz/)

## 技术栈

- [Astro 5](https://astro.build/) — 静态站点框架（Content Collections v2 + Glob Loader）
- Markdown / MDX 写作
- 字体：Source Serif 4（正文）+ Inter（界面）+ JetBrains Mono（代码）
- GitHub Pages 部署 + 自定义域名（CNAME）

## 功能

- 📰 Medium / Substack 杂志风排版（米白 / 墨黑 / 暖橙）
- 🌓 暗色 / 亮色模式自动跟随系统 + 手动切换（持久化）
- 📊 文章阅读进度条
- 🏷️ 首页标签筛选（技术 / 备赛 / 生活 / 随想）
- 📑 长文右侧目录（TOC，滚动高亮）
- ⏱️ 自动估算阅读时长
- 📡 RSS 订阅

## 目录结构

```
my-website/
├── astro.config.mjs       # Astro 配置（site / integrations）
├── package.json
├── tsconfig.json
├── public/
│   └── CNAME              # 自定义域名
├── src/
│   ├── content.config.ts  # Content Collections schema
│   ├── content/
│   │   └── posts/         # Markdown 文章
│   ├── components/        # Astro 组件
│   ├── layouts/           # 页面布局
│   ├── pages/             # 路由
│   └── styles/
│       └── global.css     # 全局样式
└── .github/workflows/
    └── deploy.yml         # GitHub Pages 自动部署
```

## 本地开发

```bash
# 装依赖（首次）
npm install

# 启动开发服务器：http://localhost:4321
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview
```

## 写新文章

推荐用脚本创建文章：

```bash
npm run new-post
```

脚本会依次询问标题、日期、分类、系列、主题、摘要和文件名，然后在 `src/content/posts/` 生成 `.md` 文件。生成后默认是草稿：

```markdown
draft: true
```

写完正文、本地预览没问题后，把它改成：

```markdown
draft: false
```

也可以手动复制 `src/content/posts/_template.md`，在同一目录下改成新的英文文件名，例如 `final-week-day-2.md`。frontmatter 示例：

```markdown
---
title: 你的标题
date: 2026-07-03
tag: 生活          # 只能写：技术 / 备赛 / 生活 / 随想
series: 期末周      # 可选，连续日记可以写同一个系列名
topics: [期末, 复盘] # 可选，用英文逗号分隔
excerpt: 一两句话的摘要，会显示在首页和 RSS 里。
featured: false
draft: true
---
```

发布前检查：

```bash
npm run dev
npm run build
git add .
git commit -m "Add blog post"
git push
```

常见失败原因：`tag` 写成了未支持的分类、`date` 不是 `YYYY-MM-DD`、`topics` 没用 `[主题一, 主题二]` 格式、漏写 `excerpt`、发布时忘了把 `draft` 改成 `false`。
## 部署

推送到 `main` 分支会触发 `.github/workflows/deploy.yml`，Actions 自动构建并发布到 GitHub Pages。CNAME 在 `public/CNAME`，自动绑定 `www.43333333.xyz`。

## License

文字内容版权归 caoojon 所有；代码部分 MIT。



