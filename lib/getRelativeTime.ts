import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale'; // 引入中文本地化

{
  /* hydration error??? 相对时间, 不是仅仅在服务端渲染吗 */
  // date-fns have async
}

// new Date(comment.time)
//   .toISOString()
//   .replace('T', ' ')
//   .split('.')[0]
export default function getRelativeTime(timestamp: number) {
  const relativeTime = formatDistanceToNow(new Date(timestamp), {
    addSuffix: true, //大约...
    locale: zhCN,
  });
  return relativeTime;
}
