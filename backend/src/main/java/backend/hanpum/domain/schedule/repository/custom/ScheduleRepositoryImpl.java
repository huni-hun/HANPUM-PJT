package backend.hanpum.domain.schedule.repository.custom;

import backend.hanpum.domain.schedule.dto.responseDto.ScheduleResDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import static backend.hanpum.domain.schedule.entity.QSchedule.schedule;

@RequiredArgsConstructor
public class ScheduleRepositoryImpl implements ScheduleRepositoryCustom {

    private final JPAQueryFactory query;

    @Override
    public Optional<List<ScheduleResDto>> getMyScheduleByMemberId(Long memberId) {
        return Optional.ofNullable(query.select(
                        Projections.constructor(ScheduleResDto.class,
                                schedule.id,
                                schedule.type,
                                schedule.date,
                                schedule.state
//                                member.id,
//                                course.id,
                                )).from(schedule)
//                .where(schedule.member.id.eq(memberId))
                .fetch());
    }
}
