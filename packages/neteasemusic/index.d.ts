declare interface IArtistMV {
  mvs: ArtistMV[];
  time: number;
  hasMore: boolean;
  code: number;
}

declare interface ArtistMV {
  id: number;
  name: string;
  status: number;
  artistName: string;
  imgurl: string;
  imgurl16v9: string;
  artist: MVArtist;
  duration: number;
  playCount: number;
  publishTime: Date;
  subed: boolean;
}

declare interface MVArtist {
  img1v1Id: number;
  topicPerson: number;
  picId: number;
  trans: string;
  musicSize: number;
  albumSize: number;
  briefDesc: string;
  picUrl: string;
  img1v1Url: string;
  alias: any[];
  name: string;
  id: number;
  img1v1Id_str: string;
}

declare interface IPlaylistPersonalized {
  hasTaste: boolean;
  code: number;
  category: number;
  result: PlaylistPersonalized[];
}

declare interface PlaylistPersonalized {
  id: number;
  type: number;
  name: string;
  copywriter: string;
  picUrl: string;
  canDislike: boolean;
  trackNumberUpdateTime: number;
  playCount: number;
  trackCount: number;
  highQuality: boolean;
  alg: string;
}

// 0: 免费或无版权
// 1: VIP 歌曲
// 4: 购买专辑
// 8: 非会员可免费播放低音质，会员可播放高音质及下载
// 1 或 8 的歌曲均可单独购买 2 元单曲
type fee = 0 | 1 | 4 | 8;

declare interface IHomePage {
  code: number;
  data: HomePage[];
  message: string;
}

declare interface HomePage {
  id: number;
  name: string;
  iconUrl: string;
  url: string;
  skinSupport: boolean;
  homepageMode: string;
  resourceState: null;
}

type SearchTypes =
  | 1
  | 10
  | 100
  | 1000
  | 1002
  | 1004
  | 1006
  | 1009
  | 1014
  | 1018;
// | 2000

declare interface IMvDetail {
  loadingPic: string;
  bufferPic: string;
  loadingPicFS: string;
  bufferPicFS: string;
  subed: boolean;
  mp: Mp;
  data: IMvDetailData;
  code: number;
}

declare interface IMvDetailData {
  id: number;
  name: string;
  artistId: number;
  artistName: string;
  briefDesc: string | null;
  desc: string | null;
  cover: string;
  coverId_str: string;
  coverId: number;
  playCount: number;
  subCount: number;
  shareCount: number;
  commentCount: number;
  duration: number;
  nType: number;
  publishTime: Date;
  price: null;
  brs: Br[];
  artists: Artist[];
  commentThreadId: string;
  videoGroup: VideoGroup[];
}

declare interface IMvDetailArtist extends MVArtist {
  img1v1Url: string;
  followed: boolean;
}

declare interface Br {
  size: number;
  br: number;
  point: number;
}

declare interface VideoGroup {
  id: number;
  name: string;
  type: number;
}

declare interface Mp {
  id: number;
  fee: any;
  mvFee: number;
  payed: number;
  pl: number;
  dl: number;
  cp: number;
  sid: number;
  st: number;
  normal: boolean;
  unauthorized: boolean;
  msg: null;
}

declare interface IPersonalizedMv {
  code: number;
  category: number;
  result: PersonalizeMvResult[];
}

declare interface PersonalizeMvResult {
  id: number;
  type: number;
  name: string;
  copywriter: string;
  picUrl: string;
  canDislike: boolean;
  trackNumberUpdateTime: null;
  duration: number;
  playCount: number;
  subed: boolean;
  artists: MVArtist[];
  artistName: string;
  artistId: number;
  alg: string;
}

declare interface IMvURL {
  code: number;
  data: MvURL;
}

declare interface MvURL {
  id: number;
  url: string;
  r: number;
  size: number;
  md5: string;
  code: number;
  expi: number;
  fee: any;
  mvFee: number;
  st: number;
  promotionVo: null;
  msg: string;
}

declare interface IMvFirst {
  data: MvFirst[];
  code: number;
}

