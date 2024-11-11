package backend.hanpum.domain.course.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@IdClass(CourseDayId.class)
public class CourseDayId implements Serializable {
    private Course course;
    private Integer dayNumber;

    @Override
    public int hashCode() {
        return Objects.hash(course, dayNumber);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CourseDayId that = (CourseDayId) o;
        return Objects.equals(course, that.course) &&
                Objects.equals(dayNumber, that.dayNumber);
    }
}
