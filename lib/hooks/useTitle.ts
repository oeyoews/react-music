export default function useTitle() {
  const defaultTitle = document?.title;

  const setVanillaTitle = () => {
    document.title = defaultTitle;
  };

  const setTitle = (title: string) => {
    document.title = title;
  };

  return { setVanillaTitle, setTitle };
}
