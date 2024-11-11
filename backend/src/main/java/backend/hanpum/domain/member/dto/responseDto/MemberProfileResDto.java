package backend.hanpum.domain.member.dto.responseDto;

import backend.hanpum.domain.group.enums.JoinType;
import backend.hanpum.domain.member.enums.Gender;
import backend.hanpum.domain.member.enums.MemberType;
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
    String nickname;
    String profilePicture;
    MemberType memberType;
}