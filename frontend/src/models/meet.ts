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
