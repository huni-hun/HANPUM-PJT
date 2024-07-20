package backend.hanpum.domain.course.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long reviewId;

    @Column(name = "USER_ID")
    private Long userId;

    @Column(name = "course_id")
    private Long courseId;

    @Column(name = "content", length = 255)
    private String content;

    @Column(name = "score")
    private Integer score;

    @Column(name = "write_date")
    @Temporal(TemporalType.DATE)
    private Date writeDate;

    // Entity 생성 전까지 주석처리
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "member_id")
//    private Member member;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;
}
