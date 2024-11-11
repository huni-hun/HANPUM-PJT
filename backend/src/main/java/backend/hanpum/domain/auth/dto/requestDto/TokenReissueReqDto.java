package backend.hanpum.domain.auth.dto.requestDto;

import backend.hanpum.domain.member.enums.Gender;
import backend.hanpum.domain.member.enums.MemberType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TokenReissueReqDto {
    private String refreshToken;
}