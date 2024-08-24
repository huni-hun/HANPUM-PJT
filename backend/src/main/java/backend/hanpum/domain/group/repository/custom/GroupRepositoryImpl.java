package backend.hanpum.domain.group.repository.custom;

import backend.hanpum.domain.group.dto.responseDto.GroupDetailGetResDto;
import backend.hanpum.domain.group.dto.responseDto.GroupListGetResDto;
import backend.hanpum.domain.group.dto.responseDto.GroupResDto;
import backend.hanpum.domain.group.entity.QGroup;
import backend.hanpum.domain.group.entity.QGroupMember;
import backend.hanpum.domain.group.enums.JoinType;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class GroupRepositoryImpl implements GroupRepositoryCustom {

    private final JPAQueryFactory query;

    @Override
    public GroupListGetResDto findGroupList(Pageable pageable) {
        QGroup group = QGroup.group;
        QGroupMember groupMember = QGroupMember.groupMember;

        OrderSpecifier<?> orderSpecifier = null;
        for (Sort.Order order : pageable.getSort()) {
            String property = order.getProperty();
            boolean isAscending = order.isAscending();

            if (property.equalsIgnoreCase("likeCount")) {
                orderSpecifier = isAscending ? group.likeCount.asc() : group.likeCount.desc();
            } else if (property.equalsIgnoreCase("latest")) {
                orderSpecifier = isAscending ? group.groupId.asc() : group.groupId.desc();
            }
        }

        // 쿼리 구성
        List<GroupResDto> content = query
                .select(Projections.constructor(
                        GroupResDto.class,
                        group.groupId,
                        group.title,
                        group.groupImg,
                        group.likeCount,
                        groupMember.member.memberId.count().as("recruitedCount"),
                        group.recruitmentCount
                ))
                .from(group)
                .leftJoin(group.groupMemberList, groupMember)
                .where(groupMember.joinType.ne(JoinType.APPLY))
                .groupBy(group.groupId)
                .orderBy(orderSpecifier)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long total = query
                .select(group.count())
                .from(group)
                .fetchOne();

        int totalPages = (int) Math.ceil((double) total / pageable.getPageSize());
        int currentPage = pageable.getPageNumber();

        return GroupListGetResDto.builder()
                .groupResDtoList(content)
                .currentPage(currentPage)
                .totalPages(totalPages)
                .totalElements(total)
                .build();
    }

    @Override
    public Optional<GroupDetailGetResDto> findGroupById(Long groupId) {
        QGroup group = QGroup.group;
        QGroupMember groupMember = QGroupMember.groupMember;

        return Optional.ofNullable(query
                .select(Projections.constructor(
                        GroupDetailGetResDto.class,
                        group.title,
                        group.groupImg,
                        group.description,
                        group.likeCount,
                        groupMember.member.memberId.count().as("recruitedCount"),
                        group.recruitmentCount,
                        group.recruitmentPeriod
                ))
                .from(group)
                .leftJoin(group.groupMemberList, groupMember)
                .where(group.groupId.eq(groupId))
                .where(groupMember.joinType.ne(JoinType.APPLY))
                .groupBy(group.groupId)
                .fetchOne());
    }
}