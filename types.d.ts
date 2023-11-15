// recommend songs
interface IRecommendSongs {
  code: number;
  data: RecommendSongsData;
}

interface RecommendSongsData {
  dailySongs: DailySong[];
  orderSongs: any[];
  recommendReasons: RecommendReason[];
  mvResourceInfos: null;
}

interface DailySong {
  name: string;
  id: number;
  pst: number;
  t: number;
  ar: Ar[];
  alia: string[];
  pop: number;
  st: number;
  rt: Rt | null;
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
  hr: L | null;
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
  single: number;
  noCopyrightRcmd: null;
  rtype: number;
  rurl: null;
  mst: number;
  cp: number;
  mv: number;
  publishTime: number;
  reason: null | string;
  videoInfo: VideoInfo;
  recommendReason: null | string;
  privilege: Privilege;
  alg: Alg;
  tns?: string[];
  s_ctrp?: string;
}

interface Al {
  id: number;
  name: string;
  picUrl: string;
  tns: string[];
  pic_str?: string;
  pic: number;
}

enum Alg {
  DailyAuditionRecentArtist = 'daily_audition_recentArtist',
  DailyAuditionRtLike = 'daily_audition_rt_like',
  ItembasedOn = 'itembased_on',
  OnMind34 = 'on_mind3_4',
}

interface Ar {
  id: number;
  name: string;
  tns: any[];
  alias: any[];
}

interface L {
  br: number;
  fid: number;
  size: number;
  vd: number;
  sr: number;
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
  dlLevel: DLLevel;
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

enum DLLevel {
  Hires = 'hires',
  None = 'none',
}

enum MaxBrLevel {
  Sky = 'sky',
}

enum LLevel {
  Exhigh = 'exhigh',
  None = 'none',
  Standard = 'standard',
}

interface FreeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  listenType: number;
}

enum Rt {
  Empty = '',
  The600902000008129682 = '600902000008129682',
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
}

interface RecommendReason {
  songId: number;
  reason: string;
  reasonId: string;
  targetUrl: null;
}

// top playlist
interface IPlaylist {
  playlists: Playlist[];
  total: number;
  code: number;
  more: boolean;
  cat: string;
}

interface Playlist {
  name: string;
  id: number;
  trackNumberUpdateTime: number;
  status: number;
  userId: number;
  createTime: number;
  updateTime: number;
  subscribedCount: number;
  trackCount: number;
  cloudTrackCount: number;
  coverImgUrl: string;
  iconImgUrl: null;
  coverImgId: number;
  description: string;
  tags: string[];
  playCount: number;
  trackUpdateTime: number;
  specialType: number;
  totalDuration: number;
  creator: Creator;
  tracks: null;
  subscribers: Creator[];
  subscribed: boolean;
  commentThreadId: string;
  newImported: boolean;
  adType: number;
  highQuality: boolean;
  privacy: number;
  ordered: boolean;
  anonimous: boolean;
  coverStatus: number;
  recommendInfo: null;
  socialPlaylistCover: null;
  recommendText: null;
  coverText: null;
  relateResType: null;
  relateResId: null;
  shareCount: number;
  coverImgId_str?: string;
  alg: string;
  commentCount: number;
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
  expertTags: string[] | null;
  experts: { [key: string]: string } | null;
  djStatus: number;
  vipType: number;
  remarkName: null;
  authenticationTypes: number;
  avatarDetail: AvatarDetail | null;
  avatarImgIdStr: string;
  backgroundImgIdStr: string;
  anchor: boolean;
}

interface AvatarDetail {
  userType: number;
  identityLevel: number;
  identityIconUrl: string;
}

// banner
interface IBanner {
  banners: Banner[];
  code: number;
}

interface Banner {
  imageUrl: string;
  targetId: number;
  adid: null;
  targetType: number;
  titleColor: string;
  typeTitle: string;
  url: null;
  exclusive: boolean;
  monitorImpress: null;
  monitorClick: null;
  monitorType: null;
  monitorImpressList: null;
  monitorClickList: null;
  monitorBlackList: null;
  extMonitor: null;
  extMonitorInfo: null;
  adSource: null;
  adLocation: null;
  adDispatchJson: null;
  encodeId: string;
  program: null;
  event: null;
  video: null;
  song: null;
  scm: string;
  bannerBizType: string;
}

// hot detail
interface IHotDetail {
  code: number;
  data: Datum[];
  message: string;
}

interface Datum {
  searchWord: string;
  score: number;
  content: string;
  source: number;
  iconType: number;
  iconUrl: null | string;
  url: string;
  // alg: Alg;
}

// level
type Level =
  | 'standard'
  | 'higher'
  | 'exhigh'
  | 'lossless'
  | 'hires'
  | 'sky'
  | 'jymaster';

// lyric
interface Lyric {
  transUser: TransUser;
  lrc: Lrc;
}
interface TransUser {
  id: number;
  status: number;
  demand: number;
  userid: number;
  nickname: string;
  uptime: number;
}

interface Lrc {
  lyric: string;
  version: number;
}

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
