/** react-aplayer d.ts */
declare module 'react-aplayer' {
  interface AplayerAudio {
    name: string;
    artist: string;
    url: string;
    cover: string;
    lrc: string;
    theme: string;
  }

  interface AplayerProps {
    storageName: string;
    audio: Partial<AplayerAudio>[];
    theme: string;
    lrcType: number;
    onInit: (instance) => void;
    onPlay: () => void;
    onPause: () => void;
    order: 'random' | 'list';
    loop: 'all' | 'one' | 'none';
    mini: boolean;
    fixed: boolean;
    autoplay: boolean;
    preload: string | 'auto';
    volume: number;
    mutex: boolean;
    listFolded: boolean;
  }

  interface AplayerMethods {
    play: () => void;
    pause: Function;
    seek: Function;
    toggle: () => void;
    destroy: Function;
    on: (event, handler) => void;
    theme: (theme, themeType) => void;
    skipForward: () => void;
    audio: {
      currentTime: number;
      duration: number;
      paused: boolean;
    };
    list: {
      show: any;
      hide: any;
      toggle: any;
      add: {
        audios: [] | {};
      };
      // audios: { id: string; name: string; url: string }[];
    };
  }
  export default class ReactAplayer extends React.Component<
    Partial<AplayerProps>
  > {}
}
