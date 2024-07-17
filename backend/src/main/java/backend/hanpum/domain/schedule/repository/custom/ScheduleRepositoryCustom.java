package backend.hanpum.domain.schedule.repository.custom;

import backend.hanpum.domain.schedule.dto.responseDto.ScheduleResDto;

import java.util.List;
import java.util.Optional;

public interface ScheduleRepositoryCustom {
    Optional<List<ScheduleResDto>> getMyScheduleByMemberId(Long memberId);
}
