package backend.hanpum.domain.schedule.entity;

import backend.hanpum.domain.course.entity.Waypoint;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleWayPoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_waypoint_id")
    private Long scheduleWayPointId;

    @ManyToOne(fetch = FetchType.LAZY)
    private Waypoint waypoint;

    @ManyToOne(fetch = FetchType.LAZY)
    private ScheduleDay scheduleDay;

    @OneToMany(mappedBy = "scheduleWayPoint")
    private List<Memo> memoList = new ArrayList<>();

}