declare interface MvFirst {
  id: number;
  cover: string;
  name: string;
  playCount: number;
  briefDesc: null;
  desc: null;
  artistName: string;
  artistId: number;
  duration: number;
  mark: number;
  subed: boolean;
  artists: MVArtist[];
  transNames?: string[];
  alias?: string[];
}

declare interface MVArtist {
  id: number;
  name: string;
}

declare interface IVersion {
  code: number;
  data: {
    version: number;
  };
}

declare interface IVipInfo {
  message: string;
  data: VipInfo;
  code: number;
}

declare interface VipInfo {
  redVipLevelIcon: string;
  redVipLevel: number;
  redVipAnnualCount: number;
  musicPackage: Associator;
  associator: Associator;
  redVipDynamicIconUrl: null;
  redVipDynamicIconUrl2: null;
  redplus: Associator;
}

declare interface Associator {
  vipCode: number;
  expireTime: number;
  iconUrl: string;
  dynamicIconUrl: string;
  vipLevel: number;
  isSignDeduct: boolean;
  isSignIap: boolean;
  isSignIapDeduct: boolean;
  isSign: boolean;
}

declare interface ICookieAnonymous {
  code: number;
  userId: number;
  createTime: number;
  cookie: string;
}

declare interface IStarPick {
  code: number;
  data: StarPick;
  message: string;
}

declare interface StarPick {
  cursor: null;
  blocks: Block[];
  hasMore: boolean;
  blockUUIDs: null;
  pageConfig: PageConfig;
  guideToast: GuideToast;
  internalTest: null;
  titles: any[];
  blockCodeOrderList: null;
  exposedResource: string;
  demote: boolean;
}

declare interface Block {
  blockCode: string;
  showType: string;
  dislikeShowType: number;
  uiElement: BlockUIElement;
  creatives: Creative[];
  canClose: boolean;
  crossPlatformConfig: CrossPlatformConfig;
  blockStyle: number;
  canFeedback: boolean;
  blockDemote: boolean;
  sort: number;
}

declare interface Creative {
  creativeType: any;
  creativeId: string;
  actionType: any;
  uiElement: ResourceUIElement;
  resources: Resource[];
  alg: string;
  position: number;
  algReason: any;
}

declare interface Resource {
  uiElement: ResourceUIElement;
  resourceType: any;
  resourceState: null;
  resourceId: string;
  resourceUrl: null;
  resourceExtInfo: ResourceEXTInfo;
  action: null;
  actionType: any;
  valid: boolean;
  alg: string;
  logInfo: null;
  ctrp: null;
  likedCount: number;
  replyCount: number;
  resourceContentList: null;
  position: null;
  playParams: null;
}

declare interface ResourceEXTInfo {
  users: StarPickUser[];
  songData: SongData;
  hasListened: boolean;
  threadId: string;
}

declare interface Quality {
  br: number;
  fid: number;
  size: number;
  vd: number;
  sr: number;
}

declare interface SongDetail {
  ar: Ar[];
  name: string;
  id: number;
  fee: any;
  dt: number; // 歌曲播放时长
  sq: Quality; // 无损质量文件信息;
  h: Quality; // 高质量文件信息;
  m: Quality; // 中质量文件信息;
  l: Quality; // 低质量文件信息;
  pop: number; // 小数，常取 [0.0, 100.0] 中离散的几个数值，表示歌曲热度
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
  publishTime: number;
}

declare interface SongData {
  name: string;
  id: number;
  position: number;
  alias: any[];
  status: number;
  fee: any;
  copyrightId: number;
  disc: string;
  no: number;
  artists: Artist[];
  album: Album;
  starred: boolean;
  popularity: number;
  score: number;
  starredNum: number;
  duration: number;
  playedNum: number;
  dayPlays: number;
  hearTime: number;
  sqMusic: Music | null;
  hrMusic: Music | null;
  ringtone: null | string;
  crbt: null;
  audition: null;
  copyFrom: string;
  commentThreadId: string;
  rtUrl: null;
  ftype: number;
  rtUrls: any[];
  copyright: number;
  transName: null | string;
  sign: null;
  mark: number;
  originCoverType: number;
  originSongSimpleData: OriginSongSimpleData | null;
  single: number;
  noCopyrightRcmd: null;
  mvid: number;
  rtype: number;
  rurl: null;
  hMusic: Music;
  mMusic: Music;
  lMusic: Music | null;
  bMusic: Music | null;
  mp3Url: null;
  transNames?: string[];
}

