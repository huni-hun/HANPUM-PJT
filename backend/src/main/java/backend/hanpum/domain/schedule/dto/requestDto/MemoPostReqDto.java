package backend.hanpum.domain.schedule.dto.requestDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemoPostReqDto {
    public Long scheduleWayPointId;
    public String content;
}
