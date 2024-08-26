package backend.hanpum.domain.group.dto.requestDto;

import backend.hanpum.domain.schedule.dto.requestDto.SchedulePostReqDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplyPostReqDto {
    private String applyPost;
}
