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
public class Attraction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attraction_id")
    private Long attractionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "course_id", referencedColumnName = "course_id"),
            @JoinColumn(name = "day_number", referencedColumnName = "day_number")
    })
    private CourseDay courseDay;

    @Column(name = "name", length = 30)
    private String name;

    @Column(name = "type", length = 20)
    private String type;

    @Column(name = "address", length = 100)
    private String address;

    @Column(name = "lat")
    private Double lat;

    @Column(name = "lon")
    private Double lon;

    @Column(name = "img")
    private String img;

    public void updateAttraction(String name, String type, String address, Double lat, Double lon) {
        this.name = name;
        this.type = type;
        this.address = address;
        this.lat = lat;
        this.lon = lon;
    }
}
