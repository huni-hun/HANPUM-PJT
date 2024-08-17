package backend.hanpum.domain.group.entity;

import backend.hanpum.domain.schedule.entity.Schedule;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "groups")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_id", nullable = false)
    private Long groupId;

    @Column(name = "title")
    private String title;

    @Column(name = "group_img")
    private String groupImg;

    @Column(name = "description")
    private String description;

    @Column(name = "recruitment_count")
    private int recruitmentCount;

    @Column(name = "recruitment_period")
    @Temporal(TemporalType.DATE)
    private Date recruitmentPeriod;

    @Builder.Default
    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<GroupMember> groupMemberList = new ArrayList<>();

    // 일정 추가
    @OneToOne(mappedBy = "group", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Schedule schedule;
}
