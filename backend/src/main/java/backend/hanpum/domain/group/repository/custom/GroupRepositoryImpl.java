package backend.hanpum.domain.group.repository.custom;

import backend.hanpum.domain.course.entity.QCourse;
import backend.hanpum.domain.group.dto.responseDto.GroupDetailGetResDto;
import backend.hanpum.domain.group.dto.responseDto.GroupListGetResDto;
import backend.hanpum.domain.group.dto.responseDto.GroupResDto;
import backend.hanpum.domain.group.entity.QGroup;
import backend.hanpum.domain.group.entity.QGroupMember;
import backend.hanpum.domain.group.entity.QLikeGroup;
import backend.hanpum.domain.group.enums.JoinType;
import backend.hanpum.domain.schedule.entity.QSchedule;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
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
    public GroupListGetResDto findGroupList(Long memberId, String startPoint, String endPoint, Integer maxTotalDays,
                                            Integer maxRecruitmentCount, Pageable pageable) {
        QGroup group = QGroup.group;
        QGroupMember groupMember = QGroupMember.groupMember;
        QCourse course = QCourse.course;
        QLikeGroup likeGroup = QLikeGroup.likeGroup;
        QSchedule schedule = QSchedule.schedule;

        OrderSpecifier<?> orderSpecifier = group.groupId.desc();
        for (Sort.Order order : pageable.getSort()) {
            String property = order.getProperty();
            boolean isAscending = order.isAscending();

            switch (property) {
                case "likeCount":
                    orderSpecifier = isAscending ? group.likeCount.asc() : group.likeCount.desc();
                    break;
                case "totalDistance":
                    orderSpecifier = isAscending ? course.totalDistance.asc() : course.totalDistance.desc();
                    break;
                case "latest":
                    orderSpecifier = isAscending ? group.groupId.asc() : group.groupId.desc();
                    break;
                default:
                    break;
            }
        }

        BooleanBuilder whereClause = new BooleanBuilder();
        if (maxRecruitmentCount != null) {
            whereClause.and(group.recruitmentCount.loe(maxRecruitmentCount));
        }
        if (maxTotalDays != null) {
            whereClause.and(course.totalDays.loe(maxTotalDays));
        }
        if (startPoint != null && !startPoint.isEmpty()) {
            whereClause.and(course.startPoint.eq(startPoint));
        }
        if (endPoint != null && !endPoint.isEmpty()) {
            whereClause.and(course.endPoint.eq(endPoint));
        }

        List<GroupResDto> content = query
                .select(Projections.constructor(
                        GroupResDto.class,
                        group.groupId,
                        group.title,
                        group.groupImg,
                        group.likeCount,
                        groupMember.member.memberId.count().as("recruitedCount"),
                        group.recruitmentCount,
                        course.startPoint,
                        course.endPoint,
                        course.totalDistance,
                        course.totalDays,
                        JPAExpressions.selectOne()
                                .from(likeGroup)
                                .where(likeGroup.member.memberId.eq(memberId)
                                        .and(likeGroup.group.groupId.eq(group.groupId)))
                                .exists()
                                .as("isLike")
                ))
                .from(group)
                .leftJoin(group.groupMemberList, groupMember)
                .leftJoin(group.schedule, schedule)
                .leftJoin(schedule.course, course)
                .leftJoin(likeGroup).on(likeGroup.group.groupId.eq(group.groupId).and(likeGroup.member.memberId.eq(memberId)))
                .where(groupMember.joinType.ne(JoinType.APPLY).and(whereClause))
                .groupBy(group.groupId, course.startPoint, course.endPoint, course.totalDistance, course.totalDays)
                .orderBy(orderSpecifier)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long total = query
                .select(group.count())
                .from(group)
                .leftJoin(group.schedule, schedule)
                .leftJoin(schedule.course, course)
                .where(whereClause)
                .fetchOne();
        long totalElements = (total != null) ? total : 0;

        int totalPages = (int) Math.ceil((double) total / pageable.getPageSize());
        int currentPage = pageable.getPageNumber();

        return GroupListGetResDto.builder()
                .groupResDtoList(content)
                .currentPage(currentPage)
                .totalPages(totalPages)
                .totalElements(totalElements)
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