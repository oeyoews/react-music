# AGENTS.md

网易云音乐网页客户端。Next.js App Router + 本地 `NeteaseCloudMusicApi`。仅供学习；上游 API 已停更，请求失败是常态，页面必须能在数据为 `null` 时渲染。

## 命令

包管理器用 pnpm。工作区在 `packages/*`。

```bash
pnpm install
pnpm api          # 本地音乐 API，默认 http://127.0.0.1:3001
pnpm dev          # Next.js，默认 http://localhost:3000
pnpm lint         # oxlint
pnpm lint:fix
pnpm format       # oxfmt
pnpm format:check
pnpm build
```

改 UI、路由、客户端状态或页面数据后，用浏览器把受影响的页面点一遍再结束。`pnpm build` 不能代替交互验证。

## 目录

- `app/`：路由。首页、`playlist/[slug]`、`album/[slug]`、`artist/[slug]`、`song`、`search`、`mv`、`mv/[slug]`、`login`、`starpick`。
- `components/`：UI。播放器在 `components/Player/`（Howler 的 `ReactMusicPlayer`、APlayer、ArtPlayer）。
- `lib/fetchData.ts`：唯一的音乐 API 客户端。新接口走这里，不要另写 `fetch`。
- `lib/api/`、`lib/homepage.ts`、`lib/search.ts`、`lib/mv.ts`、`lib/login.ts`：按资源拆的请求函数。服务端动作文件顶部加 `'use server'`。
- `lib/hooks/`：SWR 等客户端数据钩子。
- `lib/store/index.ts`：Zustand。对外用 `useMusicStore`（带 selector）。
- `packages/aplayer`、`packages/neteasemusic`：仅类型包（`aplayer-types`、`neteasemusic-types`），不要在里面写运行时代码。

路径别名 `~/*` 与 `@/*` 都指向仓库根。现有代码用 `~components`、`~lib`、`~app`，新代码保持这个写法。

## 音乐 API

- 前端基址：`NEXT_PUBLIC_MUSIC_API`，缺省 `http://127.0.0.1:3001`。
- API 进程端口：`MUSIC_API_PORT`，缺省 `3001`。
- 可选出口 IP：`NEXT_PUBLIC_REALIP`。`fetchData` 会自动补到 query，调用方不要重复拼。
- `customfetch({ url, params, options })` 的 `url` 是路径，例如 `/playlist/track/all`。失败、非 2xx、非法 URL 都返回 `null`，不抛异常。调用处用可选链和空数组兜底，例如 `data?.playlists ?? []`。
- 默认 `next.revalidate` 为 3600。首页也导出了 `export const revalidate = 3600`。不要为了“实时”去掉缓存，除非这个页面明确要求。
- 部分歌曲没有 cookie 会拿不到播放地址。登录态在 Zustand 的 `cookie`，匿名登录在 `components/Login/anonymous.tsx`。

`.env` 含本机配置，不要提交，不要把值写进代码或文档。

## 代码风格

- TypeScript，函数组件。客户端交互、播放器、SWR 必须加 `'use client'`。能放服务端的数据获取留在 Server Component。
- 样式：Tailwind CSS v4，入口是 `app/globals.css` 的 `@import 'tailwindcss'`。没有 `tailwind.config.ts`。插件用 `@plugin`。类名合并用 `cn`（`~lib/utils`）。
- 格式以 `.oxfmtrc.json` 为准：单引号、分号、无 trailing comma、2 空格、`printWidth` 80。提交前对改过的文件跑 `pnpm format`。Lint 用 oxlint（`.oxlintrc.json`），不要加回 ESLint 或 Prettier。
- 图标用 `react-icons`。提示用 `react-hot-toast`。动效用 `framer-motion`。
- `next/image` 已在 `next.config.mjs` 里 `unoptimized: true`，远程图主机是通配。防盗链靠根 layout 的 `referrer: 'no-referrer'`，不要改掉。

## 改动边界

- 播放器三套并存。新播放逻辑优先放在 `ReactMusicPlayer`（Howler）。不要为了“统一”删除 APlayer / ArtPlayer，除非明确要求。
- 不要升级或替换 `NeteaseCloudMusicApi` 的调用方式；`scripts/music-api.js` 只负责拉起本地服务。
- 生产构建会去掉 `console.log`，保留 `console.error`。调试日志可以留在服务端 fetch，不要在客户端刷屏。
- 不要改 `pnpm-lock.yaml` 以外的锁文件。新增依赖用 pnpm。
- 不要提交 `.next/`、`node_modules/`、`.env`。
