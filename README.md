# my-website

caoojon 的个人博客 — 一个用来写写日记、记录学习生活的小角落。

🌐 在线访问：[www.43333333.xyz](http://www.43333333.xyz/)

## 技术栈

- 纯静态 HTML + CSS（没有任何框架，刀耕火种但很自由）
- GitHub Pages 托管
- CNAME 自定义域名

## 目录结构

```
my-website/
├── index.html          # 首页
├── CNAME               # 自定义域名
├── assets/
│   └── style.css       # 共享样式
└── posts/
    ├── post-1.html     # 模电学习日记
    ├── post-2.html     # 电赛备战日记
    └── post-3.html     # 生活随笔
```

## 本地预览

直接用浏览器打开 `index.html` 即可，或者起一个简易服务器：

```bash
python -m http.server 8000
# 然后访问 http://localhost:8000
```

## 写新日记

1. 复制 `posts/post-1.html` 改名
2. 修改标题、日期、tag（`tag-tech` / `tag-life` / `tag-think` / `tag-study`）
3. 在 `index.html` 的 `.posts-grid` 里加一张新卡片

## License

文字内容版权归 caoojon 所有，代码部分 MIT。
