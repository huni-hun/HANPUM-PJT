package backend.hanpum.domain.group.controller;

import backend.hanpum.config.jwt.UserDetailsImpl;
import backend.hanpum.domain.group.dto.requestDto.GroupPostReqDto;
import backend.hanpum.domain.group.dto.responseDto.GroupDetailGetResDto;
import backend.hanpum.domain.group.dto.responseDto.GroupListGetResDto;
import backend.hanpum.domain.group.dto.responseDto.GroupPostResDto;
import backend.hanpum.domain.group.service.GroupService;
import backend.hanpum.exception.format.code.ApiResponse;
import backend.hanpum.exception.format.response.ResponseCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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
                                       @RequestBody @Valid GroupPostReqDto groupPostReqDto) {
        GroupPostResDto groupPostResDto = groupService.createGroup(userDetails.getMember().getMemberId(), groupPostReqDto);
        return response.success(ResponseCode.GROUP_CREATED_SUCCESS, groupPostResDto);
    }

    @Operation(summary = "모임 리스트 조회", description = "모임 리스트 조회 API")
    @GetMapping
    public ResponseEntity<?> getGroupList(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        GroupListGetResDto groupListGetResDto = groupService.getGroupList(userDetails.getMember().getMemberId());
        return response.success(ResponseCode.GROUP_LIST_FETCHED, groupListGetResDto);
    }

    @Operation(summary = "모임 상세 조회", description = "모임 상세 조회 API")
    @GetMapping("/{groupId}")
    public ResponseEntity<?> getGroupDetail(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                            @PathVariable Long groupId) {
        GroupDetailGetResDto groupDetailGetResDto = groupService.getGroupDetail(userDetails.getMember().getMemberId(), groupId);
        return response.success(ResponseCode.GROUP_DETAIL_FETCHED, groupDetailGetResDto);
    }
}