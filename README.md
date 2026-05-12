# 清取 OCR

轻量、清亮、本地优先的全桌面 OCR 取字工具 MVP。它面向三个入口：全局框选屏幕区域、截图后继续识别、聊天或浏览器图片拖入/粘贴识别。

## 当前实现

- Tauri 2 + React + TypeScript + Vite 桌面应用骨架。
- 主浮层、框选取字 UI、截图后识别页、图片拖拽/粘贴入口、可选择文本结果窗、本地历史条、隐私状态。
- Rust 侧建立 `OcrAdapter` 抽象，保留 `mac_vision`、`windows_ocr`、`paddle_onnx`、`tesseract` 适配文件。
- 当前沙箱无法调用目标 OS OCR，默认使用可测试的 `mock_local_adapter`，不上传图片，不保存原图。

## 运行

```bash
npm install
npm run dev
```

浏览器开发预览默认运行在 Vite 端口 `1420`。桌面壳运行需要本机安装 Rust toolchain：

```bash
npm run tauri dev
```

## 测试与构建

```bash
npm test
npm run build
```

`npm run tauri build` 需要 Rust、平台 WebView 依赖和对应系统打包工具。

## 权限与目标平台限制

- macOS 目标：区域截图需要 Screen Recording 权限；未来真实 OCR 使用 Apple Vision，本地执行。
- Windows 目标：真实 OCR 使用 `Windows.Media.Ocr`，依赖系统 OCR 和语言资源；受保护窗口可能无法截图。
- 当前 MVP 不读取微信、浏览器或聊天应用私有数据，只处理用户复制、拖入或框选的图片。
- 默认不上传图片，不保存原图；历史只保存识别文本和时间。

## 开发结构

- 前端入口：`src/main.tsx`
- 主界面：`src/app/App.tsx`
- OCR 命令边界：`src/lib/tauriCommands.ts`
- Rust 命令：`src-tauri/src/commands.rs`
- OCR 抽象：`src-tauri/src/ocr/types.rs`
- 本地模拟适配器：`src-tauri/src/ocr/mock_adapter.rs`
