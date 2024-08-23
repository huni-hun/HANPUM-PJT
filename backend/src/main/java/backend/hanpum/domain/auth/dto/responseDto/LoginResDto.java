package backend.hanpum.domain.auth.dto.responseDto;

import backend.hanpum.domain.member.enums.MemberType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResDto {
    Long memberId;
    MemberType memberType;
    TokenResDto tokenResDto;
}
