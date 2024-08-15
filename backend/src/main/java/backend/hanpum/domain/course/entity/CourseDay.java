package backend.hanpum.domain.course.entity;

import backend.hanpum.domain.schedule.entity.ScheduleDay;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@IdClass(CourseDayId.class)
public class CourseDay {

    @Id
    @Column(name = "day_number")
    private Integer dayNumber;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    @Column(name = "total_distance", length = 10)
    private String totalDistance;

    @Column(name = "total_duration", length = 10)
    private String totalDuration;

    @Column(name = "total_calorie", length = 20)
    private String totalCalorie;

    @Builder.Default
    @OneToMany(mappedBy = "courseDay", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Attraction> attractions = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "courseDay", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Waypoint> waypoints = new ArrayList<>();

    @OneToMany(mappedBy = "courseDay", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ScheduleDay> scheduleDayList = new ArrayList<>();

    public void updateCourseDayTotal(String totalCalorie, String totalDuration, String totalDistance) {
        this.totalCalorie = totalCalorie;
        this.totalDistance = totalDistance;
        this.totalDuration = totalDuration;
    }
}
