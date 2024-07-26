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
public class CourseResDto {
    Long courseId;
    String courseName;
    String backgroundImg;
    String content;
    boolean writeState;
    boolean openState;
    Date writeDate;
    Long memberId;
}
