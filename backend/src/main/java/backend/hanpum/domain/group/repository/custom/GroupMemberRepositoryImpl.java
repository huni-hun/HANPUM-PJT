package backend.hanpum.domain.group.repository.custom;

import backend.hanpum.domain.group.dto.responseDto.GroupApplyResDto;
import backend.hanpum.domain.group.dto.responseDto.GroupMemberResDto;
import backend.hanpum.domain.group.entity.QGroupMember;
import backend.hanpum.domain.group.enums.JoinType;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;


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

    @Override
    public List<GroupApplyResDto> findGroupApplyList(Long groupId) {
        QGroupMember groupMember = QGroupMember.groupMember;
        return query
                .select(Projections.constructor(
                        GroupApplyResDto.class,
                        groupMember.member.memberId,
                        groupMember.groupMemberId,
                        groupMember.joinType
                ))
                .from(groupMember)
                .where(groupMember.group.groupId.eq(groupId)
                        .and(groupMember.joinType.eq(JoinType.APPLY)))
                .fetch();
    }

    @Override
    public List<GroupMemberResDto> findGroupMemberList(Long groupId) {
        QGroupMember groupMember = QGroupMember.groupMember;
        return query
                .select(Projections.constructor(
                        GroupMemberResDto.class,
                        groupMember.member.memberId,
                        groupMember.groupMemberId,
                        groupMember.joinType,
                        groupMember.member.profilePicture,
                        groupMember.member.nickname
                ))
                .from(groupMember)
                .where(groupMember.group.groupId.eq(groupId)
                        .and(groupMember.joinType.ne(JoinType.APPLY)))
                .fetch();
    }
}