package backend.hanpum.domain.auth.dto.requestDto;

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
public class KakaoSignUpCompleteReqDto {
    private String name;
    private String nickname;
    private Gender gender;
    private Date birthDate;
    private String phoneNumber;
}
