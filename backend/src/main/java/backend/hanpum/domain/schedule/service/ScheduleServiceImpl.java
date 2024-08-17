package backend.hanpum.domain.schedule.service;

import backend.hanpum.domain.course.entity.Course;
import backend.hanpum.domain.course.entity.CourseDay;
import backend.hanpum.domain.course.entity.Waypoint;
import backend.hanpum.domain.course.repository.CourseRepository;
import backend.hanpum.domain.group.entity.Group;
import backend.hanpum.domain.group.repository.GroupRepository;
import backend.hanpum.domain.member.entity.Member;
import backend.hanpum.domain.member.repository.MemberRepository;
import backend.hanpum.domain.schedule.dto.requestDto.MemoPostReqDto;
import backend.hanpum.domain.schedule.dto.requestDto.SchedulePostReqDto;
import backend.hanpum.domain.schedule.dto.requestDto.ScheduleRunReqDto;
import backend.hanpum.domain.schedule.dto.requestDto.ScheduleStartReqDto;
import backend.hanpum.domain.schedule.dto.responseDto.ScheduleDayResDto;
import backend.hanpum.domain.schedule.dto.responseDto.ScheduleResDto;
import backend.hanpum.domain.schedule.entity.Memo;
import backend.hanpum.domain.schedule.entity.Schedule;
import backend.hanpum.domain.schedule.entity.ScheduleDay;
import backend.hanpum.domain.schedule.entity.ScheduleWayPoint;
import backend.hanpum.domain.schedule.repository.MemoRepository;
import backend.hanpum.domain.schedule.repository.ScheduleDayRepository;
import backend.hanpum.domain.schedule.repository.ScheduleRepository;
import backend.hanpum.domain.schedule.repository.ScheduleWayPointRepository;
import backend.hanpum.exception.exception.auth.LoginInfoInvalidException;
import backend.hanpum.exception.exception.auth.MemberInfoInvalidException;
import backend.hanpum.exception.exception.group.GroupNotFoundException;
import backend.hanpum.exception.exception.schedule.GroupScheduleNotFoundException;
import backend.hanpum.exception.exception.schedule.InvalidDayFormatException;
import backend.hanpum.exception.exception.schedule.ScheduleDayNotFoundException;
import backend.hanpum.exception.exception.schedule.ScheduleNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final ScheduleDayRepository scheduleDayRepository;
    private final ScheduleWayPointRepository scheduleWayPointRepository;
    private final CourseRepository courseRepository;
    private final MemberRepository memberRepository;
    private final MemoRepository memoRepository;
    private final GroupRepository groupRepository;

    @Transactional
    @Override
    public Long createSchedule(Long memberId, SchedulePostReqDto schedulePostReqDto) {

        Course course = courseRepository.findById(schedulePostReqDto.getCourseId()).orElseThrow(ScheduleNotFoundException::new);
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);

        String startDate = schedulePostReqDto.getStartDate();

        Schedule schedule = Schedule.builder()
                .title(schedulePostReqDto.getTitle())
                .type("private")
                .date(startDate)
                .member(member)
                .course(course)
                .build();
        scheduleRepository.save(schedule);
        createScheduleDays(course, schedule, startDate);
        return schedule.getId();
    }

    @Transactional
    @Override
    public Long createGroupSchedule(Long memberId, SchedulePostReqDto schedulePostReqDto) {
        // 멤버가 속할 수 있는 그룹은 하나 -> 멤버 정보로 그룹 정보 가져오기
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);
        Long groupId = member.getGroupMember().getGroup().getGroupId();

        Course course = courseRepository.findById(schedulePostReqDto.getCourseId()).orElseThrow(ScheduleNotFoundException::new);
        Group group = groupRepository.findById(groupId).orElseThrow(GroupNotFoundException::new);

        String startDate = schedulePostReqDto.getStartDate();

        Schedule schedule = Schedule.builder()
                .title(schedulePostReqDto.getTitle())
                .type("group")
                .date(startDate)
                .group(group)
                .course(course)
                .build();
        scheduleRepository.save(schedule);
        createScheduleDays(course, schedule, startDate);
        return schedule.getId();
    }

    private void createScheduleDays(Course course, Schedule schedule, String startDate) {
        List<CourseDay> courseDays = course.getCourseDays();
        courseDays.sort(Comparator.comparingInt(CourseDay::getDayNumber));
        for (int i = 0; i < courseDays.size(); i++) {
            CourseDay courseDay = courseDays.get(i);
            String date = calculateDate(startDate, i);
            ScheduleDay scheduleDay = ScheduleDay.builder()
                    .date(date)
                    .courseDay(courseDay)
                    .schedule(schedule)
                    .build();
            scheduleDayRepository.save(scheduleDay);

            createScheduleWayPoints(courseDay, scheduleDay);
        }
    }

    private void createScheduleWayPoints(CourseDay courseDay, ScheduleDay scheduleDay) {
        List<Waypoint> waypointList = courseDay.getWaypoints();
        for (int i = 0; i < waypointList.size(); i++) {
            Waypoint waypoint = waypointList.get(i);
            ScheduleWayPoint scheduleWayPoint = ScheduleWayPoint.builder()
                    .waypoint(waypoint)
                    .scheduleDay(scheduleDay)
                    .build();
            scheduleWayPointRepository.save(scheduleWayPoint);
        }
    }

    private String calculateDate(String date, int day) {
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        try {
            LocalDate localDate = LocalDate.parse(date, dateTimeFormatter);
            localDate = localDate.plusDays(day);
            return localDate.format(dateTimeFormatter);
        } catch (Exception e) {
            throw new InvalidDayFormatException(e.getMessage());
        }
    }

    @Transactional(readOnly = true)
    @Override
    public List<ScheduleResDto> getMyScheduleList(Long memberId) {
        List<ScheduleResDto> scheduleResDtoList = scheduleRepository.getMyScheduleByMemberId(memberId).orElseThrow(ScheduleNotFoundException::new);
        return scheduleResDtoList;
    }

    @Transactional(readOnly = true)
    @Override
    public List<ScheduleResDto> getGroupScheduleList(Long memberId) {
        List<ScheduleResDto> scheduleResDtoList = scheduleRepository.getGroupScheduleByMemberId(memberId).orElseThrow(GroupScheduleNotFoundException::new);

        return List.of();
    }

    @Transactional(readOnly = true)
    @Override
    public ScheduleDayResDto getMyScheduleDay(Long memberId, Long ScheduleId, int day) {
        ScheduleDayResDto scheduleDayResDto = scheduleRepository.getScheduleDayResDto(memberId, ScheduleId, day).orElseThrow(ScheduleDayNotFoundException::new);
        return scheduleDayResDto;
    }

    @Override
    public void deleteSchedule(Long memberId, Long ScheduleId) {
        Schedule schedule = scheduleRepository.findById(ScheduleId).orElseThrow(ScheduleNotFoundException::new);
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);

        /* 접근 권한 확인용 */
        if (!schedule.getMember().equals(member)) {
            throw new MemberInfoInvalidException();
        }
        /**/

        scheduleRepository.deleteById(ScheduleId);
    }

    @Transactional
    @Override
    public Long startAndStopSchedule(Long memberId, ScheduleStartReqDto scheduleRunReqDto) {
        Schedule schedule = scheduleRepository.findById(scheduleRunReqDto.getScheduleId()).orElseThrow(ScheduleNotFoundException::new);
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);

        /* 접근 권한 확인용 */
        if (!schedule.getMember().equals(member)) {
            throw new MemberInfoInvalidException();
        }
        /* */

        schedule.startAndStop();

        scheduleRepository.save(schedule);

        return schedule.getId();
    }

    @Transactional
    @Override
    public Long runAndStop(Long memberId, ScheduleRunReqDto scheduleRunReqDto) {
        ScheduleDay scheduleDay = scheduleDayRepository.findById(scheduleRunReqDto.getScheduleDayId()).orElseThrow(ScheduleDayNotFoundException::new);
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);

        /* 접근 권한 확인용 */
        if (!scheduleDay.getSchedule().getMember().equals(member)) {
            throw new MemberInfoInvalidException();
        }
        /* */

        scheduleDay.runAndStop();

        scheduleDayRepository.save(scheduleDay);
        return scheduleDay.getId();
    }

    @Override
    public void createMemo(Long memberId, MemoPostReqDto memoPostReqDto) {
        ScheduleWayPoint scheduleWayPoint = scheduleWayPointRepository.findById(memoPostReqDto.scheduleWayPointId).orElseThrow();
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);

        /* 접근 권한 확인용 */
        if (!scheduleWayPoint.getScheduleDay().getSchedule().getMember().equals(member)) {
            throw new MemberInfoInvalidException();
        }
        /* */

        Memo memo = Memo.builder()
                .content(memoPostReqDto.getContent())
                .scheduleWayPoint(scheduleWayPoint)
                .build();

        memoRepository.save(memo);
    }
}
