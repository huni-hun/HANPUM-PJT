package backend.hanpum.domain.course.dto.responseDto;

import backend.hanpum.domain.course.enums.CourseTypes;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

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
    List<CourseTypes> courseTypes;
    Float scoreAvg;
    Integer commentCnt;

    public CourseResDto(Long courseId, String courseName, String backgroundImg, String content, boolean writeState,
                        boolean openState, Date writeDate, Long memberId) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.backgroundImg = backgroundImg;
        this.content = content;
        this.writeState = writeState;
        this.openState = openState;
        this.writeDate = writeDate;
        this.memberId = memberId;
    }

    public void setCourseTypes(List<CourseTypes> courseTypes) {
        this.courseTypes = courseTypes;
    }
}
