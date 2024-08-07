package backend.hanpum.domain.course.dto.requestDto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseReviewReqDto {
    private String content;
    private Double score;

    @Schema(description = "리뷰 수정시에만 사용")
    private Long reviewId;
}