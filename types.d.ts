// 0: 免费或无版权
// 1: VIP 歌曲
// 4: 购买专辑
// 8: 非会员可免费播放低音质，会员可播放高音质及下载
// 1 或 8 的歌曲均可单独购买 2 元单曲
type fee = 0 | 1 | 4 | 8;

interface IHomePage {
  code: number;
  data: HomePage[];
  message: string;
}

interface HomePage {
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

interface IMvDetail {
  loadingPic: string;
  bufferPic: string;
  loadingPicFS: string;
  bufferPicFS: string;
  subed: boolean;
  mp: Mp;
  data: IMvDetailData;
  code: number;
}

interface IMvDetailData {
  id: number;
  name: string;
  artistId: number;
  artistName: string;
  briefDesc: string;
  desc: null;
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

interface IMvDetailArtist extends MVArtist {
  img1v1Url: string;
  followed: boolean;
}

interface Br {
  size: number;
  br: number;
  point: number;
}

interface VideoGroup {
  id: number;
  name: string;
  type: number;
}

interface Mp {
  id: number;
  fee: Fee;
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

interface IPersonalizedMv {
  code: number;
  category: number;
  result: PersonalizeMvResult[];
}

interface PersonalizeMvResult {
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

interface IMvURL {
  code: number;
  data: MvURL;
}

interface MvURL {
  id: number;
  url: string;
  r: number;
  size: number;
  md5: string;
  code: number;
  expi: number;
  fee: Fee;
  mvFee: number;
  st: number;
  promotionVo: null;
  msg: string;
}

interface IMvFirst {
  data: MvFirst[];
  code: number;
}

interface MvFirst {
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

interface MVArtist {
  id: number;
  name: string;
}

interface IVersion {
  code: number;
  data: {
    version: number;
  };
}

interface IVipInfo {
  message: string;
  data: VipInfo;
  code: number;
}

interface VipInfo {
  redVipLevelIcon: string;
  redVipLevel: number;
  redVipAnnualCount: number;
  musicPackage: Associator;
  associator: Associator;
  redVipDynamicIconUrl: null;
  redVipDynamicIconUrl2: null;
  redplus: Associator;
}

interface Associator {
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

interface ICookieAnonymous {
  code: number;
  userId: number;
  createTime: number;
  cookie: string;
}

interface IStarPick {
  code: number;
  data: StarPick;
  message: string;
}

interface StarPick {
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

interface Block {
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

interface Creative {
  creativeType: any;
  creativeId: string;
  actionType: any;
  uiElement: ResourceUIElement;
  resources: Resource[];
  alg: string;
  position: number;
  algReason: any;
}

interface Resource {
  uiElement: ResourceUIElement;
  resourceType: Type;
  resourceState: null;
  resourceId: string;
  resourceUrl: null;
  resourceExtInfo: ResourceEXTInfo;
  action: null;
  actionType: Type;
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

interface ResourceEXTInfo {
  users: StarPickUser[];
  songData: SongData;
  hasListened: boolean;
  threadId: string;
}

interface Quality {
  br: number;
  fid: number;
  size: number;
  vd: number;
  sr: number;
}

interface SongDetail {
  ar: Ar[];
  name: string;
  id: number;
  fee: Fee;
  dt: number; // 歌曲播放时长
  sq: Quality; // 无损质量文件信息;
  h: Quality; // 高质量文件信息;
  m: Quality; // 中质量文件信息;
  l: Quality; // 低质量文件信息;
  pop: number; // 小数，常取[0.0, 100.0]中离散的几个数值, 表示歌曲热度
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

interface SongData {
  name: string;
  id: number;
  position: number;
  alias: any[];
  status: number;
  fee: Fee;
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

interface Album {
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

interface Music {
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

enum Extension {
  FLAC = 'flac',
  Mp3 = 'mp3',
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

interface StarPickUser {
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

interface ResourceUIElement {
  mainTitle: MainTitle;
  rcmdShowType: RcmdShowType;
}

interface MainTitle {
  serialNum: string;
  title: string;
  canShowTitleLogo: boolean;
  titleDesc: string;
}

enum RcmdShowType {
  Default = 'DEFAULT',
}

interface CrossPlatformConfig {
  containerType: string;
  rnContent: RnContent;
}

interface RnContent {
  engineId: string;
  moduleName: string;
  component: string;
  params: {};
  estimatedRatio: string;
  estimatedHeight: number;
}

interface BlockUIElement {
  subTitle: SubTitle;
  rcmdShowType: RcmdShowType;
}

interface SubTitle {
  title: string;
  canShowTitleLogo: boolean;
}

interface GuideToast {
  hasGuideToast: boolean;
  toastList: any[];
}

interface PageConfig {
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

interface ILevel {
  full: boolean;
  data: LevelInfo;
  code: number;
}

interface LevelInfo {
  userId: number;
  info: string;
  progress: number;
  nextPlayCount: number;
  nextLoginCount: number;
  nowPlayCount: number;
  nowLoginCount: number;
  level: number;
}

interface IUserAccount {
  code: number;
  profile: Profile;
  account: Account;
}

interface IUserDetail {
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

interface Profile {
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

interface AuthType {
  type: number;
  desc: string;
  tags: string[] | null;
}

interface AvatarDetail {
  userType: null;
  identityLevel: number;
  identityIconUrl: string;
}

interface Experts {}

interface PrivacyItemUnlimit {
  area: boolean;
  college: boolean;
  gender: boolean;
  age: boolean;
  villageAge: boolean;
}

interface UserPoint {
  userId: number;
  balance: number;
  updateTime: number;
  version: number;
  status: number;
  blockBalance: number;
}

interface IArtistDetail {
  code: number;
  message: string;
  data: ArtistDetailData;
}

interface ArtistDetailData {
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

interface Artist {
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

interface Rank {
  rank: number;
  type: number;
}

interface Identify {
  imageUrl: string;
  imageDesc: string;
  actionUrl: string;
}

interface SecondaryExpertIdentiy {
  expertIdentiyId: number;
  expertIdentiyName: string;
  expertIdentiyCount: number;
}

interface User {
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

interface AvatarDetail {
  userType: number;
  identityLevel: number;
  identityIconUrl: string;
}

type Id = number | string;

interface ISimiSong {
  songs: Song[];
  code: number;
}

// song comment
interface ISongComment {
  isMusician: boolean;
  cnum: number;
  userId: number;
  topComments: any[];
  moreHot: boolean;
  hotComments: HotComment[];
  commentBanner: null;
  code: number;
  comments: SongComment[];
  total: number;
  more: boolean;
}

interface SongComment {
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

interface BeReplied {
  user: User;
  beRepliedCommentId: number;
  content: string;
  richContent: null | string;
  status: number;
  expressionUrl: null;
  ipLocation: IPLocation;
}

interface IPLocation {
  ip: null;
  location: string;
  userId: number | null;
}

interface User {
  locationInfo: null;
  liveInfo: null;
  anonym: number;
  commonIdentity: null;
  userType: number;
  avatarDetail: AvatarDetail | null;
  avatarUrl: string;
  followed: boolean;
  mutual: boolean;
  remarkName: null;
  socialUserId: null;
  vipRights: VipRights | null;
  nickname: string;
  authStatus: number;
  expertTags: string[] | null;
  experts: { [key: string]: string } | null;
  vipType: number;
  userId: number;
  target: null;
}

interface AvatarDetail {
  userType: number;
  identityLevel: number;
  identityIconUrl: string;
}

interface VipRights {
  associator: Associator | null;
  musicPackage: Associator | null;
  redplus: Associator | null;
  redVipAnnualCount: number;
  redVipLevel: number;
}

interface Associator {
  vipCode: number;
  rights: boolean;
  iconUrl: string;
}

interface PendantData {
  id: number;
  imageUrl: string;
}

interface HotComment {
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

interface HotCommentDecoration {
  bubbleId?: number;
}

interface IAlbumDetail {
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

interface Info {
  commentThread: CommentThread;
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
interface CheckSong {
  success: string;
  message: string;
  code: number;
}

interface Params {
  slug: string;
}
interface PlaylistSong {
  songs: SongDetail[];
  privileges: Privilege[];
  code: number;
}

interface ChargeInfoList {
  rate: number;
  chargeUrl: null;
  chargeMessage: null;
  chargeType: number;
}

// qrcode
interface CheckQrcode {
  code: number;
  message: string;
  // 800 为二维码过期.
  // 801 为等待扫码.
  // 802 为待确认.
  // 803 为授权登录成功(803 状态码下会返回 cookies), 如扫码后返回502, 则需加上noCookie参数, 如 & noCookie=true
  cookie: string;
}

interface ILoginStatus {
  data: LoginStatus;
}

interface LoginStatus {
  code: number;
  account: Account;
  profile: null;
}

interface Account {
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
interface IQRCodeData {
  code: number;
  data: QRCodeData;
}

interface QRCodeData {
  qrurl: string;
  qrimg: string;
}

interface IQRCode {
  data: QRCode;
  code: number;
}

interface QRCode {
  code: number;
  unikey: string;
}

// song detail
interface ISongDetail {
  songs: SongDetail[];
  privileges: Privilege[];
  code: number;
  message?: string;
}

interface ChargeInfoList {
  rate: number;
  chargeUrl: null;
  chargeMessage: null;
  chargeType: number;
}

interface FreeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  listenType: null;
}

// 歌手列表
interface Ar {
  id: number;
  name: string;
  tns: any[];
  alias: any[]; // 别名列表，第一个别名会被显示作副标题
}

interface DailySong extends SongDetail {
  reason: string;
  recommendReason: null | string;
}

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

interface ChargeInfoList {
  rate: number;
  chargeUrl: null;
  chargeMessage: null;
  chargeType: number;
}

interface FreeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  listenType: number;
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
interface IHotDetail {
  code: number;
  data: HotDetail[];
  message: string;
}

interface ISearchDefault {
  code: number;
  message: null;
  data: SearchDefault;
}

interface SearchDefault {
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

interface StyleKeyword {
  keyWord: string;
  descWord: null;
}

interface HotDetail {
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
interface ILyric {
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

interface IMusicURL {
  code: number;
  data: MusicURL[];
}

interface MusicURL {
  id: number;
  url: string;
  level: Level;
  size: number;
  type: string;
  code: number;
  size: number;
  time: number;
}

// search
interface ISearch {
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
  fee: Fee;
  rUrl: null;
  mark: number;
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

interface Privilege {
  id: number;
  fee: Fee;
  payed: number; // 账户是否付费
  st: number;
  pl: number;
  dl: number;
  sp: number;
  cp: number; // 判断用户能否播放歌曲(如果有vip, 就会显示1, 否则显示0, 受账号状态影响)
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
