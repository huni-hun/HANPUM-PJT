package backend.hanpum.domain.schedule.service;

import backend.hanpum.domain.course.entity.Course;
import backend.hanpum.domain.course.repository.CourseRepository;
import backend.hanpum.domain.member.entity.Member;
import backend.hanpum.domain.member.repository.MemberRepository;
import backend.hanpum.domain.schedule.dto.requestDto.ScheduleDayReqDto;
import backend.hanpum.domain.schedule.dto.requestDto.SchedulePostReqDto;
import backend.hanpum.domain.schedule.dto.requestDto.ScheduleRunReqDto;
import backend.hanpum.domain.schedule.dto.responseDto.ScheduleDayResDto;
import backend.hanpum.domain.schedule.dto.responseDto.ScheduleResDto;
import backend.hanpum.domain.schedule.entity.Schedule;
import backend.hanpum.domain.schedule.repository.ScheduleRepository;
import backend.hanpum.exception.exception.schedule.ScheduleDayNotFoundException;
import backend.hanpum.exception.exception.schedule.ScheduleNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final CourseRepository courseRepository;
    private final MemberRepository memberRepository;

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

    @Override
    public List<ScheduleResDto> getMyScheduleList(Long memberId) {
        List<ScheduleResDto> scheduleResDtoList = scheduleRepository.getMyScheduleByMemberId(memberId).orElseThrow(ScheduleNotFoundException::new);
        return scheduleResDtoList;
    }

    @Override
    public ScheduleDayResDto getMyScheduleDay(Long ScheduleId, int day) {
        ScheduleDayResDto scheduleDayResDto = scheduleRepository.getScheduleDayResDto(ScheduleId, day).orElseThrow(ScheduleDayNotFoundException::new);
        return scheduleDayResDto;
    }

    @Override
    public Long runAndStopSchedule(ScheduleRunReqDto scheduleRunReqDto) {
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


}
