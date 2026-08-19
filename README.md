# SnowySonnets

黑白灰古典二次元风格的个人文章站。

- 技术栈：Hugo + GitHub Pages
- 仓库：https://github.com/Shoufves/SnowySonnets
- 在线地址：https://shoufves.github.io/SnowySonnets/

## 本地预览

```bash
# 安装 Hugo（建议 Extended 版本）
hugo server
```

打开 http://localhost:1313/ 预览。

## 添加文章

在 `content/posts/` 下创建目录和 Markdown 文件：

```text
content/posts/
├── linux/
│   └── shell/
│       └── 我的文章.md
└── 随笔/
    └── 第一篇.md
```

每篇文章头部示例：

```yaml
---
title: "文章标题"
date: 2025-01-01T10:00:00+08:00
description: "文章摘要"
tags: ["随笔"]
draft: false
---
```

推送到 GitHub 的 `main` 分支后，GitHub Actions 会自动构建并部署。

## 目录说明

- `content/`：文章与页面内容
- `static/img/`：美术素材
- `static/fonts/`：字体文件
- `themes/snowysonnets/`：自定义主题
- `.github/workflows/deploy.yml`：自动部署配置
