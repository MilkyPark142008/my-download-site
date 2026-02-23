# MC手机版下载站

这是一个为 Minecraft 玩家提供的下载站，自动同步最新版本。网站每小时通过 GitHub Actions 自动获取官方 Release 信息，并支持多镜像下载加速。

## ✨ 功能特点

- **自动同步**：每小时自动获取 FCL、MobileGlues、JRE 的最新 Release。
- **多镜像选择**：内置多个 GitHub 加速镜像，用户可自由切换下载源。
- **项目切换**：通过下拉菜单在 FCL、MobileGlues、JRE 之间切换。
- **模块折叠**：每个项目模块可点击标题折叠/展开，节省页面空间。
- **更新日志**：每个项目内置折叠式更新日志，方便查看版本更新内容。
- **响应式设计**：适配手机、平板和电脑屏幕。
- **文件完整显示**：所有文件名完整显示，自动换行，无截断。

## 🛠️ 技术栈

- **前端**：纯 HTML + CSS + JavaScript（无框架）
- **CI/CD**：GitHub Actions（每小时自动获取 Release 数据）
- **托管**：Cloudflare Pages 或 GitHub Pages

## 🚀 部署步骤

1. **Fork 或克隆** 本仓库到你的 GitHub 账号。
2. **修改网站信息**（可选）：
   - 编辑 `index.html` 中的公告内容（位于 `<div class="announcement">` 内）。
   - 可调整镜像源列表：编辑 `<select id="mirrorSelect">` 中的 `<option>`。
3. **配置 GitHub Actions**（无需额外操作，已配置每小时自动运行）。
4. **部署到 Cloudflare Pages 或 GitHub Pages**：
   - **Cloudflare Pages**：连接你的 GitHub 仓库，选择“无构建命令”，输出目录留空即可。
   - **GitHub Pages**：在仓库 Settings > Pages 中，选择分支 `main` 和根目录，保存后即可访问。
5. **等待 Actions 运行**：首次部署后，可以手动触发一次 Actions 工作流，生成 JSON 文件。之后每小时自动更新。

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

## 📄 许可证

本项目采用 MIT 许可证，详情请参见 [LICENSE](LICENSE) 文件（如无许可证文件可忽略）。

## 🙏 致谢

- 感谢 [FCL-Team](https://github.com/FCL-Team) 和 [MobileGL-Dev](https://github.com/MobileGL-Dev) 开发的优秀项目。
- 感谢 [aaaapai](https://github.com/aaaapai) 提供的 JRE 构建。
- 感谢各镜像服务商提供的免费加速服务。
