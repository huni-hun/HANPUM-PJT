/** 내일정 - 날씨 컴포넌트 */
export interface Weather {
  weatherIcon?: string;
  logcation?: string;
  message?: string;
}

/** 모임일정 - 모임멤버 */
export interface Member {
  memberImg: string;
  memberName: string;
}

export interface MeetMemberProps {
  memberCount: number;
  members: Member[];
}

export interface SchduleCardProps {
  backGroundImg: string;
  scheduleTitle: string;
  departure: string;
  arrival: string;
  startDate: string | undefined;
  endDate: string | undefined;
  tripDay?: string;
  dDay?: string;
  onClick?: () => void;
}
