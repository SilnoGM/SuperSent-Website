<!-- sparkle-sign-warning:
IMPORTANT: This file was signed by Sparkle. Any modifications to this file requires updating signatures in appcasts that reference this file! This will involve re-running generate_appcast or sign_update.
-->
# SuperSent v1.1.0

v1.1.0 在现有分类与条目之间增加了可选分组层级，适合在同一业务分类中继续按用途整理内容。
例如“焚烧炉”分类可以拆分为“安装、教程、效果展示、参数信息”等分组。

数据库与导入资源继续保存在用户的 `Application Support/SuperSent` 目录。
安装更新只替换应用程序本身，不会删除现有分类、条目或受管资源。

## 分类内分组

- 分类侧栏支持展开和收起分组，并显示各分组的条目数量；
- 有未分组条目时，会自动展示“未分组”入口；
- 支持新建、重命名、上移、下移和删除空分组；
- 非空分组不会被直接删除，应用会提示先移动或删除其中条目。

## 条目归属

- 条目编辑器新增“所属分组”选择；
- 分组选项只展示当前分类下的分组；
- 切换分类时自动清理失效的分组归属；
- 从分组节点新建条目时，会自动继承对应分类和分组。

## 数据安全

- 新增 SQLite v3 迁移，历史条目完整保留并默认处于未分组状态；
- 保存时会校验分类和分组是否匹配，避免跨分类错误归属；
- 删除分类时保留具体条目，并在同一事务中清空分类与分组归属；
- 迁移或删除操作失败时完整回滚，不保留部分修改。

## 搜索体验

- 搜索结果预览会展示“分类 / 分组”路径；
- 分组名称仅用于说明条目位置，不改变既有搜索命中、评分和排序；
- Enter 发送、Option+Enter 仅复制、Esc 关闭等键盘操作保持不变。

## 系统要求

- macOS 13 或更高版本；
- Apple Silicon Mac。

## 下载与安装

1. 下载 `SuperSent-1.1.0.dmg`；
2. 打开 DMG，将 SuperSent 拖入“应用程序”文件夹；
3. 启动 SuperSent。现有数据库和资源文件会继续保留。

下载地址：[SuperSent-1.1.0.dmg](https://github.com/SilnoGM/SuperSent-Releases/releases/download/v1.1.0/SuperSent-1.1.0.dmg)