declare interface Album {
  name: string;
  id: number;
  type: any;
  size: number;
  picId: number;
  blurPicUrl: string;
  companyId: number;
  pic: number;
  picUrl: string;
  publishTime: number;
  description: string;
  tags: string;
  company: null | string;
  briefDesc: string;
  artist: Artist;
  songs: any[];
  alias: any[];
  status: number;
  copyrightId: number;
  commentThreadId: string;
  artists: Artist[];
  subType: any;
  transName: null;
  onSale: boolean;
  mark: number;
  gapless: number;
  picId_str?: string;
}

declare interface Music {
  name: null;
  id: number;
  size: number;
  extension: Extension;
  sr: number;
  dfsId: number;
  bitrate: number;
  playTime: number;
  volumeDelta: number;
}

declare enum Extension {
  FLAC = 'flac',
  Mp3 = 'mp3',
}

declare interface OriginSongSimpleData {
  songId: number;
  name: string;
  artists: AlbumMeta[];
  albumMeta: AlbumMeta;
}

declare interface AlbumMeta {
  id: number;
  name: string;
}

declare interface StarPickUser {
  defaultAvatar: boolean;
  province: number;
  authStatus: number;
  followed: boolean;
  avatarUrl: null;
  accountStatus: number;
  gender: number;
  city: number;
  birthday: number;
  userId: number;
  userType: number;
  nickname: string;
  signature: null;
  description: null;
  detailDescription: null;
  avatarImgId: number;
  backgroundImgId: number;
  backgroundUrl: null;
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
  avatarImgIdStr: string;
  anchor: boolean;
}

declare interface ResourceUIElement {
  mainTitle: MainTitle;
  rcmdShowType: RcmdShowType;
}

declare interface MainTitle {
  serialNum: string;
  title: string;
  canShowTitleLogo: boolean;
  titleDesc: string;
}

declare enum RcmdShowType {
  Default = 'DEFAULT',
}

declare interface CrossPlatformConfig {
  containerType: string;
  rnContent: RnContent;
}

declare interface RnContent {
  engineId: string;
  moduleName: string;
  component: string;
  params: {};
  estimatedRatio: string;
  estimatedHeight: number;
}

declare interface BlockUIElement {
  subTitle: SubTitle;
  rcmdShowType: RcmdShowType;
}

declare interface SubTitle {
  title: string;
  canShowTitleLogo: boolean;
}

declare interface GuideToast {
  hasGuideToast: boolean;
  toastList: any[];
}

declare interface PageConfig {
  refreshToast: string;
  nodataToast: string;
  refreshInterval: number;
  title: null;
  fullscreen: boolean;
  abtest: string[];
  songLabelMarkPriority: string[];
  songLabelMarkLimit: number;
  homepageMode: string;
  showModeEntry: boolean;
  orderInfo: null;
}

declare interface ILevel {
  full: boolean;
  data: LevelInfo;
  code: number;
}

declare interface LevelInfo {
  userId: number;
  info: string;
  progress: number;
  nextPlayCount: number;
  nextLoginCount: number;
  nowPlayCount: number;
  nowLoginCount: number;
  level: number;
}

declare interface IUserAccount {
  code: number;
  profile: Profile;
  account: Account;
}

declare interface IUserDetail {
  identify: Identify;
  level: number;
  listenSongs: number;
  userPoint: UserPoint;
  mobileSign: boolean;
  pcSign: boolean;
  profile: Profile;
  peopleCanSeeMyPlayRecord: boolean;
  bindings: any[];
  adValid: boolean;
  code: number;
  newUser: boolean;
  recallUser: boolean;
  createTime: number;
  createDays: number;
}

