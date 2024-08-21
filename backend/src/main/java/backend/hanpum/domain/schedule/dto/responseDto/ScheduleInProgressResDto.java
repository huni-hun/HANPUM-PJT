package backend.hanpum.domain.schedule.dto.responseDto;

import backend.hanpum.domain.course.dto.responseDto.AttractionResDto;
import backend.hanpum.domain.course.dto.responseDto.GetCourseDayResDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleInProgressResDto {
    Long scheduleId;        // 일정 ID
    String startPoint;      // 출발지
    String endPoint;        // 도착지
    String startDate;       // 시작일
    String endDate;         // 종료일
    String totalDistance;   // 총 거리
    String rate;            // 달성률
    String weather;         // 날씨
    List<GetCourseDayResDto> courseDays; // 일정 정보
    List<AttractionResDto> attractions;     // 관광지
}
