package backend.hanpum.domain.course.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseReviewResDto {
    Long reviewId;
    Long courseId;
    String memberNickname;
    String content;
    Double score;
    Date writeDate;
    Integer like;
}
