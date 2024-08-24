/** 내일정 - 날씨 컴포넌트 */
export interface Weather {
  weatherIcon?: string;
  message?: string;
}

/** 모임일정 - 모임멤버 */
export interface MeetMemberProps {
  memberCount?: number;
  memberImgs: string[];
  memberNames: string[];
}

export interface SchduleCardProps {
  backGroundImg?: string;
  scheduleTitle?: string[];
  departure?: string;
  arrival?: string;
}
