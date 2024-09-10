// export interface MeetFilterProps {
//   onClick?: (location: string) => void;
//   canClick: React.Dispatch<React.SetStateAction<boolean>>;
// }

export interface MeetModalProps {
  title?: string;
  content?: string;
  onConfirm: () => void;
  onCancel: () => void;
}
export interface MemberInfo {
  memberId?: number;
  groupMemberId?: number;
  joinType?: string;
  profilePicture?: string;
  nickname?: string;
}

export interface MemberListProps {
  memberInfo: MemberInfo[];
  onClick: (memberId: number) => void;
}

export interface MemberDetailDataProps {
  applyPost: string | null;
  birthDate: string;
  gender: 'MAN' | 'WOMAN';
  groupMemberId: number;
  joinType: string;
  memberId: number;
  name: string;
  nickname: string;
  profilePicture: string;
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
  totalDays: number;
  totalDistance: number;
  recruitedCount: number;
  recruitmentCount: number;
  readerProfileImg?: string;
  readerName?: string;
  description?: string;
  recruitmentPeriod?: string;

  onClick?: () => void;
}

export interface MeetFilterInfo {
  startPoint?: string;
  endPoint?: string;
  maxTotalDays?: number;
  maxRecruitmentCount?: number;
}

export interface MeetRequestDto extends MeetFilterInfo {
  pageable: MeetPageAble;
}

export interface MeetPageAble {
  page: number;
  size: number;
  sort: string;
}

export interface CreateMeetRequestDto {
  multipartFile: File;
  title: string;
  description: string;
  recruitmentCount: number;
  recruitmentPeriod: string;
  courseId: number;
  startDate: string;
}

export interface schedulePostReqDto {
  courseId: number;
  startDate: string;
}

export interface groupPostReqDtoProps {
  title: string;
  description: string;
  recruitmentCount: number;
  recruitmentPeriod: string;
  schedulePostReqDto: schedulePostReqDto;
}

export interface CreateMeetProps {
  multipartFile: string;
  groupPostReqDto: groupPostReqDtoProps;
}
