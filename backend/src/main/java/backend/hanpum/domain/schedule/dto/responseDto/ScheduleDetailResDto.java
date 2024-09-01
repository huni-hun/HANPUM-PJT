package backend.hanpum.domain.schedule.dto.responseDto;

import backend.hanpum.domain.course.enums.CourseTypes;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleDetailResDto {
    Long scheduleId;        // 일정 ID
    String content;         // 경로 설명
    String backgroundImg;   // 경로 이미지
    String title;           // 경로 제목
    String type;            // 경로 type
    String startPoint;      // 출발지
    String endPoint;        // 목적지
    String startDate;       // 출발일
    String endDate;         // 도착일
    int state;              // 진행 상태
    Double totalDistance;   // 총 이동거리
//    @Setter
//    List<CourseTypes> courseTypes;  //해시태그
    @Setter
    List<ScheduleDayResDto> scheduleDayResDtoList;


    public ScheduleDetailResDto (Long scheduleId,
                                                     String content,
                                                     String backgroundImg,
                                                     String title,
                                                     String type,
                                                     String startPoint,
                                                     String endPoint,
                                                     String startDate,
                                                     String endDate,
                                                     int state,
                                                     Double totalDistance
//                                                     List<CourseTypes> courseTypes
    ) {
        this.scheduleId = scheduleId;
        this.content = content;
        this.backgroundImg = backgroundImg;
        this.title = title;
        this.type = type;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.startDate = startDate;
        this.endDate = endDate;
        this.state = state;
        this.totalDistance = totalDistance;
//        this.courseTypes = courseTypes;
    }
}
