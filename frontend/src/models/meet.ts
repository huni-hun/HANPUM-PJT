export interface MeetFilterProps {
  onClick?: (location: string, row: number, col: number) => void;
}

export interface MeetModalProps {
  title?: string;
  content?: string;
  onClick?: () => void;
}

export interface MeetMemberListProps {
  memberInfo: { img: string; name: string }[];
  onClick?: (name: string) => void;
}

export interface MeetInfo {
  endDate: string;
  endPoint: string;
  groupId: number;
  groupImg: string;
  like: boolean;
  likeCount: number;
  startDate: string;
  startPoint: string;
  title: string;
  totalDadys: number;
  totalDistance: number;
  recruitedCount: number;
  recruitmentCount: number;
}
