
#本仓库由DeepSeek全程编写 本人没有参与编写


# MC启动器下载站

[![GitHub Actions](https://github.com/MilkyPark142008/my-download-site/actions/workflows/update-data.yml/badge.svg)](https://github.com/MilkyPark142008/my-download-site/actions/workflows/update-data.yml)
[![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-blue)](https://pages.cloudflare.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

> 一个自动同步 GitHub Release 和 Actions 构建产物的 Minecraft 启动器下载站  
> 访问地址：[https://fcl-dl.pages.dev/](https://fcl-dl.pages.dev/)

## ✨ 特性

- **多项目支持** – FCL 启动器、ZalithLauncher2、Angel Aura Amethyst、MobileGlues 图形库
- **双版本渠道** – Release 稳定版 + Action 开发版，满足不同需求
- **全自动更新** – GitHub Actions 每小时自动拉取最新 Release 和 Actions 产物
- **文件名直显** – 下载卡片直接显示原始文件名，架构信息一目了然
- **镜像加速** – 内置 Ghfast、Gh-Proxy 镜像源，一键切换
- **Markdown 渲染** – Release 更新日志使用 GitHub 风格 Markdown 显示
- **Action 日志** – 开发版展示触发构建的 commit 信息
- **响应式设计** – 完美适配手机、平板、桌面

## 📦 支持的项目

| 项目 | Release | Action | 架构识别 |
|------|---------|--------|----------|
| [FCL 启动器](https://github.com/FCL-Team/FoldCraftLauncher) | ✅ | ✅ | 文件名识别 |
| [ZalithLauncher2](https://github.com/ZalithLauncher/ZalithLauncher2) | ✅ | ✅ | 文件名识别 |
| [Angel Aura Amethyst](https://github.com/AngelAuraMC/Amethyst-Android) | ✅ | ✅ | 文件名识别 |
| [MobileGlues 图形库](https://github.com/MobileGL-Dev/MobileGlues-release) | ✅ | ❌ | 文件名识别 |

> 注：架构信息直接从文件名提取（arm64、armv7、x86、x86_64、all 等），无需额外配置。

## 🚀 部署

### 前置要求

- GitHub 账号
- Cloudflare Pages 账号（或其他静态托管服务）

### 一键部署

1. **Fork 本仓库** 到你的 GitHub 账号

2. **配置 GitHub Actions 权限**  
   进入仓库 `Settings` → `Actions` → `General` → 勾选 `Read and write permissions`

3. **部署到 Cloudflare Pages**  
   - 登录 [Cloudflare Pages](https://pages.cloudflare.com/)
   - 点击 `连接到 Git` → 选择你 fork 的仓库
   - 构建命令留空，输出目录填 `/`
   - 点击 `保存并部署`

4. **（可选）绑定自定义域名**  
   在 Pages 项目设置中添加你的域名（例如 `fcl.page.dev`）

部署完成后，每小时自动更新的网站就上线了。

## ⚙️ 配置

### 添加新项目

编辑 `.github/workflows/update-data.yml`，参照现有步骤添加新项目的 Release 和 Action 拉取。然后在 `index.html` 中增加对应的模块（HTML + JavaScript）。

### 修改镜像源

编辑 `index.html`，找到 `<select id="mirrorSelect">`，增删或修改 `<option>`。

### 调整更新频率

修改 workflow 中的 `cron` 表达式，例如改为每 6 小时：
```yaml
- cron: '0 */6 * * *'
```

📁 文件结构

```
.
├── .github/workflows/update-data.yml   # 自动化脚本（每小时运行 + push 触发）
├── index.html                          # 前端页面（样式、逻辑、模块）
├── fcl.json                            # 自动生成，FCL 数据
├── zalith.json                         # 自动生成，Zalith 数据
├── amethyst.json                       # 自动生成，Amethyst 数据
├── mobileglues.json                    # 自动生成，MobileGlues 数据
└── commit-info.json                    # 自动生成，本仓库真实提交信息
```

📄 数据格式示例

fcl.json 结构：

```json
{
  "release": {
    "tag_name": "v1.4.3",
    "published_at": "2025-01-15T10:30:00Z",
    "body": "## 更新内容\n- 修复崩溃问题",
    "assets": [
      {
        "name": "FoldCraftLauncher-arm64-v8a.apk",
        "size": 52428800,
        "browser_download_url": "https://github.com/.../apk"
      }
    ]
  },
  "action": {
    "run": {
      "id": 123456789,
      "created_at": "2025-01-16T08:00:00Z",
      "head_commit": {
        "message": "feat: 添加新功能"
      }
    },
    "artifacts": [
      {
        "name": "FCL-debug.apk",
        "size_in_bytes": 52000000
      }
    ]
  }
}
```

🧪 本地开发

1. 克隆仓库
2. 启动本地 HTTP 服务器（例如 python -m http.server 8000）
3. 在根目录放置模拟的 JSON 文件用于测试
4. 访问 http://localhost:8000

📜 许可证

MIT
