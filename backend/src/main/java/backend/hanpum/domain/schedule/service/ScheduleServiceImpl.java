package backend.hanpum.domain.schedule.service;

import backend.hanpum.domain.course.entity.Course;
import backend.hanpum.domain.course.entity.CourseDay;
import backend.hanpum.domain.course.entity.Waypoint;
import backend.hanpum.domain.course.repository.CourseRepository;
import backend.hanpum.domain.course.service.CourseService;
import backend.hanpum.domain.group.dto.responseDto.GroupMemberListGetResDto;
import backend.hanpum.domain.group.entity.Group;
import backend.hanpum.domain.group.repository.GroupRepository;
import backend.hanpum.domain.group.service.GroupService;
import backend.hanpum.domain.member.entity.Member;
import backend.hanpum.domain.member.repository.MemberRepository;
import backend.hanpum.domain.schedule.dto.requestDto.MemoPostReqDto;
import backend.hanpum.domain.schedule.dto.requestDto.SchedulePostReqDto;
import backend.hanpum.domain.schedule.dto.requestDto.ScheduleRunReqDto;
import backend.hanpum.domain.schedule.dto.requestDto.ScheduleStartReqDto;
import backend.hanpum.domain.schedule.dto.responseDto.*;
import backend.hanpum.domain.schedule.entity.Memo;
import backend.hanpum.domain.schedule.entity.Schedule;
import backend.hanpum.domain.schedule.entity.ScheduleDay;
import backend.hanpum.domain.schedule.entity.ScheduleWayPoint;
import backend.hanpum.domain.schedule.repository.MemoRepository;
import backend.hanpum.domain.schedule.repository.ScheduleDayRepository;
import backend.hanpum.domain.schedule.repository.ScheduleRepository;
import backend.hanpum.domain.schedule.repository.ScheduleWayPointRepository;
import backend.hanpum.domain.weather.service.WeatherService;
import backend.hanpum.exception.exception.auth.LoginInfoInvalidException;
import backend.hanpum.exception.exception.auth.MemberInfoInvalidException;
import backend.hanpum.exception.exception.common.JsonBadMappingException;
import backend.hanpum.exception.exception.common.UriBadSyntaxException;
import backend.hanpum.exception.exception.group.GroupMemberNotFoundException;
import backend.hanpum.exception.exception.group.GroupNotFoundException;
import backend.hanpum.exception.exception.schedule.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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
    private final WeatherService weatherService;
    private final RestTemplate restTemplate;
    private final GroupService groupService;
    private final CourseService courseService;

    @Value("${api.serviceKey}")
    private String serviceKey;

    @Transactional
    @Override
    public Long createSchedule(Long memberId, SchedulePostReqDto schedulePostReqDto) {

        Long courseId = schedulePostReqDto.getCourseId();

        Course course = courseRepository.findById(courseId).orElseThrow(ScheduleNotFoundException::new);
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);

        String startDate = schedulePostReqDto.getStartDate();
//        int daySize = course.getDate()
//        String endDate = calculateDate(startDate, daySize);

        Schedule schedule = Schedule.builder()
                .type("private")
                .startDate(startDate)
