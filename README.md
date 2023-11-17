![](banner.png)

[preview page](https://nextjs-netease-music.vercel.app/)

> 目前使用了25+个接口, 已支持登录 (共有200+ 接口)

## TODO

- [ ] 添加游客登录
- [ ] 将api, 和项目一起部署, 就可以自动传cookie
- [x] 301 https://github.com/Binaryify/NeteaseCloudMusicApi/issues/961
- [ ] 评论分页
- [ ] space shortcuts https://github.com/imsyy/SPlayer/blob/9fa59359290558347ba86f03da699738e7398e44/src/App.vue#L201
- [ ] 支持歌单播放
- [x] cookie login
- [x] 如何支持 ts(music api) 返回值类型还是要自己写(baseurl 如何传进去没看懂, 只有接口的参数, axios 似乎没保留出来)
- [ ] download url not available
- [ ] recent song
- [ ] qrcode use svg(or use canvas)

<!-- https://github.com/imsyy/SPlayer/blob/dev/src/api/home.js -->

```
Error: ENOENT: no such file or directory, scandir 'D:\Workspace\react-music\.next\server\vendor-chunks\module'
```

- mp3 cache
<!-- - 跨域问题() -->
