package backend.hanpum.domain.auth.dto.requestDto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SendFindPasswordAuthCodeReqDto {
    @NotNull
    String loginId;
    @NotNull
    @Email
    String email;
}