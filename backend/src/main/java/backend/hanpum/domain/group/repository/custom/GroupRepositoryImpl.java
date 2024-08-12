package backend.hanpum.domain.group.repository.custom;

import backend.hanpum.domain.group.dto.responseDto.GroupResDto;
import backend.hanpum.domain.group.entity.QGroup;
import backend.hanpum.domain.group.entity.QGroupMember;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class GroupRepositoryImpl implements GroupRepositoryCustom {

    private final JPAQueryFactory query;

    @Override
    public List<GroupResDto> findGroupList() {
        QGroup group = QGroup.group;
        QGroupMember groupMember = QGroupMember.groupMember;

        return query
                .select(Projections.constructor(
                        GroupResDto.class,
                        group.title,
                        group.groupImg,
                        groupMember.member.memberId.count().as("recruitedCount"),
                        group.recruitmentCount
                ))
                .from(group)
                .leftJoin(group.groupMemberList, groupMember)
                .groupBy(group.groupId)
                .fetch();
    }
}
