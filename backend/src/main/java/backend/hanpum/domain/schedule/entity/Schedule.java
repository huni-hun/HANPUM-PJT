package backend.hanpum.domain.schedule.entity;

import backend.hanpum.domain.course.entity.Course;
import backend.hanpum.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

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

    @Column
    private String title;

    @Column(name = "type")
    private String type;

    @Column(name = "date")
    private String date;

    @Setter
    @Builder.Default
    @Column(name = "state")
    private boolean state = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

  // 경로 하나에 일정이 여러개 있어야 할듯 -> member 컬럼이 있으니
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;
}
