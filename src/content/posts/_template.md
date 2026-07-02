---
title: 在这里写文章标题
date: 2026-05-24
tag: 生活
series: 系列名        # 可选，例如：期末周 / 电赛备赛
topics: [主题一, 主题二] # 可选，用英文逗号分隔
excerpt: 一两句话的摘要。会显示在首页列表和 RSS 里，不要写得太长，控制在 100 字以内最佳。
featured: false
draft: true
---

这里是文章正文。用普通的 Markdown 写就好。

## 二级标题

正文段落。可以加 **粗体**、*斜体*、`行内代码`、[链接文字](https://example.com)。

> 引用块。引用块会显示成左边带橙色竖线的样式，适合放感受或者引用别人说的话。

## 列表

无序列表：

- 第一项
- 第二项
- 第三项

有序列表：

1. 第一步
2. 第二步
3. 第三步

## 代码

行内 `code` 像这样。

代码块加语言名字会有语法高亮：

```python
def hello(name: str) -> str:
    return f"Hello, {name}"
```

```verilog
module led_blink(input clk, output reg led);
    reg [23:0] cnt;
    always @(posedge clk) begin
        cnt <= cnt + 1;
        if (cnt == 0) led <= ~led;
    end
endmodule
```

## 图片

```markdown
![图片描述](图片链接)
```

图片可以放在 `public/` 目录下，然后用 `/your-image.png` 引用。

## 发布前检查

- 文件名用英文小写、数字和横杠，例如 `final-week-day-2.md`
- `date` 用 `YYYY-MM-DD`，例如 `2026-07-03`
- `tag` 只能写 `技术`、`备赛`、`生活`、`随想` 之一
- 写作中保持 `draft: true`，确认发布时改成 `draft: false`
- 图片放进 `public/` 后，用 `/图片文件名` 引用，例如 `![封面](/cover.jpg)`

## 本地预览和发布

```bash
npm run dev
npm run build
git add src/content/posts/你的文章.md
git commit -m "Add blog post"
git push
```

推送到 `main` 后，GitHub Actions 会自动部署。Actions 变绿后，等一两分钟再打开网站或强刷页面。

---

## frontmatter 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 文章标题 |
| `date` | 是 | 日期，格式 `YYYY-MM-DD` |
| `tag` | 是 | 必须是「技术 / 备赛 / 生活 / 随想」之一 |
| `excerpt` | 是 | 摘要，首页和 RSS 显示，建议 100 字以内 |
| `featured` | 否 | 设为 `true` 会顶到首页「最新一篇」位置；一般保持 `false` |
| `draft` | 否 | `true` 表示草稿，不发布；`false` 表示发布 |