declare interface Profile {
  privacyItemUnlimit: PrivacyItemUnlimit;
  avatarDetail: AvatarDetail;
  createTime: number;
  avatarImgIdStr: string;
  backgroundImgIdStr: string;
  accountStatus: number;
  vipType: number;
  userType: number;
  birthday: number;
  avatarUrl: string;
  gender: number;
  nickname: string;
  avatarImgId: number;
  mutual: boolean;
  followed: boolean;
  remarkName: null;
  authStatus: number;
  detailDescription: string;
  experts: Experts;
  expertTags: null;
  djStatus: number;
  province: number;
  city: number;
  defaultAvatar: boolean;
  backgroundImgId: number;
  backgroundUrl: string;
  description: string;
  userId: number;
  signature: string;
  authority: number;
  allAuthTypes: AuthType[];
  followeds: number;
  follows: number;
  blacklist: boolean;
  artistId: number;
  eventCount: number;
  allSubscribedCount: number;
  playlistBeSubscribedCount: number;
  mainAuthType: AuthType;
  followTime: null;
  followMe: boolean;
  artistIdentity: number[];
  cCount: number;
  inBlacklist: boolean;
  sDJPCount: number;
  artistName: string;
  playlistCount: number;
  sCount: number;
  newFollows: number;
}

declare interface AuthType {
  type: number;
  desc: string;
  tags: string[] | null;
}

declare interface AvatarDetail {
  userType: null;
  identityLevel: number;
  identityIconUrl: string;
}

declare interface Experts {}

declare interface PrivacyItemUnlimit {
  area: boolean;
  college: boolean;
  gender: boolean;
  age: boolean;
  villageAge: boolean;
}

declare interface UserPoint {
  userId: number;
  balance: number;
  updateTime: number;
  version: number;
  status: number;
  blockBalance: number;
}

declare interface IArtistDetail {
  code: number;
  message: string;
  data: ArtistDetailData;
}

declare interface ArtistDetailData {
  videoCount: number;
  vipRights: null;
  identify: Identify;
  artist: Artist;
  blacklist: boolean;
  preferShow: number;
  showPriMsg: boolean;
  secondaryExpertIdentiy: SecondaryExpertIdentiy[];
  eventCount: number;
  user: User;
}

declare interface Artist {
  id: number;
  cover: string;
  avatar: string;
  name: string;
  transNames: string[];
  alias: string[];
  identities: string[];
  identifyTag: string[];
  briefDesc: string;
  rank: Rank;
  albumSize: number;
  musicSize: number;
  mvSize: number;
}

declare interface Rank {
  rank: number;
  type: number;
}

declare interface Identify {
  imageUrl: string;
  imageDesc: string;
  actionUrl: string;
}

declare interface SecondaryExpertIdentiy {
  expertIdentiyId: number;
  expertIdentiyName: string;
  expertIdentiyCount: number;
}

declare interface User {
  backgroundUrl: string;
  birthday: number;
  detailDescription: string;
  authenticated: boolean;
  gender: number;
  city: number;
  signature: string;
  description: string;
  remarkName: null;
  shortUserName: string;
  accountStatus: number;
  locationStatus: number;
  avatarImgId: number;
  defaultAvatar: boolean;
  province: number;
  nickname: string;
  expertTags: null;
  djStatus: number;
  avatarUrl: string;
  accountType: number;
  authStatus: number;
  vipType: number;
  userName: string;
  followed: boolean;
  userId: number;
  lastLoginIP: string;
  lastLoginTime: number;
  authenticationTypes: number;
  mutual: boolean;
  createTime: number;
  anchor: boolean;
  authority: number;
  backgroundImgId: number;
  userType: number;
  experts: null;
  avatarDetail: AvatarDetail;
}

type Id = number | string;

declare interface ISimiSong {
  songs: Song[];
  code: number;
}

// song comment
declare interface ISongComment {
  isMusician: boolean; // 似乎没什么用
  cnum: number;
  userId: number;
  topComments: any[];
  moreHot: boolean;
  hotComments: HotComment[];
  commentBanner: null;
  code: number;
  message?: string;
  comments: SongComment[];
  total: number;
  more: boolean;
}

