package backend.hanpum.domain.member.controller;

import backend.hanpum.config.jwt.UserDetailsImpl;
import backend.hanpum.domain.group.dto.responseDto.GroupListGetResDto;
import backend.hanpum.domain.group.service.GroupService;
import backend.hanpum.domain.member.dto.requestDto.UpdateMemberInfoReqDto;
import backend.hanpum.domain.member.dto.requestDto.UpdateNicknameReqDto;
import backend.hanpum.domain.member.dto.requestDto.UpdatePasswordReqDto;
import backend.hanpum.domain.member.dto.responseDto.MemberProfileResDto;
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
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "Member 컨트롤러", description = "Member Controller API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    private final ApiResponse response;
    private final MemberService memberService;
    private final GroupService groupService;

    @Operation(summary = "프로필 조회", description = "프로필 조회 API")
    @GetMapping("/profile")
    public ResponseEntity<?> getMemberProfile(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        MemberProfileResDto memberProfileResDto =
                memberService.getMemberProfile(userDetails.getMember().getMemberId());
        return response.success(ResponseCode.MEMBER_PROFILE_FETCHED, memberProfileResDto);
    }

    @Operation(summary = "프로필 이미지 변경", description = "프로필 이미지 변경 API")
    @PutMapping("/image-update")
    public ResponseEntity<?> updateMemberProfileImg(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                            @RequestPart MultipartFile multipartFile) {
        memberService.updateMemberProfileImg(userDetails.getMember().getMemberId(), multipartFile);
        return response.success(ResponseCode.PROFILE_IMAGE_UPDATE_SUCCESS);
    }

    @Operation(summary = "닉네임 변경", description = "닉네임 변경 API")
    @PutMapping("/nickname-update")
    public ResponseEntity<?> updateNickname(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                            @RequestBody @Valid UpdateNicknameReqDto updateNicknameReqDto) {
        memberService.updateNickname(userDetails.getMember().getMemberId(), updateNicknameReqDto);
        return response.success(ResponseCode.NICKNAME_UPDATE_SUCCESS);
    }

    @Operation(summary = "비밀번호 변경", description = "비밀번호 변경 API")
    @PutMapping("/password-update")
    public ResponseEntity<?> updatePassword(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                            @RequestBody @Valid UpdatePasswordReqDto updatePasswordReqDto) {
        memberService.updatePassword(userDetails.getMember().getMemberId(), updatePasswordReqDto);
        return response.success(ResponseCode.PASSWORD_UPDATE_SUCCESS);
    }

    @Operation(summary = "회원정보 변경", description = "회원정보 변경 API")
    @PutMapping("/info-update")
    public ResponseEntity<?> updateMemberInfo(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                            @RequestBody @Valid UpdateMemberInfoReqDto updateMemberInfoReqDto) {
        memberService.updateMemberInfo(userDetails.getMember().getMemberId(), updateMemberInfoReqDto);
        return response.success(ResponseCode.MEMBER_INFO_UPDATE_SUCCESS);
    }

    @Operation(summary = "관심 모임 리스트 조회", description = "관심 모임 리스트 조회 API")
    @GetMapping("/like-groups")
    public ResponseEntity<?> getMemberLikeGroupList(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        GroupListGetResDto groupListGetResDto =
                groupService.getMemberLikeGroupList(userDetails.getMember().getMemberId());
        return response.success(ResponseCode.MEMBER_LIKE_GROUP_LIST_FETCHED, groupListGetResDto);
    }
}