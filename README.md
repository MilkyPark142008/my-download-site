# 📱 MC 手机版下载站

[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-自动更新-blue?logo=github-actions)](https://github.com/MilkyPark142008/my-download-site/actions/workflows/update.yml)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-327873?logo=github)](https://fcl-dl.pages.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> 一个简洁高效的 MC 手机版启动器下载站，自动同步最新版本，支持多镜像下载加速。

## ✨ 功能特点

## ✨ 功能特点

- **自动同步**：每小时自动获取 FCL、MobileGlues、JRE 的最新 Release。
- **多镜像选择**：内置多个 GitHub 加速镜像，用户可自由切换下载源。
- **项目切换**：通过下拉菜单在 FCL、MobileGlues、JRE 之间切换。
- **模块折叠**：每个项目模块可点击标题折叠/展开，节省页面空间。
- **更新日志**：每个项目内置折叠式更新日志，方便查看版本更新内容。
- **响应式设计**：适配手机、平板和电脑屏幕。
- **文件完整显示**：所有文件名完整显示，自动换行，无截断。

## 🛠️ 技术栈

- **前端**：纯 HTML5 + CSS3 + JavaScript（无框架依赖）
- **CI/CD**：GitHub Actions（每小时自动获取 Release 数据）
- **托管**：GitHub Pages
- **数据来源**：
  - [FCL-Launcher](https://github.com/FCL-Team/FCL-Launcher)
  - [MobileGlues](https://github.com/MobileGlues/MobileGlues)
  - [JRE-for-Android-Loader](https://github.com/MCL-JRE-Maintainers/JRE-for-Android-Loader)

## 🚀 部署步骤

### 快速部署使用

1. **访问网站**
   - 直接访问：[https://fcl-dl.pages.dev/](https://fcl-dl.pages.dev/)

### 本地部署

1. **Fork 或克隆** 本仓库到你的 GitHub 账号
   ```bash
   git clone https://github.com/MilkyPark142008/my-download-site.git
   ```

2. **修改网站信息**（可选）：
   - 编辑 `index.html` 中的公告内容（位于 `<div class="announcement">` 内）
   - 可调整镜像源列表：编辑 `<select id="mirrorSelect">` 中的 `<option>`

3. **配置 GitHub Actions**
   - 无需额外操作，已配置每小时自动运行

4. **部署到 GitHub Pages**
   - 在仓库 `Settings` > `Pages` 中
   - 选择分支 `main` 和根目录 `/`
   - 保存后等待自动部署完成

5. **等待 Actions 运行**
   - 首次部署后，手动触发一次 Actions 工作流生成 JSON 文件
   - 之后每小时自动更新

### 使用静态服务器本地预览

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

## 📂 项目结构

```
my-download-site/
├── .github/
│   └── workflows/
│       └── update.yml          # GitHub Actions 自动更新工作流
├── index.html                  # 网站主页面
├── fcl.json                    # FCL 启动器版本数据（自动生成）
├── mobileglues.json            # MobileGlues 图形库版本数据（自动生成）
├── jre.json                    # JRE 运行环境版本数据（自动生成）
└── README.md                   # 项目说明文档
```

## 🔧 自定义指南

### 修改公告内容
在 `index.html` 中找到 `<div class="announcement">` 部分，修改其中的 `<p>` 和 `<p class="note">` 文本。

### 修改镜像源
找到 `<select id="mirrorSelect">`，增删或修改 `<option>` 标签。`value` 属性填写镜像前缀（如 `https://ghfast.top/`），标签文本可自定义。

### 添加新项目
1. **修改 GitHub Actions 工作流**：在 `.github/workflows/update-release.yml` 中添加获取新项目 Release 的步骤，生成对应的 JSON 文件。
2. **在 HTML 中添加项目选项**：在 `<select id="projectSelect">` 中添加新的 `<option>`。
3. **添加模块 HTML**：复制一份现有模块的结构，修改对应的 `id` 和标题。
4. **添加 JavaScript 逻辑**：复制现有模块的 JavaScript 代码，修改其中的变量名和 `fetch` 地址。

## 🔄 更新机制

项目使用 GitHub Actions 每小时自动执行以下任务：

1. 通过 GitHub API 获取 [FCL](https://github.com/FCL-Team/FCL-Launcher)、[MobileGlues](https://github.com/MobileGlues/MobileGlues)、[JRE](https://github.com/MCL-JRE-Maintainers/JRE-for-Android-Loader) 的最新 Release 数据
2. 生成对应的 JSON 数据文件（`fcl.json`、`mobileglues.json`、`jre.json`）
3. 自动提交并推送到仓库
4. GitHub Pages 自动重新部署

## 📋 更新日志

### v1.2.8.8 (2026-02-26)
- 优化下载速度和稳定性

### v1.0.0 (2026-02-23)
- 项目初始化
- 添加 FCL、MobileGlues、JRE 下载支持
- 部署到 GitHub Pages

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [FCL-Team](https://github.com/FCL-Team) - FCL 启动器开发团队
- [MobileGlues](https://github.com/MobileGlues) - MobileGlues 图形库开发团队
- [MCL-JRE-Maintainers](https://github.com/MCL-JRE-Maintainers) - JRE for Android 维护团队
- [aaaapai](https://github.com/aaaapai) - JRE 构建贡献者

## 📮 联系方式

- 如有问题或建议，欢迎在 [GitHub Issues](https://github.com/MilkyPark142008/my-download-site/issues) 中留言

---

如果觉得这个项目对你有帮助，请给个 ⭐ Star 支持一下！
