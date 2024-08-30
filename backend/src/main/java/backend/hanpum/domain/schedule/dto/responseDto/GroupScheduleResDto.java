package backend.hanpum.domain.schedule.dto.responseDto;

import backend.hanpum.domain.group.dto.responseDto.GroupMemberResDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroupScheduleResDto {
    Long scheduleId;
    String backgroundImg;
    String title;
    String type;
    String startPoint;
    String endPoint;
    String startDate;
    String endDate;
    int state;
    List<GroupMemberResDto> groupMemberResDtoList;
}
