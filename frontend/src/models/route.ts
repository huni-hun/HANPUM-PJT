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
