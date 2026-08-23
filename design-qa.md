# 官网平台图标视觉验收

## 对比目标

- Source visual truth：
  - `/var/folders/mq/jghl7cqn6fl2mccy65d_8k8w0000gn/T/codex-clipboard-ef215e21-0980-4b6b-a317-e01d3d00f2c6.png`
  - `/var/folders/mq/jghl7cqn6fl2mccy65d_8k8w0000gn/T/codex-clipboard-674372bd-a32e-4166-9e09-3ddc5acb05da.png`
- Implementation screenshots：
  - `dist/qa-evidence/qa-hero-desktop-viewport.png`
  - `dist/qa-evidence/qa-download-desktop-viewport.png`
  - `dist/qa-evidence/qa-hero-icons-focused.png`
  - `dist/qa-evidence/qa-download-icons-focused.png`
  - `dist/qa-evidence/qa-hero-mobile-viewport.png`
  - `dist/qa-evidence/qa-download-mobile-viewport.png`
- State：深色主题；页面加载和入场动画稳定后；主页顶部与 `#download` 下载区。

## 视口与像素归一化

- 桌面端 CSS viewport：`1280 × 720`，`devicePixelRatio = 2`；浏览器截图为去除浏览器滚动条后的 `1265 × 712` CSS 像素画面。
- 移动端 CSS viewport：`390 × 844`，`devicePixelRatio = 1`；浏览器截图为可见内容区 `375 × 812`。
- 参考图下载区为 `2236 × 1286`，顶部按钮为 `1260 × 224`。对比时以相同深色主题和相同组件状态为准，不用截图外围留白推断组件尺寸。
- 参考图仍含旧版 Windows 多下载按钮；该差异不属于本次图标验收，当前产品真相源要求官网只显示 MSI。

## Full-view comparison evidence

- 桌面端顶部按钮中的 Apple 和 Windows 图标均完整加载，按钮高度保持 `46px`，原有文字基线和间距未发生可见漂移。
- 桌面端两张下载卡片继续保持同宽 `502px`、同高 `520px`；品牌图标替换后没有改变标题、标签或分隔线位置。
- 移动端页面无横向溢出；两个系统按钮同宽，下载卡片继续按单列排列。
- 浏览器控制台没有 `error` 或 `warning`。

## Focused region comparison evidence

- `qa-hero-icons-focused.png`：macOS 下载箭头已替换为 Apple 品牌图标；原手写 Windows 图形已替换为相同图标库的 Windows 品牌图标。
- `qa-download-icons-focused.png`：下载卡片的 `mac`、`win` 文字占位符已替换为 Apple、Windows 品牌图标，原有 `48px` 图标容器保持不变。
- 图标来自 Bootstrap Icons 品牌分类，并作为本地 SVG 资产分发；按钮内尺寸为 `18 × 18px`，卡片内尺寸为 `22 × 22px`。

## Required fidelity surfaces

- Fonts and typography：未修改字体、字号、字重、行高和字距；截图未发现文字换行或基线回归。
- Spacing and layout rhythm：按钮、卡片、标签、圆角和间距沿用现有设计令牌；桌面端与移动端均无挤压或溢出。
- Colors and visual tokens：继续使用现有深色背景和 `#eef2fb` 图标前景色，没有新增主题颜色。
- Image quality and asset fidelity：使用 Bootstrap Icons 的 Apple、Windows 矢量品牌资产，不使用文字字形、Emoji、CSS 绘图或手写内联 SVG；SVG 原始比例完整、无模糊和裁切。
- Copy and content：平台名称、快捷键、下载链接和按钮文案均未因本次图标替换而改变。

## Primary interactions

- “选择 macOS 版本”和“选择 Windows 版本”均可滚动到 `#download`，最终目标顶部距离为约 `100px`。
- 两次交互后 URL hash 均为 `#download`，控制台无错误或警告。

## Findings

- 无 P0、P1 或 P2 问题。
- 无需要阻断交付的 P3 问题。

## Comparison history

- 第一轮即通过视觉比较；未发现需要修复的 P0/P1/P2，因此无需二次设计迭代。

## Implementation checklist

- [x] 顶部 macOS 按钮使用 Apple 图标。
- [x] 顶部 Windows 按钮使用 Windows 图标。
- [x] macOS 与 Windows 下载卡片使用真实品牌图标。
- [x] 桌面端、移动端和浏览器控制台完成验证。
- [x] 下载入口和平台隔离契约保持不变。

final result: passed
