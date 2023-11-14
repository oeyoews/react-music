// music url

interface MusicURL {
  code: number;
  data: Data[];
}

interface Data {
  id: number;
  url: string;
  size: number;
}

// search
interface Search {
  result: Result;
  code: number;
}

interface Result {
  songs: Song[];
  hasMore: boolean;
  songCount: number;
}

interface Song {
  id: number;
  name: string;
  artists: Artist[];
  album: Album;
  duration: number;
  copyrightId: number;
  status: number;
  alias: string[];
  rtype: number;
  ftype: number;
  mvid: number;
  fee: number;
  rUrl: null;
  mark: number;
}

interface Album {
  id: number;
  name: string;
  artist: Artist;
  publishTime: number;
  size: number;
  copyrightId: number;
  status: number;
  picId: number;
  mark: number;
  transNames?: string[];
  alia?: string[];
}

interface Artist {
  id: number;
  name: string;
  picUrl: null;
  alias: any[];
  albumSize: number;
  picId: number;
  fansGroup: null;
  img1v1Url: string;
  img1v1: number;
  trans: null;
}

// search hot
interface SearchTop {
  code: number;
  more: boolean;
  songs: Song[];
}

interface TopSong {
  name: string;
  id: number;
  pst: number;
  t: number;
  ar: Ar[];
  alia: any[];
  pop: number;
  st: number;
  rt: string;
  fee: number;
  v: number;
  crbt: null;
  cf: string;
  al: Al;
  dt: number;
  h: L | null;
  m: L | null;
  l: L;
  sq: L | null;
  hr: null;
  a: null;
  cd: string;
  no: number;
  rtUrl: null;
  ftype: number;
  rtUrls: any[];
  djId: number;
  copyright: number;
  s_id: number;
  mark: number;
  originCoverType: number;
  originSongSimpleData: null;
  tagPicList: null;
  resourceState: boolean;
  version: number;
  songJumpInfo: null;
  entertainmentTags: null;
  awardTags: null;
  single: number;
  noCopyrightRcmd: null;
  rtype: number;
  rurl: null;
  mst: number;
  cp: number;
  mv: number;
  publishTime: number;
  videoInfo: VideoInfo;
  privilege: Privilege;
}

interface Privilege {
  id: number;
  fee: number;
  payed: number;
  st: number;
  pl: number;
  dl: number;
  sp: number;
  cp: number;
  subp: number;
  cs: boolean;
  maxbr: number;
  fl: number;
  toast: boolean;
  flag: number;
  preSell: boolean;
  playMaxbr: number;
  downloadMaxbr: number;
  maxBrLevel: MaxBrLevel;
  playMaxBrLevel: MaxBrLevel;
  downloadMaxBrLevel: MaxBrLevel;
  plLevel: LLevel;
  dlLevel: LLevel;
  flLevel: LLevel;
  rscl: null;
  freeTrialPrivilege: FreeTrialPrivilege;
  chargeInfoList: ChargeInfoList[];
}

interface ChargeInfoList {
  rate: number;
  chargeUrl: null;
  chargeMessage: null;
  chargeType: number;
}

enum LLevel {
  Exhigh = 'exhigh',
  Higher = 'higher',
  None = 'none',
  Standard = 'standard',
}

enum MaxBrLevel {
  Higher = 'higher',
  Lossless = 'lossless',
  Sky = 'sky',
  Standard = 'standard',
}

interface FreeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  listenType: null;
}

interface VideoInfo {
  moreThanOne: boolean;
  video: null;
}

// playlist details
interface PlayListDetails {
  code: number;
  relatedVideos: RelatedVideos;
  playlist: Playlist;
  urls: null;
  privileges: Privilege[];
  sharedPrivilege: null;
  resEntrance: null;
  fromUsers: null;
  fromUserCount: number;
  songFromUsers: null;
}

