package backend.hanpum.domain.member.dto.requestDto;

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
public class UpdateMemberInfoReqDto {
    String name;
    Date birthDate;
    Gender gender;
    String phoneNumber;
}