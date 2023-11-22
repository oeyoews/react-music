import { Drawer } from 'vaul';

// 监听点击事件, 对于搜索歌曲
// click to close params
export default function DrawserComponent({
  children,
  text,
}: {
  children: React.ReactNode;
  text: React.ReactNode;
}) {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <button className="bg-zinc-200 rounded px-2 py-1">{text}</button>
      </Drawer.Trigger>
      <Drawer.Portal>
        {/* NOTE: aplayer 的z-index 过高 */}
        <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999]" />
        {/* prose 不会继承 */}
        <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[80%] mt-24 fixed bottom-0 inset-x-0 z-[99999] prose max-w-none">
          <div className="p-4 bg-white rounded-t-[10px] flex-1 overflow-auto">
            <div className="mx-auto overflow-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
            <div className="mx-auto max-w-2xl">{children}</div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