declare interface SongComment {
  user: User;
  beReplied: BeReplied[];
  pendantData: PendantData | null;
  showFloorComment: null;
  status: number;
  commentId: number;
  content: string;
  richContent: null | string;
  contentResource: null;
  time: number;
  timeStr: string;
  needDisplayTime: boolean;
  likedCount: number;
  expressionUrl: null;
  commentLocationType: number;
  parentCommentId: number;
  decoration: any;
  repliedMark: null;
  grade: null;
  userBizLevels: null;
  ipLocation: IPLocation;
  owner: boolean;
  liked: boolean;
}

declare interface BeReplied {
  user: User;
  beRepliedCommentId: number;
  content: string;
  richContent: null | string;
  status: number;
  expressionUrl: null;
  ipLocation: IPLocation;
}

declare interface IPLocation {
  ip: null;
  location: string;
  userId: number | null;
}

declare interface atarDetail {
  userType: number;
  identityLevel: number;
  identityIconUrl: string;
}

declare interface VipRights {
  associator: Associator | null;
  musicPackage: Associator | null;
  redplus: Associator | null;
  redVipAnnualCount: number;
  redVipLevel: number;
}

declare interface Associator {
  vipCode: number;
  rights: boolean;
  iconUrl: string;
}

declare interface PendantData {
  id: number;
  imageUrl: string;
}

declare interface HotComment {
  user: User;
  beReplied: any[];
  pendantData: PendantData | null;
  showFloorComment: null;
  status: number;
  commentId: number;
  content: string;
  richContent: null | string;
  contentResource: null;
  time: number;
  timeStr: string;
  needDisplayTime: boolean;
  likedCount: number;
  expressionUrl: null;
  commentLocationType: number;
  parentCommentId: number;
  decoration: HotCommentDecoration;
  repliedMark: null;
  grade: null;
  userBizLevels: null;
  ipLocation: IPLocation;
  owner: boolean;
  liked: boolean;
}

declare interface HotCommentDecoration {
  bubbleId?: number;
}

declare interface IAlbumDetail {
  resourceState: boolean;
  songs: Song[];
  code: number;
  album: {
    songs: any[];
    paid: boolean;
    onSale: boolean;
    mark: number;
    awardTags: null;
    blurPicUrl: string;
    companyId: number;
    briefDesc: null;
    publishTime: number;
    company: string;
    pic: number;
    picUrl: string;
    copyrightId: number;
    alias: any[];
    artists: Artist[];
    picId: number;
    artist: Artist;
    commentThreadId: string;
    tags: string;
    description: string;
    status: number;
    subType: string;
    name: string;
    id: number;
    type: string;
    size: number;
    picId_str: string;
    info: Info;
  };
}

declare interface Info {
  commentThread: any;
  latestLikedUsers: null;
  liked: boolean;
  comments: null;
  resourceType: number;
  resourceId: number;
  commentCount: number;
  likedCount: number;
  shareCount: number;
  threadId: string;
}
declare interface CheckSong {
  success: string;
  message: string;
  code: number;
}

declare interface Params {
  slug: string;
}
declare interface SearchParams {
  id: string;
}

declare interface PlaylistSong {
  songs: SongDetail[];
  privileges: Privilege[];
  code: number;
}

declare interface ChargeInfoList {
  rate: number;
  chargeUrl: null;
  chargeMessage: null;
  chargeType: number;
}

// qrcode
declare interface CheckQrcode {
  code: number;
  message: string;
  // 800 为二维码过期。
  // 801 为等待扫码。
  // 802 为待确认。
  // 803 为授权登录成功 (803 状态码下会返回 cookies), 如扫码后返回 502, 则需加上 noCookie 参数，如 & noCookie=true
  cookie: string;
}

declare interface ILoginStatus {
  data: LoginStatus;
}

declare interface LoginStatus {
  code: number;
  account: Account;
  profile: null;
}

