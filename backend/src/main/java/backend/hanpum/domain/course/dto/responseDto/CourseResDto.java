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
    String startPoint;
    String endPoint;
    Double totalDistance;
    Long memberId;
    List<CourseTypes> courseTypes;
    Double scoreAvg;
    Integer commentCnt;
    Integer totalDays;
    boolean interestFlag;

    public CourseResDto(Long courseId, String courseName, String backgroundImg,
                        Date writeDate, String startPoint, String endPoint, Double totalDistance, Long memberId, Double scoreAvg, Integer totalDays) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.backgroundImg = backgroundImg;
        this.writeDate = writeDate;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.totalDistance = totalDistance;
        this.memberId = memberId;
        this.scoreAvg = scoreAvg;
        this.totalDays = totalDays;
    }

    public CourseResDto(Long courseId, String courseName, String backgroundImg, String content, boolean writeState,
                        boolean openState, Date writeDate, String startPoint, String endPoint, Double totalDistance, Long memberId) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.backgroundImg = backgroundImg;
        this.content = content;
        this.writeState = writeState;
        this.openState = openState;
        this.writeDate = writeDate;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.totalDistance = totalDistance;
        this.memberId = memberId;
    }

    public CourseResDto(Long courseId, String courseName, String backgroundImg, String content, boolean writeState,
                        boolean openState, Date writeDate, String startPoint, String endPoint, Double totalDistance, Long memberId, Double scoreAvg, Integer commentCnt, Integer totalDays) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.backgroundImg = backgroundImg;
        this.content = content;
        this.writeState = writeState;
        this.openState = openState;
        this.writeDate = writeDate;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.totalDistance = totalDistance;
        this.memberId = memberId;
        this.scoreAvg = scoreAvg;
        this.commentCnt = commentCnt;
        this.totalDays = totalDays;
    }

    public void setCourseTypes(List<CourseTypes> courseTypes) {
        this.courseTypes = courseTypes;
    }
    public void setInterestFlag(boolean interestFlag) {
        this.interestFlag = interestFlag;
    }
}