//                .endDate(endDate)
                .member(member)
                .course(course)
                .build();
        scheduleRepository.save(schedule);
        createScheduleDays(course, schedule, startDate);

        // history 생성
        courseService.addCourseUsageHistory(courseId, memberId);
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
                .type("group")
                .startDate(startDate)
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
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);
        List<ScheduleResDto> scheduleResDtoList = scheduleRepository.getMyScheduleByMemberId(memberId).orElseThrow(ScheduleNotFoundException::new);
        return scheduleResDtoList;
    }

    @Transactional(readOnly = true)
    @Override
    public GroupScheduleResDto getGroupScheduleList(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);
        if (member.getGroupMember() == null) {
            throw new GroupMemberNotFoundException();
        }
        Long groupId = member.getGroupMember().getGroup().getGroupId();

        ScheduleResDto scheduleResDto = scheduleRepository.getGroupScheduleByMemberId(memberId).orElseThrow(GroupScheduleNotFoundException::new);
        GroupMemberListGetResDto groupMemberListGetResDto = groupService.getGroupMemberList(memberId, groupId);

        GroupScheduleResDto groupScheduleResDto = GroupScheduleResDto.builder()
                .scheduleId(scheduleResDto.getScheduleId())
                .backgroundImg(scheduleResDto.getBackgroundImg())
                .title(scheduleResDto.getTitle())
                .type(scheduleResDto.getType())
                .startPoint(scheduleResDto.getStartPoint())
                .endPoint(scheduleResDto.getEndPoint())
                .startDate(scheduleResDto.getStartDate())
                .endDate(scheduleResDto.getEndDate())
                .state(scheduleResDto.isState())
                .groupMemberResDtoList(groupMemberListGetResDto.getGroupMemberResList())
                .build();

        return groupScheduleResDto;
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

    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    @Override
    public void activateSchedules() {
        String today = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        int updatedCount = scheduleRepository.activateScheduleForToday(today);
        if (updatedCount == 0) {
            throw new ValidScheduleNotFoundException();
        }
    }

    @Transactional(readOnly = true)
    @Override
    public ScheduleInProgressResDto getRunningSchedule(Long memberId, double lat, double lon) {

        // 진행중인 일정 정보 가져오기
        ScheduleTempResDto scheduleTempResDto = scheduleRepository.getScheduleTempResDto(memberId).orElseThrow(ValidScheduleNotFoundException::new);

        Long scheduleId = scheduleTempResDto.getScheduleId();

        // ScheduleDayResDto
        List<ScheduleDayResDto> scheduleDayResDtoList = scheduleRepository.getScheduleDayResDtoList(memberId, scheduleId).orElseThrow(ScheduleNotFoundException::new);

        // 달성률
        int rate = getScheduleGoalRate(scheduleDayResDtoList);

        ScheduleInProgressResDto result = ScheduleInProgressResDto.builder()
                .scheduleId(scheduleId)
                .startPoint(scheduleTempResDto.getStartPoint())
                .endPoint(scheduleTempResDto.getEndPoint())
                .startDate(scheduleTempResDto.getStartDate())
                .endDate(scheduleTempResDto.getEndDate())
                .totalDistance(scheduleTempResDto.getTotalDistance())
                .rate(rate)
                .scheduleDayResDtoList(scheduleDayResDtoList)
                .build();
        return result;
    }


    private int getScheduleGoalRate(List<ScheduleDayResDto> scheduleDayResDtoList) {

        int rate = 0;
        int size = scheduleDayResDtoList.size();
        int dayRate = 100 / size;

        // 첫쨰날도 방문 안했을때
        if (!scheduleDayResDtoList.get(0).isVisit()) {
            List<ScheduleWayPointResDto> scheduleWayPointResDtoList = scheduleDayResDtoList.get(0).getScheduleWayPointList();
            int wayPointSize = scheduleWayPointResDtoList.size();
            int wayPointCount = 0;
            for (ScheduleWayPointResDto scheduleWayPointResDto : scheduleWayPointResDtoList) {
                if (scheduleWayPointResDto.isVisit()) {
                    wayPointCount++;
                }
            }
            rate = dayRate * (wayPointCount / wayPointSize);
            return rate;
        }

        int dayCount = 0;
        for (ScheduleDayResDto scheduleDayResDto : scheduleDayResDtoList) {
            if (scheduleDayResDto.isVisit()) {
                dayCount++;
            } else {
                List<ScheduleWayPointResDto> scheduleWayPointResDtoList = scheduleDayResDto.getScheduleWayPointList();
                int wayPointSize = scheduleWayPointResDtoList.size();
                int wayPointCount = 0;
                for (ScheduleWayPointResDto scheduleWayPointResDto : scheduleWayPointResDtoList) {
                    if (scheduleWayPointResDto.isVisit()) {
                        wayPointCount++;
                    }
                }
                rate += dayRate * (wayPointCount / wayPointSize);
            }
        }

        if (dayCount == size) {
            return 100;
        }

        rate += (dayCount * dayRate);

        return rate;
    }

    @Override
    public List<NearByAttractionResDto> getNearByAttractionList(String OS, int distance, double lat, double lon) {
        String url = new StringBuilder("https://apis.data.go.kr/B551011/KorService1/locationBasedList1")
                .append("?numOfRows=10")
                .append("&pageNo=1")
                .append("&MobileOS=").append(OS)
                .append("&MobileApp=HANPUM")
                .append("&_type=JSON")
                .append("&arrange=O")
                .append("&mapX=").append(lon)
                .append("&mapY=").append(lat)
                .append("&radius=").append(distance)
                .append("&contentTypeId=12")
                .append("&serviceKey=").append(serviceKey)
                .toString();

        try {
            URI uri = new URI(url);
            ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
            return parseAttractionResponse(response.getBody());
        } catch (NearByAttractionNotFoundException e) {
            throw e;
        } catch (JsonBadMappingException e) {
            throw e;
        } catch (Exception e) {
            throw new UriBadSyntaxException();
        }
    }

    private List<NearByAttractionResDto> parseAttractionResponse(String responseBody) {
        List<NearByAttractionResDto> attractions = new ArrayList<>();
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode root = objectMapper.readTree(responseBody);
            JsonNode items = root.path("response").path("body").path("items").path("item");

            if (items.size() == 0) {
                throw new NearByAttractionNotFoundException();
            }

            if (items.isArray()) {  // items가 배열인지 확인
                for (JsonNode item : items) {
                    NearByAttractionResDto attraction = NearByAttractionResDto.builder()
                            .title(item.path("title").asText())
                            .address(item.path("addr1").asText())
                            .tel(item.path("tel").asText())
                            .image1(item.path("firstimage").asText())
                            .lat(item.path("mapy").asDouble())
                            .lon(item.path("mapx").asDouble())
                            .build();  // Builder 패턴으로 객체 생성

                    attractions.add(attraction);  // 생성된 객체를 리스트에 추가
                }
            }

            return attractions;
        } catch (NearByAttractionNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new JsonBadMappingException();
        }
    }
}
