package backend.hanpum.domain.group.dto.responseDto;

import backend.hanpum.domain.group.enums.GroupJoinStatus;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroupDetailGetResDto {
    private String readerProfileImg; // 모임장 이미지
    private String readerName; // 모임장 이름
    private Long courseId; // 코스 번호
    private String title; // 모임 이름
    private String groupImg; // 모임 이미지
    private String description; // 모집글
    private Date recruitmentStart; // 모집 시작일
    private Date recruitmentPeriod;// 모집 종료일
    private Long dDay; // 모집 마감 Dday
    private Long recruitedCount; // 현재 모집된 인원
    private int recruitmentCount;// 총 모집 인원
    private int likeCount; // 좋아요 수
    private List<String> courseTypes; // 경로 타입
    private String startPoint; // 출발지
    private String endPoint; // 목적지
    private Integer totalDays; // 총 일정 기간
    private String startDate; // 일정 시작일
    private String endDate; // 일정 출발일
    private boolean isLike; // 좋아요 눌렀는지 안눌렀는지
    private GroupJoinStatus groupJoinStatus; // 조회한 멤버 상태

    public GroupDetailGetResDto(Long courseId, String title, String groupImg,
                                String description, Date recruitmentStart, Date recruitmentPeriod,
                                Long recruitedCount, int recruitmentCount, int likeCount, String startPoint, String endPoint,
                                Integer totalDays, String startDate, String endDate, boolean isLike) {
        this.courseId = courseId;
        this.title = title;
        this.groupImg = groupImg;
        this.description = description;
        this.recruitmentStart = recruitmentStart;
        this.recruitmentPeriod = recruitmentPeriod;
        this.recruitedCount = recruitedCount;
        this.recruitmentCount = recruitmentCount;
        this.likeCount = likeCount;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.totalDays = totalDays;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isLike = isLike;
    }
}