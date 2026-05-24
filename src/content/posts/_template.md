---
title: 在这里写文章标题
date: 2026-05-24
tag: 生活
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

## 写完后怎么发

把上面的 `draft: true` 改成 `false`，保存就发布了。

---

## frontmatter 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 文章标题 |
| `date` | 是 | 日期，格式 `YYYY-MM-DD` |
| `tag` | 是 | 必须是「技术 / 备赛 / 生活 / 随想」之一 |
| `excerpt` | 是 | 摘要，首页和 RSS 显示 |
| `featured` | 否 | 设 true 顶到首页「最新一篇」位置（默认是日期最新那篇）|
| `draft` | 否 | 设 true 不会发布（写作时用） |
