package backend.hanpum.domain.course.dto.requestDto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EditCourseReqDto {
    private Long courseId;
    private String courseName;
    private String content;
    private boolean openState;
    private boolean writeState;
    private List<String> courseTypeList;

    // 코스 일차
    List<CourseDayReqDto> courseDayReqDtoList;
}
