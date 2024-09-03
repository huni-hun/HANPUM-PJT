package backend.hanpum.domain.group.repository.custom;

import backend.hanpum.domain.group.dto.responseDto.GroupDetailGetResDto;
import backend.hanpum.domain.group.dto.responseDto.GroupListGetResDto;
import backend.hanpum.domain.group.dto.responseDto.GroupResDto;
import backend.hanpum.domain.group.dto.responseDto.LikeGroupListGetResDto;
import backend.hanpum.domain.group.enums.JoinType;
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

import static backend.hanpum.domain.group.entity.QGroup.group;
import static backend.hanpum.domain.group.entity.QGroupMember.groupMember;
import static backend.hanpum.domain.schedule.entity.QSchedule.schedule;
import static backend.hanpum.domain.course.entity.QCourse.course;
import static backend.hanpum.domain.group.entity.QLikeGroup.likeGroup;


@RequiredArgsConstructor
public class GroupRepositoryImpl implements GroupRepositoryCustom {

    private final JPAQueryFactory query;

    @Override
    public GroupListGetResDto findGroupList(Long memberId, String startPoint, String endPoint, Integer maxTotalDays,
                                            Integer maxRecruitmentCount, Pageable pageable) {
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
                        schedule.startDate,
                        schedule.endDate,
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
                .groupBy(group.groupId, course.startPoint, course.endPoint, course.totalDistance, course.totalDays,
                        schedule.startDate, schedule.endDate)
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
    public LikeGroupListGetResDto findMemberLikeGroupList(Long memberId) {

        BooleanBuilder whereClause = new BooleanBuilder();
        whereClause.and(likeGroup.member.memberId.eq(memberId));
        whereClause.and(groupMember.joinType.ne(JoinType.APPLY));

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
                        schedule.startDate,
                        schedule.endDate,
                        JPAExpressions.selectOne()
                                .from(likeGroup)
                                .where(likeGroup.member.memberId.eq(memberId)
                                        .and(likeGroup.group.groupId.eq(group.groupId)))
                                .exists()
                                .as("isLike")
                ))
                .from(group)
                .join(likeGroup).on(likeGroup.group.groupId.eq(group.groupId))
                .leftJoin(group.groupMemberList, groupMember)
                .leftJoin(group.schedule, schedule)
                .leftJoin(schedule.course, course)
                .where(whereClause)
                .groupBy(group.groupId, schedule.course, schedule.course, schedule.course, schedule.course,
                        schedule.startDate, schedule.endDate)
                .orderBy(group.groupId.desc())
                .fetch();

        return LikeGroupListGetResDto.builder().groupResDtoList(content).build();
    }

    @Override
    public Optional<GroupDetailGetResDto> findGroupById(Long memberId, Long groupId) {
        return Optional.ofNullable(query
                .select(Projections.constructor(
                        GroupDetailGetResDto.class,
                        course.courseId,              // 경로 번호
                        group.title,                  // 모임 이름
                        group.groupImg,               // 모임 이미지
                        group.description,            // 모집글
                        group.recruitmentStart,       // 모집 시작일
                        group.recruitmentPeriod,      // 모집 종료일
                        groupMember.member.memberId.count().as("recruitedCount"), // 현재 모집 인원
                        group.recruitmentCount,       // 총 모집 인원
                        group.likeCount,              // 좋아요 수
                        course.startPoint,            // 출발지
                        course.endPoint,              // 목적지
                        course.totalDays,              // 총 일정 기간
                        schedule.startDate,           // 일정 시작일
                        schedule.endDate,           // 일정 종료일
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
                .where(group.groupId.eq(groupId))
                .where(groupMember.joinType.ne(JoinType.APPLY))
                .groupBy(group.groupId, course.courseId, group.title, group.groupImg, group.description, group.recruitmentStart, group.recruitmentPeriod,
                        course.startPoint, course.endPoint, course.totalDays, schedule.startDate, schedule.endDate)
                .fetchOne());
    }

    @Override
    public GroupResDto findGroupByMemberId(Long memberId) {
        return query
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
                        schedule.startDate,
                        schedule.endDate,
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
                .where(groupMember.member.memberId.eq(memberId)
                        .and(groupMember.joinType.ne(JoinType.APPLY)))
                .groupBy(group.groupId, course.startPoint, course.endPoint, course.totalDistance, course.totalDays,
                        schedule.startDate, schedule.endDate)
                .fetchOne();
    }
}