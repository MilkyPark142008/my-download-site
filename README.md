# MC 启动器下载站

[![自动更新下载数据](https://github.com/MilkyPark142008/my-download-site/actions/workflows/update-data.yml/badge.svg)](https://github.com/MilkyPark142008/my-download-site/actions/workflows/update-data.yml)
[![部署平台](https://img.shields.io/badge/部署-Cloudflare%20Pages-blue)](https://pages.cloudflare.com/)
[![许可证](https://img.shields.io/badge/许可证-MIT-green)](LICENSE)

> 一个面向 Minecraft 启动器与相关组件的静态下载站。  
> 网站会自动同步 GitHub Release 稳定版与 GitHub Actions 开发版构建产物，并提供镜像加速、更新日志展示与历史构建记录。

访问地址：[https://fcl-dl.pages.dev/](https://fcl-dl.pages.dev/)

## 项目说明

本项目是一个纯静态网页下载站，主要用于集中展示和下载以下项目的安装包或构建产物：

- FCL 启动器
- ZalithLauncher2
- Angel Aura Amethyst
- MobileGlues 图形库

站点数据由 GitHub Actions 自动拉取并写入 JSON 文件，前端页面直接读取这些 JSON 文件渲染下载卡片、更新日志和历史构建记录。

## 主要功能

- **多项目集中展示**：在一个页面中展示多个 Minecraft 启动器与相关组件。
- **稳定版与开发版切换**：支持 Release 稳定版和 Action 开发版两种下载渠道。
- **自动更新数据**：通过 GitHub Actions 定时同步上游 Release 与 Actions 构建产物。
- **开发版历史记录**：Action 开发版支持展示最近构建历史，方便回退或选择指定版本。
- **中文更新日志展示**：面向用户展示的更新日志、构建说明等内容尽量使用中文表达。
- **镜像加速下载**：内置多个 GitHub 下载镜像源，可按需切换。
- **响应式布局**：适配手机、平板和桌面浏览器。
- **无需后端服务**：可直接部署到 Cloudflare Pages、GitHub Pages 或其他静态托管平台。

## 支持项目

| 项目 | 稳定版 Release | 开发版 Action | 历史记录 | 说明 |
| --- | --- | --- | --- | --- |
| [FCL 启动器](https://github.com/FCL-Team/FoldCraftLauncher) | 支持 | 支持 | 支持 | FoldCraftLauncher 安卓启动器 |
| [ZalithLauncher2](https://github.com/ZalithLauncher/ZalithLauncher2) | 支持 | 支持 | 支持 | ZalithLauncher 第二代启动器 |
| [Angel Aura Amethyst](https://github.com/AngelAuraMC/Amethyst-Android) | 支持 | 支持 | 支持 | Amethyst 安卓项目 |
| [MobileGlues 图形库](https://github.com/MobileGL-Dev/MobileGlues-release) | 支持 | 暂不支持 | 暂不支持 | 图形库组件下载 |

## 数据文件说明

| 文件 | 用途 |
| --- | --- |
| `FCL/fcl-all-releases.json` | FCL Release 稳定版数据 |
| `FCL/fcl-action.json` | FCL 最新 Action 开发版数据 |
| `FCL/fcl-action-history.json` | FCL 开发版历史构建记录 |
| `zalith.json` | ZalithLauncher2 稳定版与最新开发版数据 |
| `zalith-action-history.json` | ZalithLauncher2 开发版历史构建记录 |
| `amethyst.json` | Angel Aura Amethyst 稳定版与最新开发版数据 |
| `amethyst-action-history.json` | Angel Aura Amethyst 开发版历史构建记录 |
| `mobileglues.json` | MobileGlues Release 数据 |
| `commit-info.json` | 本仓库最近提交信息 |

## 目录结构

```text
.
├── .github/
│   └── workflows/
│       └── update-data.yml              # 自动更新数据的工作流
├── Amethyst/                            # Amethyst 相关数据目录
├── FCL/
│   ├── fcl-changelog-history.json       # FCL 更新日志历史
│   └── fcl-action-history.json          # FCL 开发版历史构建记录
├── index.html                           # 网站主页面，包含样式与前端逻辑
├── fcl.json                             # FCL 下载数据
├── zalith.json                          # ZalithLauncher2 下载数据
├── zalith-action-history.json           # ZalithLauncher2 开发版历史构建记录
├── amethyst.json                        # Amethyst 下载数据
├── amethyst-action-history.json         # Amethyst 开发版历史构建记录
├── mobileglues.json                     # MobileGlues 下载数据
├── commit-info.json                     # 仓库提交信息
├── LICENSE                              # 开源许可证
└── README.md                            # 项目说明文档
```

## 自动更新机制

本仓库通过 `.github/workflows/update-data.yml` 自动更新数据。

触发方式包括：

- 推送到 `main` 分支时自动运行；
- 定时运行；
- 在 GitHub Actions 页面手动运行。

工作流会执行以下任务：

1. 拉取上游项目的 Release 数据；
2. 拉取上游项目的 GitHub Actions 构建产物；
3. 整理稳定版、开发版与历史构建记录；
4. 生成或更新对应 JSON 文件；
5. 将更新后的数据提交回仓库。

## 部署方法

### 1. 复制仓库

将本仓库 Fork 到自己的 GitHub 账号下。

### 2. 开启 GitHub Actions 写入权限

进入仓库设置：

```text
Settings → Actions → General → Workflow permissions
```

选择：

```text
Read and write permissions
```

并允许 GitHub Actions 创建和批准提交。

### 3. 部署到 Cloudflare Pages

在 Cloudflare Pages 中新建项目：

1. 选择“连接到 Git”；
2. 选择本仓库；
3. 构建命令留空；
4. 输出目录填写 `/`；
5. 保存并部署。

部署完成后，静态网站即可访问。

## 本地预览

在仓库根目录运行：

```bash
python3 -m http.server 8000
```

然后访问：

```text
http://localhost:8000
```

如果需要测试数据展示，请确保根目录下存在对应的 JSON 数据文件。

## 常见修改

### 修改下载镜像

编辑 `index.html`，查找镜像选择相关代码，按需增删镜像源。

### 调整自动更新频率

编辑 `.github/workflows/update-data.yml` 中的 `cron` 表达式。

例如改为每 6 小时运行一次：

```yaml
- cron: '0 */6 * * *'
```

### 添加新的下载项目

通常需要同时修改：

1. `.github/workflows/update-data.yml`：添加数据拉取与 JSON 生成逻辑；
2. `index.html`：添加页面模块、下载卡片渲染逻辑和数据加载逻辑；
3. 必要时新增对应的 JSON 数据文件。

## 维护约定

- 面向用户展示的更新日志使用中文。
- 自动生成的数据文件应保持 JSON 格式有效。
- 修改工作流后，应手动运行一次 GitHub Actions 验证结果。
- 推送包含 `.github/workflows/` 的修改时，令牌需要具备工作流写入权限。

## 许可证

本项目使用 MIT 许可证，详见 [LICENSE](LICENSE)。