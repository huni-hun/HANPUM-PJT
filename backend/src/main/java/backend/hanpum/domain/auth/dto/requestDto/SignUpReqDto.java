package backend.hanpum.domain.auth.dto.requestDto;

import backend.hanpum.domain.member.enums.Gender;
import backend.hanpum.domain.member.enums.MemberType;
import jakarta.persistence.*;
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
public class SignUpReqDto {

    private String loginId;

    @NotNull
    private String password;

    @Email
    @NotNull
    private String email;

    private String profilePicture;

    @NotNull
    private String name;

    private Date birthDate;

    private Gender gender;

    private String phoneNumber;

    @NotNull
    private String nickname;

    private MemberType memberType;
}