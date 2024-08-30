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
public class UsedCourseResDto {
    Long courseUsedId;
    Long courseId;
    Date startDate;
    Date endDate;
    boolean useFlag;
    String courseName;
    String startPoint;
    String endPoint;
    String backgroundImg;
    int progressRate;
}
