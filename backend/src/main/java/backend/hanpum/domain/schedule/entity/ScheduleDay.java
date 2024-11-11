package backend.hanpum.domain.schedule.entity;

import backend.hanpum.domain.course.entity.CourseDay;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ScheduleDay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_day_id")
    private Long id;

    @Column(name = "date")
    private String date;

    @Builder.Default
    @Column(name = "visit")
    private boolean visit = false;

    @Builder.Default
    @Column(name = "running")
    private boolean running = false;

    @ManyToOne(fetch = FetchType.LAZY)
    private CourseDay courseDay;

    @ManyToOne(fetch = FetchType.LAZY)
    private Schedule schedule;

    @OneToMany(mappedBy = "scheduleDay", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ScheduleWayPoint> scheduleWayPointList = new ArrayList<>();

    public void visitState(){
        this.visit = true;
    }

    public void runAndStop(){
        this.running = !this.running;
    }

    public void modifyDate(String date){
        this.date = date;
    }
}
