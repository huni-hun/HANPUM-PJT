package backend.hanpum.domain.course.entity;

import backend.hanpum.domain.schedule.entity.ScheduleWayPoint;
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
    private Double lat;

    @Column(name = "lon")
    private Double lon;

    @Column(name = "point_number", length = 2)
    private String pointNumber;

    @Column(name = "distance", length = 10)
    private String distance;

    @Column(name = "duration", length = 10)
    private String duration;

    @Column(name = "calorie", length = 10)
    private String calorie;

    @Column(name = "polyline", columnDefinition = "TEXT")
    private String polyline;

    @OneToMany(mappedBy = "waypoint", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ScheduleWayPoint> scheduleWayPointList = new ArrayList<>();

    public Waypoint(Long waypointId, String type, String name, String address,
                    Double lat, Double lon, String pointNumber, String distance,
                    String duration, String calorie, String polyline) {
        this.waypointId = waypointId;
        this.type = type;
        this.name = name;
        this.address = address;
        this.lat = lat;
        this.lon = lon;
        this.pointNumber = pointNumber;
        this.distance = distance;
        this.duration = duration;
        this.calorie = calorie;
        this.polyline = polyline;
    }

    public void updateWayPoint(String type, String name, String address, Double lat, Double lon, String pointNumber, String distance, String duration, String calorie, String polyline) {
        this.type = type;
        this.name = name;
        this.address = address;
        this.lat = lat;
        this.lon = lon;
        this.pointNumber = pointNumber;
        this.distance = distance;
        this.duration = duration;
        this.calorie = calorie;
        this.polyline = polyline;
    }
}
