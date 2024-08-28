/** 첫번째 피드같이 생긴 유형 props추가 */
export interface FeedProps {
  routeData: {
    routeFeedImg?: string;
    routeUserImg?: string;
    routeName?: string;
    routeContent?: string;
    routeScore?: number;
    routeComment?: string;
  } | null;
  isUserContainer?: boolean;
}

export interface FeedInfoProps {
  router?: string;
  feedInfoTitle?: string;
  departuresPlace?: string;
  arrivalsPlace?: string;
  startDate?: string;
  endDate?: string;
  currentDistance?: number;
  totalDistance: number;
  dayData: { dayNum: number }[];
  percentage?: number;
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
}

export interface RouteDetailProps {
  routeName: string;
  routeContent: string;
  writeDate: string;
  routeScore: number;
  routeComment: number;
  start: string;
  end: string;
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
}

export interface AttractionsProps {
  attractionId: number;
  name: string;
  type: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface RouteReviewProps {
  memberId: number;
  routeId: number;
  content: string;
  score: number;
  writeDate: string;
}

export interface searchPlaceProps {
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface WayPointListProps {
  type: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  point: number;
  distance: number;
  duration: number;
  calorie: number;
}

export interface AttractionsProps {
  type: string;
  address: string;
  latitude: number;
  longitude: number;
  name: string;
}

export interface DateRouteDetailProps {
  date: number;
  wayPointList: WayPointListProps[];
  attractionsList: AttractionsProps[];
}

export interface AddRouteProps {
  memberId: number;
  routeName: string;
  routeContent: string;
  openState: boolean;
  writeState: boolean;
  routeType: string[];
  dateOfRoute: DateRouteDetailProps[];
}
