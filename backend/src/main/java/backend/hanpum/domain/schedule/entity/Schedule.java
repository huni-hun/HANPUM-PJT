package backend.hanpum.domain.schedule.entity;

import backend.hanpum.domain.course.entity.Course;
import backend.hanpum.domain.group.entity.Group;
import backend.hanpum.domain.member.entity.Member;
import backend.hanpum.exception.exception.schedule.BadScheduleStateUpdateRequestException;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    private Long id;

    @Column(name = "type")
    private String type;

    @Column(name = "start_date")
    private String startDate;

    @Column(name = "end_date")
    private String endDate;

    @Builder.Default
    @Column(name = "state")
    private int state = 0;      // 진행전 : 0, 진행중 : 1, 진행 후 : 2

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    // 경로 하나에 일정이 여러개 있어야 할듯 -> member 컬럼이 있으니
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    @OneToMany(mappedBy = "schedule", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ScheduleDay> scheduleDayList = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    private Group group;

    public void updateState(int state) {
        if (state < 0 || state > 2) {
            throw new BadScheduleStateUpdateRequestException();
        }
        this.state = state;
    }

    public void modifyDate(String startDate, String endDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