declare interface Account {
  id: number;
  userName: string;
  type: number;
  status: number;
  whitelistAuthority: number;
  createTime: number;
  tokenVersion: number;
  ban: number;
  baoyueVersion: number;
  donateVersion: number;
  vipType: number;
  anonimousUser: boolean;
  paidFee: boolean;
}

// login
declare interface IQRCodeData {
  code: number;
  data: QRCodeData;
}

declare interface QRCodeData {
  qrurl: string;
  qrimg: string;
}

declare interface IQRCode {
  data: QRCode;
  code: number;
}

declare interface QRCode {
  code: number;
  unikey: string;
}

// song detail
declare interface ISongDetail {
  songs: SongDetail[];
  privileges: Privilege[];
  code: number;
  message?: string;
}

declare interface ChargeInfoList {
  rate: number;
  chargeUrl: null;
  chargeMessage: null;
  chargeType: number;
}

declare interface FreeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  listenType: null;
}

// 歌手列表
declare interface Ar {
  id: number;
  name: string;
  tns: any[];
  alias: any[]; // 别名列表，第一个别名会被显示作副标题
}

declare interface DailySong extends SongDetail {
  reason: string;
  recommendReason: null | string;
}

// recommend songs
declare interface IRecommendSongs {
  code: number;
  data: RecommendSongsData;
}

declare interface RecommendSongsData {
  dailySongs: DailySong[];
  orderSongs: any[];
  recommendReasons: RecommendReason[];
  mvResourceInfos: null;
}

declare enum Alg {
  DailyAuditionRecentArtist = 'daily_audition_recentArtist',
  DailyAuditionRtLike = 'daily_audition_rt_like',
  ItembasedOn = 'itembased_on',
  OnMind34 = 'on_mind3_4',
}

declare interface Ar {
  id: number;
  name: string;
  tns: any[];
  alias: any[];
}

declare interface L {
  br: number;
  fid: number;
  size: number;
  vd: number;
  sr: number;
}

declare interface OriginSongSimpleData {
  songId: number;
  name: string;
  artists: AlbumMeta[];
  albumMeta: AlbumMeta;
}

declare interface AlbumMeta {
  id: number;
  name: string;
}

declare interface ChargeInfoList {
  rate: number;
  chargeUrl: null;
  chargeMessage: null;
  chargeType: number;
}

declare interface VideoInfo {
  moreThanOne: boolean;
  video: Video | null;
}

declare interface Video {
  vid: string;
  type: number;
  title: string;
  playTime: number;
  coverUrl: string;
  publishTime: number;
  artists: null;
}

declare interface RecommendReason {
  songId: number;
  reason: string;
  reasonId: string;
  targetUrl: null;
}

// top playlist
declare interface IPlaylist {
  playlists: Playlist[];
  total: number;
  code: number;
  more: boolean;
  cat: string;
}

