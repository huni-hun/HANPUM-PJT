package backend.hanpum.domain.member.dto.responseDto;

import backend.hanpum.domain.member.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberProfileResDto {
    String name;
    String email;
    String phoneNumber;
    Date birthDate;
    Gender gender;
}