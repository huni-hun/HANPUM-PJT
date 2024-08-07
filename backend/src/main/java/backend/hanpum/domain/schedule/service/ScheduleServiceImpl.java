package backend.hanpum.domain.schedule.service;

import backend.hanpum.domain.course.entity.Course;
import backend.hanpum.domain.course.entity.CourseDay;
import backend.hanpum.domain.course.entity.Waypoint;
import backend.hanpum.domain.course.repository.CourseRepository;
import backend.hanpum.domain.member.entity.Member;
import backend.hanpum.domain.member.repository.MemberRepository;
import backend.hanpum.domain.schedule.dto.requestDto.SchedulePostReqDto;
import backend.hanpum.domain.schedule.dto.requestDto.ScheduleRunReqDto;
import backend.hanpum.domain.schedule.dto.requestDto.ScheduleStartReqDto;
import backend.hanpum.domain.schedule.dto.responseDto.ScheduleDayResDto;
import backend.hanpum.domain.schedule.dto.responseDto.ScheduleResDto;
import backend.hanpum.domain.schedule.entity.Schedule;
import backend.hanpum.domain.schedule.entity.ScheduleDay;
import backend.hanpum.domain.schedule.entity.ScheduleWayPoint;
import backend.hanpum.domain.schedule.repository.ScheduleDayRepository;
import backend.hanpum.domain.schedule.repository.ScheduleRepository;
import backend.hanpum.domain.schedule.repository.ScheduleWayPointRepository;
import backend.hanpum.exception.exception.auth.LoginInfoInvalidException;
import backend.hanpum.exception.exception.schedule.InvalidDayFormatException;
import backend.hanpum.exception.exception.schedule.ScheduleDayNotFoundException;
import backend.hanpum.exception.exception.schedule.ScheduleNotFoundException;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Collections;
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

    private void createScheduleDays(Course course, Schedule schedule, String startDate) {
        List<CourseDay> courseDays = course.getCourseDays();
        courseDays.sort(Comparator.comparingInt(CourseDay::getDayNumber));
        for (int i = 0; i < courseDays.size(); i++) {
            CourseDay courseDay = courseDays.get(i);
            int dayNumber = courseDay.getDayNumber();
            String date = calculateDate(startDate, dayNumber - 1);
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
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        try {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(simpleDateFormat.parse(date));
            calendar.add(Calendar.DATE, day);
            return simpleDateFormat.format(calendar.getTime());
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
    public ScheduleDayResDto getMyScheduleDay(Long ScheduleId, int day) {
        ScheduleDayResDto scheduleDayResDto = scheduleRepository.getScheduleDayResDto(ScheduleId, day).orElseThrow(ScheduleDayNotFoundException::new);
        return scheduleDayResDto;
    }

    @Override
    public void deleteSchedule(Long ScheduleId) {
        scheduleRepository.deleteById(ScheduleId);
    }

    @Transactional
    @Override
    public Long startAndStopSchedule(ScheduleStartReqDto scheduleRunReqDto) {
        Schedule schedule = scheduleRepository.findById(scheduleRunReqDto.getScheduleId()).orElseThrow(ScheduleNotFoundException::new);
//        Member member = memberRepository.findById(schedulePostReqDto.getMemberId()).orElseThrow(MemberNotFoundException::new)

        if (schedule.isState()) {
            schedule.setState(false);
        } else {
            schedule.setState(true);
        }
        scheduleRepository.save(schedule);

        return schedule.getId();
    }

    @Transactional
    @Override
    public Long runAndStop(ScheduleRunReqDto scheduleRunReqDto) {
        ScheduleDay scheduleDay = scheduleDayRepository.findById(scheduleRunReqDto.getScheduleDayId()).orElseThrow(ScheduleDayNotFoundException::new);
        if (scheduleDay.isRunning()) {
            scheduleDay.setRunning(false);
        } else {
            scheduleDay.setRunning(true);
        }
        scheduleDayRepository.save(scheduleDay);
        return scheduleDay.getId();
    }


}
