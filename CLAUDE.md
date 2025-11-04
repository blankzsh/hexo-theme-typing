[根目录](../../CLAUDE.md) > [themes](../) > **hexo-theme-typing**

# hexo-theme-typing 主题模块

## 模块职责

hexo-theme-typing是一个清新、简洁的Hexo博客主题，提供现代化的响应式布局和打字机效果。主题支持暗色模式、多种评论系统、文章分类和标签功能。

## 入口与启动

- **主布局文件**: `layout/layout.ejs`
- **页面模板**:
  - `layout/post.ejs` - 文章页面模板
  - `layout/page.ejs` - 页面模板
  - `layout/archive.ejs` - 归档页面模板
  - `layout/category.ejs` - 分类页面模板
  - `layout/tag.ejs` - 标签页面模板

## 对外接口

### 主题配置接口

主题通过 `_config.yml` 文件提供配置接口：

```yaml
# 暗色模式
dark: false

# 导航菜单
menu:
  Home: /
  Archives: /archives
  About: /about

# 个人信息
nickname: Chiway Wang
description: "个人简介"

# 社交链接
links:
  github: https://github.com/blankzsh
  envelope: mailto:shell7@petalmail.com
  rss: /atom.xml
```

### 部分模板 (Partial Templates)

- `layout/_partial/head.ejs` - HTML头部元素
- `layout/_partial/header.ejs` - 页面头部
- `layout/_partial/footer.ejs` - 页面底部
- `layout/_partial/article.ejs` - 文章内容区域
- `layout/_partial/post/` - 文章相关子模板

## 关键依赖与配置

### 核心依赖

```json
{
  "dependencies": {
    "gitment": "^0.0.3",
    "normalize.css": "^8.0.0",
    "typo.css": "^2.1.2"
  },
  "devDependencies": {
    "autoprefixer": "^9.2.1",
    "cssnano": "^4.1.5",
    "postcss-cli": "^7.1.0"
  }
}
```

### 构建工具

- **Makefile**: 提供构建和部署命令
- **PostCSS**: CSS后处理器，支持自动前缀和压缩

## 数据模型

主题使用Hexo的标准数据模型：

- **文章**: 标题、内容、日期、标签、分类
- **页面**: 独立页面内容
- **配置**: 主题配置文件

## 测试与质量

- **预览图片**: `preview/preview.png` 和 `preview/preview-dark-mode.png`
- **多语言支持**: `languages/` 目录下支持多种语言
- **响应式设计**: 适配桌面和移动设备

## 常见问题 (FAQ)

1. **如何自定义主题颜色?**
   - 修改CSS变量或创建自定义样式文件

2. **如何添加新的社交链接?**
   - 在主题配置文件的`links`部分添加新链接

3. **如何启用暗色模式?**
   - 设置`dark: true`在主题配置文件中

## 相关文件清单

### 核心文件
- `layout/layout.ejs` - 主布局文件
- `_config.yml` - 主题配置文件
- `package.json` - 依赖管理
- `makefile` - 构建脚本

### 资源文件
- `source/js/typing.js` - 打字机效果脚本
- `source/css/donate.css` - 打赏功能样式
- `source/images/` - 图标和图片资源

### 模板文件
- `layout/` - 页面模板目录
- `layout/_partial/` - 部分模板目录
- `languages/` - 多语言支持文件

## 变更记录 (Changelog)

- 2025-11-02 12:22:54 - 初始化主题模块文档

---

*本文档由AI辅助生成，遵循模块实际情况。最后更新: 2025-11-02 12:22:54*