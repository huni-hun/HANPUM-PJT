package backend.hanpum.domain.schedule.dto.responseDto;

import backend.hanpum.domain.course.dto.responseDto.AttractionResDto;
import backend.hanpum.domain.course.dto.responseDto.GetCourseDayResDto;
import backend.hanpum.domain.course.enums.CourseTypes;
import backend.hanpum.domain.weather.dto.WeatherResDto;
import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
public class ScheduleInProgressResDto {
    Long scheduleId;        // 일정 ID
    Long courseId;          // 경로 ID
    String title;
    String backgroundImg;
    String content;
    List<CourseTypes> courseTypes;
    String startPoint;      // 출발지
    String endPoint;        // 도착지
    String startDate;       // 시작일
    String endDate;         // 종료일
    Double totalDistance;   // 총 거리
    int rate;            // 달성률
    List<ScheduleDayResDto> scheduleDayResDtoList;
}
