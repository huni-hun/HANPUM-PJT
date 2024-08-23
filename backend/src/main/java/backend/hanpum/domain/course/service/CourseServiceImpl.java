package backend.hanpum.domain.course.service;

import backend.hanpum.config.s3.S3ImageService;
import backend.hanpum.domain.course.dto.requestDto.*;
import backend.hanpum.domain.course.dto.responseDto.*;
import backend.hanpum.domain.course.entity.*;
import backend.hanpum.domain.course.enums.CourseTypes;
import backend.hanpum.domain.course.repository.*;
import backend.hanpum.domain.member.entity.Member;
import backend.hanpum.domain.member.repository.MemberRepository;
import backend.hanpum.exception.exception.auth.MemberNotFoundException;
import backend.hanpum.exception.exception.common.JsonBadMappingException;
import backend.hanpum.exception.exception.common.JsonBadProcessingException;
import backend.hanpum.exception.exception.common.UriBadSyntaxException;
import backend.hanpum.exception.exception.course.CourseDayNotFoundException;
import backend.hanpum.exception.exception.course.CourseListNotFoundException;
import backend.hanpum.exception.exception.course.CourseNotFoundException;
import backend.hanpum.exception.exception.course.CourseReviewsNotFoundException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final CourseTypeRepository courseTypeRepository;
    private final InterestCourseRepository interestCourseRepository;
    private final MemberRepository memberRepository;
    private final ReviewRepository reviewRepository;
    private final CourseDayRepository courseDayRepository;
    private final AttractionRepository attractionRepository;
    private final WaypointRepository waypointRepository;
    private final CourseUsageHistoryRepository courseUsageHistoryRepository;
    private final S3ImageService s3ImageService;
    
    private static final List<String> SIDO_LIST = Arrays.asList(
            "서울", "부산", "대구", "인천", "광주",
            "대전", "울산", "세종특별자치시", "경기", "강원특별자치도",
            "충북", "충남", "전북특별자치도", "전남", "경북", "경남", "제주특별자치도"
    );

    @Value("${api.serviceKey}")
    private String serviceKey;

    @Value("${api.kakaoAppKey}")
    private String kakaoAppKey;

    @Override
    @Transactional(readOnly = true)
    public CourseListMapResDto getCourseList(CourseTypes targetCourse, Double maxDistance, Integer maxDays, List<CourseTypes> selectedTypes, String keyword, Pageable pageable) {
        CourseListMapResDto courseListMapResDto = courseRepository.getCourseList(targetCourse, maxDistance, maxDays, selectedTypes, keyword, pageable).orElseThrow(CourseListNotFoundException::new);

        return courseListMapResDto;
    }

    @Override
    @Transactional
    public void makeCourse(MakeCourseReqDto makeCourseReqDto) {
        Double allDayDistance = 0.0;
        for (CourseDayReqDto courseDayReqDto : makeCourseReqDto.getCourseDayReqDtoList()) {
            for (WayPointReqDto waypointReqDto : courseDayReqDto.getWayPointReqDtoList()) {
                allDayDistance += Double.parseDouble(waypointReqDto.getDistance());
            }
        }

        String startPoint = extractSido(makeCourseReqDto.getCourseDayReqDtoList().stream()
                .findFirst()
                .flatMap(courseDayReqDto -> courseDayReqDto.getWayPointReqDtoList().stream().findFirst())
                .map(WayPointReqDto::getAddress)
                .orElse("Unknown"));

        String endPoint = extractSido(makeCourseReqDto.getCourseDayReqDtoList().stream()
                .reduce((first, second) -> second)
                .flatMap(courseDayReqDto -> courseDayReqDto.getWayPointReqDtoList().stream().reduce((first, second) -> second))
                .map(WayPointReqDto::getAddress)
                .orElse("Unknown"));
        
        Date currentDate = new Date();
        Course course = Course.builder()
                .courseName(makeCourseReqDto.getCourseName())
                .content(makeCourseReqDto.getContent())
                .openState(makeCourseReqDto.isOpenState())
                .writeState(makeCourseReqDto.isWriteState())
                .writeDate(currentDate)
                .startPoint(startPoint)
                .endPoint(endPoint)
                .totalDistance(allDayDistance)
                .totalDays(makeCourseReqDto.getCourseDayReqDtoList().size())
                .member(memberRepository.findById(makeCourseReqDto.getMemberId()).orElseThrow())  // 토큰으로 멤버정보 찾도록. 추후 변경
                .build();

        if(!makeCourseReqDto.getBgImage().isEmpty()) {
            course.updateBackgroundImg(s3ImageService.uploadImage(makeCourseReqDto.getBgImage()));
        }
        courseRepository.save(course);

        for (String courseTypeName : makeCourseReqDto.getCourseTypeList()) {
            CourseType courseType = CourseType.builder()
                    .course(course)
                    .typeName(CourseTypes.valueOf(courseTypeName))
                    .build();

            courseTypeRepository.save(courseType);
        }

        for (CourseDayReqDto courseDayReqDto : makeCourseReqDto.getCourseDayReqDtoList()) {
            Double totalDistance = 0.0;
            Double totalDuration = 0.0;
            Double totalCalorie = 0.0;
            for (WayPointReqDto waypointReqDto : courseDayReqDto.getWayPointReqDtoList()) {
                        totalDistance += Double.parseDouble(waypointReqDto.getDistance());
                        totalDuration += Double.parseDouble(waypointReqDto.getDuration());
                        totalCalorie += Double.parseDouble(waypointReqDto.getCalorie());
            }

            CourseDay courseDay = CourseDay.builder()
                    .course(course)
                    .dayNumber(courseDayReqDto.getDayNumber())
                    .totalDistance(String.format("%.1f", totalDistance))
                    .totalDuration(String.format("%.1f", totalDuration))
                    .totalCalorie(String.format("%.1f", totalCalorie))
                    .build();
            courseDayRepository.save(courseDay);

            for (AttractionReqDto attractionReqDto : courseDayReqDto.getAttractionReqDtoList()) {
                Attraction attraction = Attraction.builder()
                        .courseDay(courseDay)
                        .name(attractionReqDto.getName())
                        .type(attractionReqDto.getType())
                        .address(attractionReqDto.getAddress())
                        .lat(attractionReqDto.getLat())
                        .lon(attractionReqDto.getLon())
                        .img("TEMP") // S3 미생성. 이미지 업로드 미구현. 추후 변경
                        .build();
                attractionRepository.save(attraction);
            }

            for (WayPointReqDto waypointReqDto : courseDayReqDto.getWayPointReqDtoList()) {
                Waypoint waypoint = Waypoint.builder()
                        .courseDay(courseDay)
                        .type(waypointReqDto.getType())
                        .name(waypointReqDto.getName())
                        .address(waypointReqDto.getAddress())
                        .lat(waypointReqDto.getLat())
                        .lon(waypointReqDto.getLon())
                        .pointNumber(waypointReqDto.getPointNumber())
                        .distance(waypointReqDto.getDistance())
                        .duration(waypointReqDto.getDuration())
                        .calorie(waypointReqDto.getCalorie())
                        .build();
                waypointRepository.save(waypoint);
            }
        }
    }

    public static String extractSido(String address) {
        System.out.println(address);

        return SIDO_LIST.stream()
                .filter(address::contains)
                .findFirst()
                .orElse("필터링 실패");
    }

    @Override
    @Transactional
    public void editCourse(EditCourseReqDto editCourseReqDto) {
        Course course = courseRepository.findById(editCourseReqDto.getCourseId()).orElseThrow(CourseNotFoundException::new);

        String startPoint = extractSido(editCourseReqDto.getCourseDayReqDtoList().stream()
                .findFirst()
                .flatMap(courseDayReqDto -> courseDayReqDto.getWayPointReqDtoList().stream().findFirst())
                .map(WayPointReqDto::getAddress)
                .orElse("Unknown"));

        String endPoint = extractSido(editCourseReqDto.getCourseDayReqDtoList().stream()
                .reduce((first, second) -> second)
                .flatMap(courseDayReqDto -> courseDayReqDto.getWayPointReqDtoList().stream().reduce((first, second) -> second))
                .map(WayPointReqDto::getAddress)
                .orElse("Unknown"));

        course.updateCourse(
                editCourseReqDto.getCourseName(),
                editCourseReqDto.getContent(),
                editCourseReqDto.isOpenState(),
                editCourseReqDto.isWriteState(),
                startPoint,
                endPoint,
                editCourseReqDto.getCourseDayReqDtoList().size()
        );

        if(editCourseReqDto.getBgImage() != null) {
            String currentImage = course.getBackgroundImg();
            String updateImage = s3ImageService.uploadImage(editCourseReqDto.getBgImage());
            course.updateBackgroundImg(updateImage);
            s3ImageService.deleteImage(currentImage);
        }

        List<CourseType> courseTypeList = courseTypeRepository.findByCourse_courseId(editCourseReqDto.getCourseId());
        List<String> existCourseTypeNameList = courseTypeList.stream()
                .map(courseType -> courseType.getTypeName().name())
                .collect(Collectors.toList());
        List<String> newCourseTypeNameList = editCourseReqDto.getCourseTypeList();
        for (int i = 0; i < existCourseTypeNameList.size(); i++) {
            if(!newCourseTypeNameList.contains(existCourseTypeNameList.get(i))) {
                courseTypeRepository.delete(courseTypeList.get(i));
            }
        }

        for (int i = 0; i < newCourseTypeNameList.size(); i++) {
            if(!existCourseTypeNameList.contains(newCourseTypeNameList.get(i))) {
                CourseType courseType = CourseType.builder()
                        .course(course)
                        .typeName(CourseTypes.valueOf(newCourseTypeNameList.get(i)))
                        .build();

                courseTypeRepository.save(courseType);
            }
        }

        // CourseDay 업데이트
        Set<Integer> existDayNumbers = course.getCourseDays().stream()
                .map(CourseDay::getDayNumber)
                .collect(Collectors.toSet());

        for (CourseDayReqDto newCourseDay : editCourseReqDto.getCourseDayReqDtoList()) {
            Double totalCalorie = 0.0;
            Double totalDuration = 0.0;
            Double totalDistance = 0.0;
            for (WayPointReqDto waypointReqDto : newCourseDay.getWayPointReqDtoList()) {
                totalCalorie += Double.parseDouble(waypointReqDto.getCalorie());
                totalDuration += Double.parseDouble(waypointReqDto.getDuration());
                totalDistance += Double.parseDouble(waypointReqDto.getDistance());
            }

            if (existDayNumbers.contains(newCourseDay.getDayNumber())) {
                CourseDay existDay = course.getCourseDays().stream()
                        .filter(exDay -> exDay.getDayNumber().equals(newCourseDay.getDayNumber()))
                        .findFirst().orElseThrow();
                updateCourseDay(existDay, newCourseDay, totalCalorie, totalDuration, totalDistance);
            } else {
                CourseDay newDay = CourseDay.builder()
                        .dayNumber(newCourseDay.getDayNumber())
                        .course(course)
                        .totalDistance(String.format("%.1f", totalDistance))
                        .totalDuration(String.format("%.1f", totalDuration))
                        .totalCalorie(String.format("%.1f", totalCalorie))
                        .build();
                course.getCourseDays().add(newDay);
            }
            existDayNumbers.remove(newCourseDay.getDayNumber());
        }

        for (CourseDay courseDay : course.getCourseDays()) {
            if(existDayNumbers.contains(courseDay.getDayNumber())) {
                courseDayRepository.delete(courseDay);
            }
        }
        course.getCourseDays().removeIf(day -> existDayNumbers.contains(day.getDayNumber()));
        courseRepository.save(course);
    }

    private void updateCourseDay(CourseDay existDay, CourseDayReqDto newDay, Double totalCalorie, Double totalDuration, Double totalDistance) {
        // CourseDay 정보 업데이트
        existDay.updateCourseDayTotal(String.format("%.1f", totalCalorie), String.format("%.1f", totalDuration), String.format("%.1f", totalDistance));

        // Attraction 업데이트
        Set<String> existAttractionName = existDay.getAttractions().stream()
                .map(Attraction::getName)
                .collect(Collectors.toSet());

        for (AttractionReqDto newAttraction : newDay.getAttractionReqDtoList()) {
            if (existAttractionName.contains(newAttraction.getName())) {
                Attraction existAttraction = existDay.getAttractions().stream()
                        .filter(attraction -> attraction.getName().equals(newAttraction.getName()))
                        .findFirst().orElseThrow();

                existAttraction.updateAttraction(newAttraction.getName(),
                        newAttraction.getType(),
                        newAttraction.getAddress(),
                        newAttraction.getLat(),
                        newAttraction.getLon());

                if(newAttraction.getImage() != null) {
                    // S3 image update 로직
                }
            } else {
                Attraction attraction = Attraction.builder()
                        .courseDay(existDay)
                        .name(newAttraction.getName())
                        .type(newAttraction.getType())
                        .address(newAttraction.getAddress())
                        .lat(newAttraction.getLat())
                        .lon(newAttraction.getLon())
                        .img("TEMP") // S3 미생성. 이미지 업로드 미구현. 추후 변경
                        .build();

                existDay.getAttractions().add(attraction);
            }
            existAttractionName.remove(newAttraction.getName());
        }

        for (Attraction attraction : existDay.getAttractions()) {
            if(existAttractionName.contains(attraction.getName())) {
                attractionRepository.delete(attraction);
            }
        }
        existDay.getAttractions().removeIf(attraction -> existAttractionName.contains(attraction.getName()));

        // Waypoint 업데이트
        Set<String> existPointNumber = existDay.getWaypoints().stream()
                .map(Waypoint::getPointNumber)
                .collect(Collectors.toSet());

        for (WayPointReqDto newWaypoint : newDay.getWayPointReqDtoList()) {
            if (existPointNumber.contains(newWaypoint.getPointNumber())) {
                Waypoint existWaypoint = existDay.getWaypoints().stream()
                        .filter(waypoint -> waypoint.getPointNumber().equals(newWaypoint.getPointNumber()))
                        .findFirst().orElseThrow();

                existWaypoint.updateWayPoint(newWaypoint.getType(),
                        newWaypoint.getName(),
                        newWaypoint.getAddress(),
                        newWaypoint.getLat(),
                        newWaypoint.getLon(),
                        newWaypoint.getPointNumber(),
                        newWaypoint.getDistance(),
                        newWaypoint.getDuration(),
                        newWaypoint.getCalorie());
            } else {
                Waypoint waypoint = Waypoint.builder()
                        .courseDay(existDay)
                        .type(newWaypoint.getType())
                        .name(newWaypoint.getName())
                        .address(newWaypoint.getAddress())
                        .lat(newWaypoint.getLat())
                        .lon(newWaypoint.getLon())
                        .pointNumber(newWaypoint.getPointNumber())
                        .distance(newWaypoint.getDistance())
                        .duration(newWaypoint.getDuration())
                        .calorie(newWaypoint.getCalorie())
                        .build();

                existDay.getWaypoints().add(waypoint);
            }

            existPointNumber.remove(newWaypoint.getPointNumber());
        }

        for (Waypoint waypoint : existDay.getWaypoints()) {
            if(existPointNumber.contains(waypoint.getPointNumber())) {
                waypointRepository.delete(waypoint);
            }
        }
        existDay.getWaypoints().removeIf(waypoint -> existPointNumber.contains(waypoint.getPointNumber()));
    }

    @Override
    public void deleteCourse(Long memberId, Long courseId) {
        Course course;
        course = courseRepository.findByMember_MemberIdAndCourseId(memberId, courseId).orElseThrow(CourseNotFoundException::new);
        if (course.getBackgroundImg() != null) {
            // S3 이미지 삭제 로직
        }
        courseRepository.delete(course);
    }

    @Override
    @Transactional(readOnly = true)
    public CourseDetailResDto getCourseDetail(Long courseId) {
        CourseDetailResDto courseDetailResDto = courseRepository.getCourseDetailByCourseId(courseId).orElseThrow(CourseNotFoundException::new);
        return courseDetailResDto;
    }

    @Override
    @Transactional(readOnly = true)
    public GetCourseDayResDto getCourseDay(Long courseId, Integer day) {
        GetCourseDayResDto getCourseDayResDto = courseRepository.getCourseDayByCourseIdAndDay(courseId, day).orElseThrow(CourseDayNotFoundException::new);
        return getCourseDayResDto;
    }

    @Override
    @Transactional
    public void addInterestCourse(Long courseId, Long memberId) {
//        Member member = memberRepository.findByMemberId(memberId).orElse(null);
        Course course = courseRepository.findById(courseId).orElseThrow(CourseNotFoundException::new);
        InterestCourse interestCourse = InterestCourse.builder()
//                .member(member)
                .course(course)
                .build();

        interestCourseRepository.save(interestCourse);
    }

    @Override
    @Transactional
    public void deleteInterestCourse(Long courseId, Long memberId) {
        interestCourseRepository.deleteByMember_MemberIdAndCourse_CourseId(courseId, memberId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CourseReviewResDto> getCourseReviews(Long courseId, Pageable pageable) {
        List<CourseReviewResDto> courseReviewResDtoList = new ArrayList<>();
        List<Review> ReviewList = reviewRepository.findByCourse_CourseId(courseId, pageable);

        if(ReviewList.isEmpty()) {
            throw new CourseReviewsNotFoundException();
        } else {
            for(Review review : ReviewList) {
                CourseReviewResDto courseReviewResDto = CourseReviewResDto.builder()
                        .reviewId(review.getReviewId())
                        .courseId(review.getCourse().getCourseId())
                        .memberNickname(review.getMember().getNickname())
                        .content(review.getContent())
                        .score(review.getScore())
                        .writeDate(review.getWriteDate())
                        .like(review.getLikeCount())
                        .build();
                courseReviewResDtoList.add(courseReviewResDto);
            }
        }

        return courseReviewResDtoList;
    }

    @Override
    @Transactional
    public void writeCourseReview(Long courseId, String content, Double score) {
//        Review review = reviewRepository.findByCourse_CourseIdAndMember_MemberId(courseId, memberId);
//        if(review != null) {
//            // 리뷰 1회 작성 가능?
//        }

        Course course = courseRepository.findById(courseId).orElseThrow(CourseNotFoundException::new);
//      Member member = memberRepository.findMemberByLoginId(memberId);

        Date currentDate = new Date();
        Review review = Review.builder()
                .content(content)
                .score(score)
                .writeDate(currentDate)
                .likeCount(0)
//                .member(member)
                .course(course)
                .build();

        reviewRepository.save(review);
    }

    @Override
    @Transactional
    public void editCourseReview(Long reviewId, String content, Double score) {
        Review review = reviewRepository.findById(reviewId).orElseThrow(CourseReviewsNotFoundException::new);

        Date currentDate = new Date();
        review = Review.builder()
                .reviewId(reviewId)
                .content(content)
                .score(score)
                .writeDate(currentDate) // 작성일? 수정일?
                .likeCount(review.getLikeCount())
                .member(review.getMember())
                .course(review.getCourse())
                .build();

        reviewRepository.save(review);
    }

    @Override
    @Transactional
    public void deleteCourseReview(Long courseId) {
//        reviewRepository.deleteByCourse_CourseIdAndMember_MemberId(courseId, memberId);
    }

    @Override
    @Transactional
    public void addCourseUsageHistory(Long courseId, Long memberId) {
        Course course = courseRepository.findById(courseId).orElseThrow(CourseNotFoundException::new);
        Member member = memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);

        Date currentDate = new Date();
        CourseUsageHistory courseUsageHistory = CourseUsageHistory.builder()
                .startDate(currentDate)
                .endDate(null)
                .useFlag(true)
                .achieveRate(0.0)
                .course(course)
                .member(member)
                .build();

        courseUsageHistoryRepository.save(courseUsageHistory);
    }

    @Override
    @Transactional
    public void updateCourseUsageHistory(Long courseId, Long memberId, Double achieveRate) {
        CourseUsageHistory courseUsageHistory = courseUsageHistoryRepository.findByCourse_courseIdAndMember_memberId(courseId, memberId);

        Date currentDate = new Date();
        courseUsageHistory.updateHistoryState(currentDate, false, achieveRate);
    }

    @Override
    public List<AttractionResDto> searchAttractionsByKeyword(String keyword, Integer contentType) {
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<?> entity = new HttpEntity<>(new HttpHeaders());

        String BASE_URL = "https://apis.data.go.kr/B551011/KorService1";
        String url = UriComponentsBuilder.fromHttpUrl(BASE_URL + "/searchKeyword1")
                .queryParam("serviceKey", serviceKey)
                .queryParam("numOfRows", 10)
                .queryParam("pageNo", 1)
                .queryParam("MobileOS", "ETC")
                .queryParam("MobileApp", "HANPUM")
                .queryParam("_type", "json")
                .queryParam("listYN", "Y")
                .queryParam("arrange", "O")
                .queryParam("keyword", keyword)
                .queryParam("contentTypeId", contentType)
                .toUriString();

        URI uri = null;
        try {
            uri = new URI(url);
        } catch (URISyntaxException e) {
            throw new UriBadSyntaxException();
        }

        ResponseEntity<String> resultMap = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode root = null;
        try {
            root = objectMapper.readTree(resultMap.getBody());
        } catch (JsonMappingException e) {
            throw new JsonBadMappingException();
        } catch (JsonProcessingException e) {
            throw new JsonBadProcessingException();
        }

        JsonNode items = root.path("response").path("body").path("items").path("item");
        List<AttractionResDto> attractions = new ArrayList<>();
        if (items.isArray()) {
            for (JsonNode item : items) {
                AttractionResDto attraction = AttractionResDto.builder()
                        .attractionId(null)
                        .name(item.path("title").asText())
                        .type(item.path("contenttypeid").asText())
                        .address(item.path("addr1").asText())
                        .lat(Double.parseDouble(item.path("mapx").asText()))
                        .lon(Double.parseDouble(item.path("mapy").asText()))
                        .img(item.path("firstimage").asText())
                        .build();
                attractions.add(attraction);
            }
        }

        return attractions;
    }

    @Override
    public List<SearchWaypointResDto> searchWaypointByKeyword(String keyword) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "KakaoAK " + kakaoAppKey);
        HttpEntity<?> entity = new HttpEntity<>("", headers);

        String BASE_URL = "https://dapi.kakao.com/v2/local";
        String url = UriComponentsBuilder.fromHttpUrl(BASE_URL + "/search/keyword.json")
                .queryParam("query", keyword)
                .toUriString();

        URI uri = null;
        try {
            uri = new URI(url);
        } catch (URISyntaxException e) {
            throw new UriBadSyntaxException();
        }

        ResponseEntity<String> resultMap = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode root = null;
        try {
            root = objectMapper.readTree(resultMap.getBody());
        } catch (JsonMappingException e) {
            throw new JsonBadMappingException();
        } catch (JsonProcessingException e) {
            throw new JsonBadProcessingException();
        }

        List<SearchWaypointResDto> result = new ArrayList<>();
        JsonNode documents = root.path("documents");
        for(JsonNode document : documents) {
            result.add(SearchWaypointResDto.builder()
                    .placeName(document.path("place_name").asText())
                    .address(document.path("address_name").asText())
                    .lat(Double.parseDouble(document.path("x").asText()))
                    .lon(Double.parseDouble(document.path("y").asText()))
                    .phone("phone")
                    .build());
        }

        return result;
    }

    @Override
    public List<MultiWaypointSearchResDto> searchMultiWaypointCourse(List<MultiWaypointSearchReqDto> multiWaypointSearchReqDtoList) {
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper objectMapper = new ObjectMapper();

        MultiWaypointSearchReqDto origin = multiWaypointSearchReqDtoList.get(0);
        MultiWaypointSearchReqDto destination = multiWaypointSearchReqDtoList.get(multiWaypointSearchReqDtoList.size() - 1);
        List<MultiWaypointSearchReqDto> waypoints = multiWaypointSearchReqDtoList.subList(1, multiWaypointSearchReqDtoList.size() - 1);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("origin", origin);
        requestBody.put("destination", destination);
        requestBody.put("waypoints", waypoints);
        requestBody.put("avoid", new String[]{"toll", "motorway", "uturn", "ferries"});
        requestBody.put("car_types", 7);

        String jsonBody = null;
        try {
            jsonBody = objectMapper.writeValueAsString(requestBody);
        } catch (JsonProcessingException e) {
            throw new JsonBadProcessingException();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "KakaoAK " + kakaoAppKey);
        HttpEntity<?> entity = new HttpEntity<>(jsonBody, headers);

        if (multiWaypointSearchReqDtoList == null || multiWaypointSearchReqDtoList.size() < 2) {
            throw new IllegalArgumentException("dtoList must contain at least origin and destination");
        }

        String BASE_URL = "https://apis-navi.kakaomobility.com/v1";
        ResponseEntity<String> resultMap = restTemplate.exchange(BASE_URL + "/waypoints/directions", HttpMethod.POST, entity, String.class);

        JsonNode root = null;
        try {
            root = objectMapper.readTree(resultMap.getBody());
        } catch (JsonMappingException e) {
            throw new JsonBadMappingException();
        } catch (JsonProcessingException e) {
            throw new JsonBadProcessingException();
        }

        List<MultiWaypointSearchResDto> multiWaypointSearchResDtoList = new ArrayList<>();
        JsonNode routesNode = root.path("routes").get(0);
        for (JsonNode sectionNode : routesNode.path("sections")) {
            List<Double> Vertexes = new ArrayList<>();
            String sectionDistance = sectionNode.path("distance").asText();

            for (JsonNode roadNode : sectionNode.path("roads")) {
                JsonNode vertexesNode = roadNode.path("vertexes");
                for (int i = 0; i < vertexesNode.size(); i++) {
                    Vertexes.add(vertexesNode.get(i).asDouble());
                }
            }
            MultiWaypointSearchResDto multiWaypointSearchResDto = new MultiWaypointSearchResDto();
            multiWaypointSearchResDtoList.add(multiWaypointSearchResDto.builder()
                    .distance(sectionDistance)
                    .vertexes(Vertexes)
                    .build());
        }

        return multiWaypointSearchResDtoList;
    }

}
