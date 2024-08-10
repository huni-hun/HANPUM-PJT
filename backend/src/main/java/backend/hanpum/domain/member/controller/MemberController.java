package backend.hanpum.domain.member.controller;

import backend.hanpum.config.jwt.UserDetailsImpl;
import backend.hanpum.domain.member.dto.requestDto.UpdateNicknameReqDto;
import backend.hanpum.domain.member.service.MemberService;
import backend.hanpum.exception.format.code.ApiResponse;
import backend.hanpum.exception.format.response.ResponseCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Member 컨트롤러", description = "Member Controller API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    private final ApiResponse response;
    private final MemberService memberService;

    @Operation(summary = "닉네임 변경", description = "닉네임 변경 API")
    @PutMapping("/nickname-update")
    public ResponseEntity<?> updateNickname(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                            @RequestBody @Valid UpdateNicknameReqDto updateNicknameReqDto) {
        memberService.updateNickname(userDetails.getMember().getMemberId(), updateNicknameReqDto);
        return response.success(ResponseCode.NICKNAME_UPDATE_SUCCESS);
    }
}
