package backend.hanpum.domain.schedule.entity;

import backend.hanpum.domain.course.entity.Waypoint;
import backend.hanpum.exception.exception.schedule.BadScheduleStateUpdateRequestException;
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
    private Long id;

    @Builder.Default
    @Column(name = "state")
    private int state = 0;      // 방문 전 0, 진행중 1, 방문완료 2

    @ManyToOne(fetch = FetchType.LAZY)
    private Waypoint waypoint;

    @ManyToOne(fetch = FetchType.LAZY)
    private ScheduleDay scheduleDay;

    @OneToMany(mappedBy = "scheduleWayPoint")
    private List<Memo> memoList = new ArrayList<>();

    public void updateVisit(int nowState) {
        if (nowState < 0 || nowState > 2) {
            throw new BadScheduleStateUpdateRequestException();
        }
        this.state = nowState;
    }


}
