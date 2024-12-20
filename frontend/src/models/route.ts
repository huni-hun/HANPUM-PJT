/** 첫번째 피드같이 생긴 유형 props추가 */
export interface FeedProps {
  routeData: {
    routeFeedImg?: string;
    routeUserImg?: string;
    routeName?: string;
    routeContent?: string;
    routeScore?: number;
    routeComment?: string;
    routeTypes?: string[];
    meetTypes?: string[];
    readerName?: string;
    /** badge */
    startDate?: string;
    endDate?: string;

    /** 모임 props */
    memberCount?: number;
    totalMember?: number;
    likeCount?: number;
    meetDday?: number;
  } | null;
  /** feed에 userImg + userName이 있을 때 */
  isUserContainer?: boolean;

  /** 모임 tab*/
  meetRouter?: boolean;
  meetDday?: number;
  memberCount?: number;
  totalMember?: number;
  likeCount?: number;
  startDate?: string;
  endDate?: string;
  /** 스타일 */
  isMeetFeed?: string;
}

export interface FeedInfoProps {
  router?: string;
  /** n일차 진행상황 */
  proceessDay?: number;
  feedInfoTitle?: string;
  startPoint?: string;
  endPoint?: string;
  startDate?: string;
  endDate?: string;
  totalDuration?: number;
  totalDistance: number;
  dayData: { dayNum: number }[];
  percentage?: number;
  rate?: number;
  /** style */
  isMeetFeed?: string;
  /** 오늘 일정 */
  currentWayPoint?: string;
  nextWayPoint?: string;
  currentVisitCount?: number;
  todayTotalVisitCount?: number;
  todayTotalDistance?: number;
}

export interface RouteListProps {
  routeName: string;
  routeContent: string;
  routeScore: number;
  routeComment: number;
  routeId: number;
  img: string;
  writeState: boolean;
  openState: boolean;
  memberId: number;
  writeDate: string;
  start: string;
  end: string;
  totalDistance: number;
  totalDays: number;
  interestFlag: boolean;
}

export interface UserRouteProps {
  courseName: string;
  content: string;
  scoreAvg: number;
  commentCnt: number;
  courseId: number;
  backgroundImg: string;
  writeState: boolean;
  openState: boolean;
  memberId: number;
  writeDate: string;
  startPoint: string;
  endPoint: string;
  totalDistance: number;
  totalDays: number;
  interestFlag: boolean;
}

export interface RouteDetailProps {
  routeName: string;
  routeContent: string;
  writeDate: string;
  routeScore: number;
  routeComment: number;
  start: string;
  end: string;
  img: string;
  writeState: boolean;
  openState: boolean;
}

export interface RouteDetailDayProps {
  dayNum: number;
  totalDistance: string;
  totalDuration: string;
  totalCalorie: string;
}

export interface DaysOfRouteProps {
  routeName: string;
  routeAddress: string;
  routeId: number;
  routeType: string;
  routePoint: string;
  latitude: number;
  longitude: number;
  state?: number;

  /** 스케줄 경유지 처리 */
  turnGreen?: boolean;
}

export interface AttractionsProps {
  attractionId: number;
  name: string;
  type: string;
  address: string;
  latitude: number;
  longitude: number;
  img: string;
}

export interface RouteReviewProps {
  memberId: number;
  routeId: number;
  content: string;
  score: number;
  writeDate: string;
  like: number;
  memberNickname: string;
  reviewId: number;
}

export interface searchPlaceProps {
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
  img?: string;
}
export interface AttractionsAddCardProps {
  keyword: string;
  name: string;
  img: string;
}

export interface WayPointReqDto {
  type: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  pointNumber: string;
  distance: string;
  duration: string;
  calorie: string;
  vertexes: number[];
}

export interface AttractionReqDto {
  address: string;
  lat: number;
  lon: number;
  name: string;
  image: string;
  type: string;
}

export interface CourseDayReqDto {
  dayNumber: number;
  wayPointReqDtoList: WayPointReqDto[];
  attractionReqDtoList: AttractionReqDto[];
}

export interface AddRouteProps {
  courseName: string;
  content: string;
  openState: boolean;
  writeState: boolean;
  courseTypeList: string[];
  multipartFile: Blob | string;
  courseDayReqDtoList: CourseDayReqDto[];
}

export interface RetouchRouteProps {
  courseId: number;
  courseName: string;
  content: string;
  openState: boolean;
  writeState: boolean;
  courseTypeList: string[];
  multipartFile: Blob | string;
  courseDayReqDtoList: CourseDayReqDto[];
}

export interface MapLinePathProps {
  name: string;
  x: number;
  y: number;
}

export interface LineStartEndProps {
  x: number;
  y: number;
}

export interface MakerDataProps {
  x: number;
  y: number;
  distance: string;
  calorie: string;
  duration: string;
  name: string;
}
