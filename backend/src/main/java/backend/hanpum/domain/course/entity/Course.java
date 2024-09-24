package backend.hanpum.domain.course.entity;

import backend.hanpum.domain.member.entity.Member;
import backend.hanpum.domain.schedule.entity.Schedule;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Long courseId;

    @Column(name= "course_name", length = 30)
    private String courseName;

    @Column(name= "background_img")
    private String backgroundImg;

    @Column(name= "content", length = 100)
    private String content;

    @Column(name= "write_state")
    private boolean writeState;

    @Column(name= "open_state")
    private boolean openState;

    @Column(name= "write_date")
    @Temporal(TemporalType.DATE)
    private Date writeDate;

    @Column(name= "start_point")
    private String startPoint;

    @Column(name= "end_point")
    private String endPoint;

    @Column(name= "total_distance")
    private Double totalDistance;

    @Column(name= "total_days")
    private Integer totalDays;

    @Column(name= "delete_state")
    private boolean deleteState;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder.Default
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CourseDay> courseDays = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CourseType> courseTypes = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Schedule> schedules = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CourseUsageHistory> courseUsageHistories = new ArrayList<>();

    public void updateCourse(String courseName, String content, boolean openState, boolean writeSTate, String startPoint, String endPoint, Integer totalDays) {
        this.courseName = courseName;
        this.content = content;
        this.openState = openState;
        this.writeState = writeSTate;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.totalDays = totalDays;
    }

    public void updateCourseOpenState(boolean openState) {
        this.openState = openState;
    }

    public void updateBackgroundImg(String backgroundImg){
        this.backgroundImg = backgroundImg;
    }

    public void updateDeleteState(boolean deleteState) {
        this.deleteState = deleteState;
    }
}
