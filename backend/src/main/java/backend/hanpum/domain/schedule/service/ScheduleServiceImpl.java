package backend.hanpum.domain.schedule.service;

import backend.hanpum.domain.course.entity.Course;
import backend.hanpum.domain.course.repository.CourseRepository;
import backend.hanpum.domain.member.repository.MemberRepository;
import backend.hanpum.domain.schedule.dto.requestDto.SchedulePostReqDto;
import backend.hanpum.domain.schedule.dto.requestDto.ScheduleRunReqDto;
import backend.hanpum.domain.schedule.dto.requestDto.ScheduleStartReqDto;
import backend.hanpum.domain.schedule.dto.responseDto.ScheduleDayResDto;
import backend.hanpum.domain.schedule.dto.responseDto.ScheduleResDto;
import backend.hanpum.domain.schedule.entity.Schedule;
import backend.hanpum.domain.schedule.entity.ScheduleDay;
import backend.hanpum.domain.schedule.repository.ScheduleDayRepository;
import backend.hanpum.domain.schedule.repository.ScheduleRepository;
import backend.hanpum.exception.exception.schedule.ScheduleDayNotFoundException;
import backend.hanpum.exception.exception.schedule.ScheduleNotFoundException;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final ScheduleDayRepository scheduleDayRepository;
    private final CourseRepository courseRepository;
    private final MemberRepository memberRepository;

    @Transactional
    @Override
    public Long createSchedule(SchedulePostReqDto schedulePostReqDto) {

        Course course = courseRepository.findById(schedulePostReqDto.getCourseId()).orElseThrow(ScheduleNotFoundException::new);
//        Member member = memberRepository.findById(schedulePostReqDto.getMemberId()).orElseThrow(MemberNotFoundException::new)

        Schedule schedule = Schedule.builder()
                .title(schedulePostReqDto.getTitle())
                .type("private")
                .date(schedulePostReqDto.getStartDate())
//                .member(member)
                .build();

        scheduleRepository.save(schedule);
        return schedule.getId();
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
        }else{
            scheduleDay.setRunning(true);
        }
        scheduleDayRepository.save(scheduleDay);
        return scheduleDay.getId();
    }


}
