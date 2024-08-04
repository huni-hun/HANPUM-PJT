package backend.hanpum.domain.course.service;

import backend.hanpum.domain.course.dto.responseDto.CourseDetailResDto;
import backend.hanpum.domain.course.dto.responseDto.CourseReviewResDto;
import backend.hanpum.domain.course.dto.responseDto.GetCourseDayResDto;
import backend.hanpum.domain.course.entity.Course;
import backend.hanpum.domain.course.entity.InterestCourse;
import backend.hanpum.domain.course.entity.Review;
import backend.hanpum.domain.course.repository.CourseRepository;
import backend.hanpum.domain.course.repository.InterestCourseRepository;
import backend.hanpum.domain.course.repository.ReviewRepository;
import backend.hanpum.domain.member.repository.MemberRepository;
import backend.hanpum.exception.exception.course.CourseNotFoundException;
import backend.hanpum.exception.exception.course.CourseReviewsNotFoundException;
import backend.hanpum.exception.format.response.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final InterestCourseRepository interestCourseRepository;
    private final MemberRepository memberRepository;
    private final ReviewRepository reviewRepository;

    @Override
    @Transactional(readOnly = true)
    public CourseDetailResDto getCourseDetail(Long courseId) {
        CourseDetailResDto courseDetailResDto = courseRepository.getCourseDetailByCourseId(courseId).orElseThrow(CourseNotFoundException::new);
        return courseDetailResDto;
    }

    @Override
    @Transactional(readOnly = true)
    public GetCourseDayResDto getCourseDay(Long courseId, Integer day) {
        GetCourseDayResDto getCourseDayResDto = courseRepository.getCourseDayByCourseIdAndDay(courseId, day).orElseThrow(() -> new CourseNotFoundException(ErrorCode.COURSE_DAY_NOT_FOUND));
        return getCourseDayResDto;
    }

    @Override
    @Transactional
    public void addInterestCourse(Long courseId, Long memberId) {
//        Member member = memberRepository.findByMemberId(memberId).orElse(null);
        Course course = courseRepository.findByCourseId(courseId).orElse(null);
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
    public List<CourseReviewResDto> getCourseReviews(Long courseId) {
        List<CourseReviewResDto> courseReviewResDtoList = new ArrayList<>();
        List<Review> ReviewList = reviewRepository.findByCourse_CourseId(courseId);

        if(ReviewList.isEmpty()) {
            throw new CourseReviewsNotFoundException();
        } else {
            for(Review review : ReviewList) {
                CourseReviewResDto courseReviewResDto = CourseReviewResDto.builder()
                        .memberId(review.getMember().getMemberId())
                        .courseId(review.getCourse().getCourseId())
                        .content(review.getContent())
                        .score(review.getScore())
                        .writeDate(review.getWriteDate())
                        .like(0) // like 필드는 현재 정보가 없으므로 임의로 0 설정
                        .build();
                courseReviewResDtoList.add(courseReviewResDto);
            }
        }

        return courseReviewResDtoList;
    }


}
