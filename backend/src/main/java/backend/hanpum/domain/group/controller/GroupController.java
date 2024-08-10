package backend.hanpum.domain.group.controller;

import backend.hanpum.config.jwt.UserDetailsImpl;
import backend.hanpum.domain.group.dto.requestDto.GroupPostReqDto;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
