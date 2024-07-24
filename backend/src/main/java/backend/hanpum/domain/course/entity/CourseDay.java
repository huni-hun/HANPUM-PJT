package backend.hanpum.domain.course.entity;

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
    private String total_distance;

    @Column(name = "total_duration", length = 10)
    private String total_duration;

    @Column(name = "total_calorie", length = 20)
    private String total_calorie;

    @Builder.Default
    @OneToMany(mappedBy = "courseDay", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Attraction> attractions = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "courseDay", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Waypoint> waypoints = new ArrayList<>();
}