interface Playlist {
  id: number;
  name: string;
  coverImgId: number;
  coverImgUrl: string;
  coverImgId_str: string;
  adType: number;
  userId: number;
  createTime: number;
  status: number;
  opRecommend: boolean;
  highQuality: boolean;
  newImported: boolean;
  updateTime: number;
  trackCount: number;
  specialType: number;
  privacy: number;
  trackUpdateTime: number;
  commentThreadId: string;
  playCount: number;
  trackNumberUpdateTime: number;
  subscribedCount: number;
  cloudTrackCount: number;
  ordered: boolean;
  description: string;
  tags: string[];
  updateFrequency: null;
  backgroundCoverId: number;
  backgroundCoverUrl: null;
  titleImage: number;
  titleImageUrl: null;
  englishTitle: null;
  officialPlaylistType: null;
  copied: boolean;
  relateResType: null;
  subscribers: Creator[];
  subscribed: boolean;
  creator: Creator;
  tracks: Track[];
  videoIds: null;
  videos: null;
  trackIds: TrackID[];
  bannedTrackIds: null;
  mvResourceInfos: null;
  shareCount: number;
  commentCount: number;
  remixVideo: null;
  sharedUsers: null;
  historySharedUsers: null;
  gradeStatus: string;
  score: null;
  algTags: null;
  trialMode: number;
}

interface Creator {
  defaultAvatar: boolean;
  province: number;
  authStatus: number;
  followed: boolean;
  avatarUrl: string;
  accountStatus: number;
  gender: number;
  city: number;
  birthday: number;
  userId: number;
  userType: number;
  nickname: string;
  signature: string;
  description: string;
  detailDescription: string;
  avatarImgId: number;
  backgroundImgId: number;
  backgroundUrl: string;
  authority: number;
  mutual: boolean;
  expertTags: null;
  experts: null;
  djStatus: number;
  vipType: number;
  remarkName: null;
  authenticationTypes: number;
  avatarDetail: null;
  backgroundImgIdStr: string;
  anchor: boolean;
  avatarImgIdStr: string;
  avatarImgId_str: string;
}

interface TrackID {
  id: number;
  v: number;
  t: number;
  at: number;
  alg: null;
  uid: number;
  rcmdReason: string;
  sc: null;
  f: null;
  sr: null;
}

interface Track {
  name: string;
  id: number;
  pst: number;
  t: number;
  ar: Ar[];
  alia: string[];
  pop: number;
  st: number;
  rt: null | string;
  fee: number;
  v: number;
  crbt: null;
  cf: string;
  al: Al;
  dt: number;
  h: H | null;
  m: H | null;
  l: H | null;
  sq: H | null;
  hr: H | null;
  a: null;
  cd: string;
  no: number;
  rtUrl: null;
  ftype: number;
  rtUrls: any[];
  djId: number;
  copyright: number;
  s_id: number;
  mark: number;
  originCoverType: number;
  originSongSimpleData: OriginSongSimpleData | null;
  tagPicList: null;
  resourceState: boolean;
  version: number;
  songJumpInfo: null;
  entertainmentTags: null;
  awardTags: null;
  single: number;
  noCopyrightRcmd: NoCopyrightRcmd | null;
  rtype: number;
  rurl: null;
  mst: number;
  cp: number;
  mv: number;
  publishTime: number;
  videoInfo: VideoInfo;
  tns?: string[];
}

interface NoCopyrightRcmd {
  type: number;
  typeDesc: string;
  songId: null | string;
  thirdPartySong: null;
  expInfo: null;
}

interface OriginSongSimpleData {
  songId: number;
  name: string;
  artists: AlbumMeta[];
  albumMeta: AlbumMeta;
}

interface AlbumMeta {
  id: number;
  name: string;
}

interface VideoInfo {
  moreThanOne: boolean;
  video: Video | null;
}

interface Video {
  vid: string;
  type: number;
  title: string;
  playTime: number;
  coverUrl: string;
  publishTime: number;
  artists: null;
  alias: null;
}

interface ChargeInfoList {
  rate: number;
  chargeUrl: null;
  chargeMessage: null;
  chargeType: number;
}

enum Level {
  Exhigh = 'exhigh',
  Higher = 'higher',
  Hires = 'hires',
  Jyeffect = 'jyeffect',
  Lossless = 'lossless',
  None = 'none',
  Sky = 'sky',
  Standard = 'standard',
}

interface FreeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  listenType: number;
  cannotListenReason: number;
}
