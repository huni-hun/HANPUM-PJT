package backend.hanpum.domain.course.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Waypoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "waypoint_id")
    private Long waypointId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "course_id", referencedColumnName = "course_id"),
            @JoinColumn(name = "day_number", referencedColumnName = "day_number")
    })
    private CourseDay courseDay;

    @Column(name = "type", length = 3)
    private String type;

    @Column(name = "name", length = 20)
    private String name;

    @Column(name = "address", length = 100)
    private String address;

    @Column(name = "lat")
    private Float lat;

    @Column(name = "lon")
    private Float lon;

    @Column(name = "point_number", length = 2)
    private String pointNumber;

    @Column(name = "distance", length = 10)
    private String distance;

    @Column(name = "duration", length = 10)
    private String duration;

    @Column(name = "calorie", length = 10)
    private String calorie;
}
