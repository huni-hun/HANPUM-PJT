package backend.hanpum.domain.course.entity;

import backend.hanpum.domain.member.entity.Member;
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
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Long courseId;

    @Column(name= "course_name", length = 30)
    private String courseName;

    @Column(name= "background_img")
    private String backgroundImg;

    @Column(name= "content", length = 100)
    private String content;

    @Column(name= "write_state")
    private boolean writeState;

    @Column(name= "open_state")
    private boolean openState;

    @Column(name= "write_date")
    @Temporal(TemporalType.DATE)
    private Date writeDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder.Default
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CourseDay> courseDays = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Review> reviews = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CourseType> courseTypes = new ArrayList<>();

    public void updateCourse(String courseName, String content, boolean openState, boolean writeSTate) {
        this.courseName = courseName;
        this.content = content;
        this.openState = openState;
        this.writeState = writeSTate;
    }
}
