# 用 Obsidian 写博客

推荐把本仓库作为一个 Obsidian 仓库（Vault）使用：写作仍是 Markdown，发布仍由 GitHub Pages 自动完成，但不需要每次打开终端运行脚本。

## 第一次配置

1. 用 GitHub Desktop 克隆本仓库到电脑。
2. 打开 Obsidian，选择“打开本地文件夹作为仓库”，选中该项目根目录。
3. 在 Obsidian 的“设置 → 核心插件”中启用“模板”。
4. 在“设置 → 模板”中，把模板文件夹设为 `obsidian`。
5. 在“设置 → 文件与链接”中关闭“使用 Wiki 链接”，避免生成 Astro 不能识别的 `[[链接]]` 格式。

`.obsidian/` 已被 Git 忽略；这是你的个人编辑器设置，不会提交到网站仓库。

## 写一篇文章

1. 在文件浏览器中进入 `src/content/posts/`，新建笔记。
2. 立即将文件重命名为英文 slug，例如 `summer-review.md`。
3. 按 `Ctrl/Cmd + P`，运行“插入模板”，选择“博客文章”。
4. 填写标题、摘要、分类和正文。分类只能是：`技术`、`备赛`、`生活`、`随想`。
5. 写作中保持 `draft: true`；确认发布时改为 `draft: false`。

## 插图

推荐每篇文章使用自己的图片目录：

```text
public/images/posts/summer-review/
```

在正文中使用站点路径，不要使用本机路径或 Wiki 链接：

```markdown
![晚霞](/images/posts/summer-review/sunset.jpg)
```

你可以在资源管理器中把图片拖进上述目录，再回到 Obsidian 粘贴这条 Markdown。

## 预览与发布

最简单的发布方式：

1. 在 GitHub Desktop 查看改动。
2. 确认文章的 `draft: false`，图片也在改动列表中。
3. Commit，再 Push 到 `main`。
4. GitHub Actions 会自动检查文章、构建并部署网站。

需要本地预览时，在仓库终端运行：

```bash
npm run dev
```

## 小提示

- `excerpt` 是首页和 RSS 显示的摘要，建议 100 字以内。
- 标题或摘要中若含英文冒号，可用双引号包住，例如 `title: "我的工具：Obsidian"`。
- 想继续使用命令行也没问题：`npm run new-post` 会同时创建文章和对应图片目录。
