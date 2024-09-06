package backend.hanpum.domain.schedule.dto.responseDto;

import backend.hanpum.domain.course.enums.CourseTypes;
import backend.hanpum.domain.group.dto.responseDto.GroupMemberResDto;
import lombok.*;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroupScheduleResDto {
    Long scheduleId;
    Long courseId;
    String content;
    String backgroundImg;
    String title;
    String type;
    String startPoint;
    String endPoint;
    String startDate;
    String endDate;
    int state;
    Double totalDistance;
    @Setter
    List<CourseTypes> courseTypes;
    @Setter
    List<ScheduleDayResDto> scheduleDayResDtoList;
    @Setter
    List<GroupMemberResDto> groupMemberResDtoList;

    public GroupScheduleResDto(Long scheduleId,
                               Long courseId,
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
        this.courseId = courseId;
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