declare interface Playlist {
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
  tracks: Tracks[];
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

declare interface Tracks {
  name: string;
  id: number;
  pst: number;
  t: number;
  ar: Ar[];
  alia: any[];
  pop: number;
  st: number;
  rt: null | string;
  fee: number;
  v: number;
  crbt: null;
  cf: string;
  al: any;
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
  originSongSimpleData: null;
  tagPicList: null;
  resourceState: boolean;
  version: number;
  songJumpInfo: null;
  entertainmentTags: null;
  awardTags: null;
  single: number;
  noCopyrightRcmd: null;
  mst: number;
  cp: number;
  mv: number;
  rtype: number;
  rurl: null;
  publishTime: number;
}

declare interface Creator {
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

// banner
declare interface IBanner {
  banners: Banner[];
  code: number;
}

declare interface Banner {
  imageUrl: string;
  targetId: number;
  adid: null;
  targetType: number;
  titleColor: string;
  typeTitle: string;
  url: null | string;
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
declare interface IHotDetail {
  code: number;
  data: HotDetail[];
  message: string;
}

declare interface ISearchDefault {
  code: number;
  message: null;
  data: SearchDefault;
}

declare interface SearchDefault {
  showKeyword: string;
  styleKeyword: StyleKeyword;
  realkeyword: string;
  searchType: number;
  action: number;
  alg: string;
  gap: number;
  source: null;
  bizQueryInfo: string;
  logInfo: null;
  imageUrl: null;
  trp_type: null;
  trp_id: null;
}

declare interface StyleKeyword {
  keyWord: string;
  descWord: null;
}

declare interface HotDetail {
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
declare interface ILyric {
  transUser: TransUser;
  lrc: Lrc;
}
declare interface TransUser {
  id: number;
  status: number;
  demand: number;
  userid: number;
  nickname: string;
  uptime: number;
}

declare interface Lrc {
  lyric: string;
  version: number;
}

// music url

declare interface IMusicURL {
  code: number;
  data: MusicURL[];
}

declare interface MusicURL {
  id: number;
  url: string;
  level: Level;
  type: string;
  code: number;
  size: number;
  time: number;
}

// search
declare interface ISearch {
  result: Result;
  code: number;
  message?: string;
}

declare interface Result {
  songs: Song[];
  hasMore: boolean;
  songCount: number;
}

declare interface Song {
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
  fee: any;
  rUrl: null;
  mark: number;
}

// search hot
declare interface SearchTop {
  code: number;
  more: boolean;
  songs: Song[];
}

declare interface TopSong {
  name: string;
  id: number;
  no: number;
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
  publishTime: number;
  videoInfo: VideoInfo;
  privilege: Privilege;
}

declare interface Privilege {
  id: number;
  fee: any;
  payed: number; // 账户是否付费
  st: number;
  pl: number;
  dl: number;
  sp: number;
  cp: number; // 判断用户能否播放歌曲 (如果有 vip, 就会显示 1, 否则显示 0, 受账号状态影响)
  subp: number;
  cs: boolean;
  maxbr: number;
  fl: number;
  toast: boolean;
  flag: number;
  preSell: boolean;
  playMaxbr: number;
  downloadMaxbr: number;
  rscl: null;
  freeTrialPrivilege: FreeTrialPrivilege;
  chargeInfoList: ChargeInfoList[];
}

declare interface ChargeInfoList {
  rate: number;
  chargeUrl: null;
  chargeMessage: null;
  chargeType: number;
}

// playlist details
declare interface IPlayListDetails {
  code: number;
  relatedVideos: any;
  playlist: Playlist;
  urls: null;
  privileges: Privilege[];
  sharedPrivilege: null;
  resEntrance: null;
  fromUsers: null;
  fromUserCount: number;
  songFromUsers: null;
}

declare interface TrackID {
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

declare interface Track {
  name: string;
  id: number;
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
  publishTime: number;
  videoInfo: VideoInfo;
}

declare interface NoCopyrightRcmd {
  type: number;
  typeDesc: string;
  songId: null | string;
  thirdPartySong: null;
  expInfo: null;
}

declare interface OriginSongSimpleData {
  songId: number;
  name: string;
  artists: AlbumMeta[];
  albumMeta: AlbumMeta;
}

declare interface AlbumMeta {
  id: number;
  name: string;
}

declare interface VideoInfo {
  moreThanOne: boolean;
  video: Video | null;
}

declare interface Video {
  vid: string;
  type: number;
  title: string;
  playTime: number;
  coverUrl: string;
  publishTime: number;
  artists: null;
  alias: null;
}

declare interface IVideosAll {
  datas: any;
  msg: string;
  hasmore: boolean;
  rcmdLimit: number;
  code: number;
}

declare interface VideosAll {
  type: number;
  displayed: boolean;
  alg: string;
  extAlg: null;
  data: VideosAllData;
}

declare interface VideosAllData {
  alg: string;
  scm: string;
  threadId: string;
  coverUrl: string;
  height: number;
  width: number;
  title: string;
  description: null | string;
  commentCount: number;
  shareCount: number;
  resolutions: Resolution[];
  creator: Creator;
  urlInfo: null;
  videoGroup: VideoGroup[];
  previewUrl: null | string;
  previewDurationms: number;
  hasRelatedGameAd: boolean;
  markTypes: number[] | null;
  relateSong: RelateSong[];
  relatedInfo: null;
  videoUserLiveInfo: null;
  vid: string;
  durationms: number;
  playTime: number;
  praisedCount: number;
  praised: boolean;
  subscribed: boolean;
}

declare interface RelateSong {
  name: string;
  id: number;
  pst: number;
  t: number;
  ar: Ar[];
  alia: string[];
  pop: number;
  st: number;
  rt: null;
  fee: number;
  v: number;
  crbt: null;
  cf: string;
  al: any;
  dt: number;
  h: H;
  m: H;
  l: H;
  a: null;
  cd: string;
  no: number;
  rtUrl: null;
  ftype: number;
  rtUrls: any[];
  djId: number;
  copyright: number;
  s_id: number;
  mst: number;
  cp: number;
  mv: number;
  rtype: number;
  rurl: null;
  publishTime: number;
  privilege: Privilege;
}

declare interface H {
  br: number;
  fid: number;
  size: number;
  vd: number;
}

declare interface Resolution {
  resolution: number;
  size: number;
}

declare interface VideoGroup {
  id: number;
  name: string;
  alg: null;
}

declare interface MultiMatchSearch {
  result: Result;
  code: number;
}

declare interface Result {
  new_mlog: NewMlog[];
  playlist: Playlist[];
  artist: ResultArtist[];
  album: Album[];
  orders: string[];
}

declare interface AlbumArtist {
  name: string;
  id: number;
  picId: number;
  img1v1Id: number;
  briefDesc: string;
  picUrl: string;
  img1v1Url: string;
  albumSize: number;
  alias: string[];
  trans: string;
  musicSize: number;
  topicPerson: number;
  picId_str?: string;
  img1v1Id_str: string;
}

declare interface ResultArtist {
  name: string;
  id: number;
  picId: number;
  img1v1Id: number;
  briefDesc: string;
  picUrl: string;
  img1v1Url: string;
  albumSize: number;
  alias: any[];
  trans: string;
  musicSize: number;
  picId_str: string;
  img1v1Id_str: string;
  transNames: string[];
  mvSize: number;
  alg: string;
  fansSize: number;
  videoSize: number;
  officialTags: any[];
  searchCircle: null;
  occupation: string;
}

declare interface NewMlog {
  resourceId: string;
  resourceType: string;
  internalType: null;
  resourceName: string;
  baseInfo: BaseInfo;
  alg: string;
}

declare interface BaseInfo {
  id: string;
  type: number;
  mlogBaseDataType: number;
  position: null;
  resource: MultiSearchResource;
  alg: null;
  reason: null;
  matchField: number;
  matchFieldContent: null;
  sameCity: boolean;
}

declare interface MultiSearchResource {
  mlogBaseData: MlogBaseData;
  mlogExtVO: MlogEXTVO;
  userProfile: UserProfile;
  status: number;
  shareUrl: string;
}

declare interface MlogBaseData {
  id: string;
  type: number;
  text: string;
  interveneText: string;
  pubTime: number;
  coverUrl: string;
  coverHeight: number;
  coverWidth: number;
  coverColor: number;
  coverPicKey: string;
  coverDynamicUrl: null;
  audio: null;
  threadId: string;
  duration: number;
}

declare interface MlogEXTVO {
  likedCount: number;
  commentCount: number;
  playCount: number;
  song: Song;
  canCollect: boolean;
  artistName: null;
  rcmdInfo: null;
  strongPushMark: null;
  strongPushIcon: null;
  specialTag: null;
  channelTag: null;
  artists: any[];
}

declare interface MultiSearchSong {
  id: number;
  name: string;
  coverUrl: string;
  duration: number;
  artists: SongArtist[];
  privilege: null;
  albumName: string;
  startTime: null;
  endTime: null;
}

declare interface SongArtist {
  artistId: number;
  artistName: string;
}

declare interface UserProfile {
  userId: number;
  nickname: string;
  avatarUrl: string;
  followed: boolean;
  userType: number;
  isAnchor: boolean;
}
