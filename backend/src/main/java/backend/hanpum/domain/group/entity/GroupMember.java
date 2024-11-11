package backend.hanpum.domain.group.entity;

import backend.hanpum.domain.group.enums.JoinType;
import backend.hanpum.domain.member.entity.Member;
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
public class GroupMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_member_id", nullable = false)
    private Long groupMemberId;

    @Column(name = "join_type")
    @Enumerated(EnumType.STRING)
    private JoinType joinType;

    @Column(name = "apply_post")
    private String applyPost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id")
    private Group group;

    @OneToOne(mappedBy = "groupMember", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH},
            fetch = FetchType.LAZY, optional = false)
    private Member member;

    public void updateJoinType(JoinType joinType){
        this.joinType = joinType;
    }
}