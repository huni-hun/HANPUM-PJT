package backend.hanpum.domain.group.repository.custom;

import backend.hanpum.domain.group.entity.QGroupMember;
import backend.hanpum.domain.group.enums.JoinType;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
public class GroupMemberRepositoryImpl implements GroupMemberRepositoryCustom {

    private final JPAQueryFactory query;

    @Override
    public Long countGroupMember(Long groupId) {
        QGroupMember groupMember = QGroupMember.groupMember;
        return query
                .select(groupMember.count())
                .from(groupMember)
                .where(groupMember.group.groupId.eq(groupId)
                        .and(groupMember.joinType.ne(JoinType.APPLY)))
                .fetchOne();
    }
}
