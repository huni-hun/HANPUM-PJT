package backend.hanpum.domain.group.controller;

import backend.hanpum.config.jwt.UserDetailsImpl;
import backend.hanpum.domain.group.dto.requestDto.ApplyPostReqDto;
import backend.hanpum.domain.group.dto.requestDto.GroupPostReqDto;
import backend.hanpum.domain.group.dto.responseDto.*;
import backend.hanpum.domain.group.service.GroupService;
import backend.hanpum.exception.format.code.ApiResponse;
import backend.hanpum.exception.format.response.ResponseCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "Group 컨트롤러", description = "Group Controller API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/group")
public class GroupController {

    private final ApiResponse response;
    private final GroupService groupService;

    @Operation(summary = "모임 생성", description = "모임 생성 API")
    @PostMapping
    public ResponseEntity<?> groupPost(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                       @RequestPart(required = false) MultipartFile multipartFile,
                                       @RequestPart @Valid GroupPostReqDto groupPostReqDto) {
        GroupPostResDto groupPostResDto = groupService.createGroup(userDetails.getMember().getMemberId(), multipartFile, groupPostReqDto);
        return response.success(ResponseCode.GROUP_CREATED_SUCCESS, groupPostResDto);
    }

    @Operation(summary = "모임 삭제", description = "모임 삭제 API")
    @DeleteMapping("/{groupId}")
    public ResponseEntity<?> groupPost(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                       @PathVariable Long groupId) {
        groupService.deleteGroup(userDetails.getMember().getMemberId(), groupId);
        return response.success(ResponseCode.GROUP_DELETE_SUCCESS);
    }

    @Operation(summary = "모임 리스트 조회", description = "모임 리스트 조회 API")
    @GetMapping
    public ResponseEntity<?> getGroupList(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                          @RequestParam(required = false) String startPoint,
                                          @RequestParam(required = false) String endPoint,
                                          @RequestParam(required = false) Integer maxTotalDays,
                                          @RequestParam(required = false) Integer maxRecruitmentCount,
                                          Pageable pageable) {
        GroupListGetResDto groupListGetResDto = groupService.getGroupList(userDetails.getMember().getMemberId(),
                startPoint, endPoint, maxTotalDays, maxRecruitmentCount, pageable);
        return response.success(ResponseCode.GROUP_LIST_FETCHED, groupListGetResDto);
    }

    @Operation(summary = "모임 상세 조회", description = "모임 상세 조회 API")
    @GetMapping("/{groupId}")
    public ResponseEntity<?> getGroupDetail(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                            @PathVariable Long groupId) {
        GroupDetailGetResDto groupDetailGetResDto = groupService.getGroupDetail(userDetails.getMember().getMemberId(), groupId);
        return response.success(ResponseCode.GROUP_DETAIL_FETCHED, groupDetailGetResDto);
    }

    @Operation(summary = "모임 신청", description = "모임 신청 API")
    @PostMapping("/{groupId}/apply")
    public ResponseEntity<?> applyGroup(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                        @PathVariable Long groupId,
                                        @RequestBody @Valid ApplyPostReqDto applyPostReqDto) {
        groupService.applyGroup(userDetails.getMember().getMemberId(), groupId, applyPostReqDto);
        return response.success(ResponseCode.GROUP_APPLY_SUCCESS);
    }

    @Operation(summary = "모임 신청 취소", description = "모임 신청 취소 API")
    @DeleteMapping("/{groupId}/apply")
    public ResponseEntity<?> removeApplyGroup(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                              @PathVariable Long groupId) {
        groupService.removeApplyGroup(userDetails.getMember().getMemberId(), groupId);
        return response.success(ResponseCode.GROUP_APPLY_REMOVE_SUCCESS);
    }

    @Operation(summary = "모임 신청 리스트 조회", description = "모임 신청 리스트 조회 API")
    @GetMapping("/{groupId}/apply-list")
    public ResponseEntity<?> getGroupApplyList(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                               @PathVariable Long groupId) {
        GroupApplyListGetResDto groupApplyListGetResDto = groupService.getGroupApplyList(userDetails.getMember().getMemberId(), groupId);
        return response.success(ResponseCode.GROUP_APPLY_LIST_FETCHED, groupApplyListGetResDto);
    }

    @Operation(summary = "모임 신청 수락", description = "모임 신청 수락 API")
    @PutMapping("/apply/{groupMemberId}/accept")
    public ResponseEntity<?> acceptGroupApply(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                              @PathVariable Long groupMemberId) {
        groupService.acceptGroupApply(userDetails.getMember().getMemberId(), groupMemberId);
        return response.success(ResponseCode.GROUP_APPLY_ACCEPT_SUCCESS);
    }

    @Operation(summary = "모임 신청 거절", description = "모임 신청 거절 API")
    @DeleteMapping("/apply/{groupMemberId}/decline")
    public ResponseEntity<?> declineGroupApply(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                               @PathVariable Long groupMemberId) {
        groupService.declineGroupApply(userDetails.getMember().getMemberId(), groupMemberId);
        return response.success(ResponseCode.GROUP_APPLY_DECLINE_SUCCESS);
    }

    @Operation(summary = "모임 멤버 리스트 조회", description = "모임 멤버 리스트 조회 API")
    @GetMapping("/{groupId}/member-list")
    public ResponseEntity<?> getGroupMemberList(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                               @PathVariable Long groupId) {
        GroupMemberListGetResDto groupMemberListGetResDto = groupService.getGroupMemberList(userDetails.getMember().getMemberId(), groupId);
        return response.success(ResponseCode.GROUP_MEMBER_LIST_FETCHED, groupMemberListGetResDto);
    }

    @Operation(summary = "모임 멤버 상세 조회", description = "모임 멤버 상세 조회 API")
    @GetMapping("/{groupId}/member/{groupMemberId}")
    public ResponseEntity<?> getGroupMemberDetail(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                                  @PathVariable Long groupId,
                                                  @PathVariable Long groupMemberId) {
        GroupMemberDetailGetResDto groupMemberDetailGetResDto =
                groupService.getGroupMemberDetail(userDetails.getMember().getMemberId(), groupId, groupMemberId);
        return response.success(ResponseCode.GROUP_MEMBER_DETAIL_FETCHED, groupMemberDetailGetResDto);
    }

    @Operation(summary = "모임 멤버 추방", description = "모임 멤버 추방 API")
    @DeleteMapping("/member/{groupMemberId}/exile")
    public ResponseEntity<?> exileGroupMember(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                               @PathVariable Long groupMemberId) {
        groupService.exileGroupMember(userDetails.getMember().getMemberId(), groupMemberId);
        return response.success(ResponseCode.GROUP_MEMBER_EXILE_SUCCESS);
    }

    @Operation(summary = "모임 관심 목록 등록", description = "모임 관심 목록 등록 API")
    @PostMapping("/{groupId}/like")
    public ResponseEntity<?> likeGroup(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                       @PathVariable Long groupId) {
        boolean isLike = groupService.likeGroup(userDetails.getMember().getMemberId(), groupId);
        if (isLike) return response.success(ResponseCode.GROUP_LIKE_SUCCESS);
        else return response.success(ResponseCode.GROUP_UNLIKE_SUCCESS);
    }

    @Operation(summary = "모임 탈퇴", description = "모임 탈퇴 API")
    @DeleteMapping("/{groupId}/quit")
    public ResponseEntity<?> quitGroup(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                       @PathVariable Long groupId) {
        groupService.quitJoinGroup(userDetails.getMember().getMemberId(), groupId);
        return response.success(ResponseCode.GROUP_QUIT_SUCCESS);
    }
}