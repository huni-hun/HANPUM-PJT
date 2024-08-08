package backend.hanpum.domain.course.entity;

import backend.hanpum.domain.course.enums.CourseTypes;
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
public class CourseType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_type_id")
    private Long courseTypeId;

    @Column(name = "type_name", nullable = false)
    @Enumerated(EnumType.STRING)
    private CourseTypes typeName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;
}
