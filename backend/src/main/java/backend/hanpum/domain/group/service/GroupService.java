package backend.hanpum.domain.group.service;

import backend.hanpum.domain.group.dto.requestDto.ApplyPostReqDto;
import backend.hanpum.domain.group.dto.requestDto.GroupPostReqDto;
import backend.hanpum.domain.group.dto.requestDto.GroupUpdateReqDto;
import backend.hanpum.domain.group.dto.responseDto.*;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface GroupService {

    GroupPostResDto createGroup(Long memberId, MultipartFile multipartFile, GroupPostReqDto groupPostReqDto);
    void updateGroup(Long memberId, Long groupId, MultipartFile multipartFile, GroupUpdateReqDto groupUpdateReqDto);
    void deleteGroup(Long memberId, Long groupId);
    GroupListGetResDto getGroupList(Long memberId, String startPoint, String endPoint, Integer maxTotalDays,
                                    Integer maxRecruitmentCount, Pageable pageable);
    GroupDetailGetResDto getGroupDetail(Long memberId, Long groupId);
    void applyGroup(Long memberId, Long groupId, ApplyPostReqDto applyPostReqDto);
    void removeApplyGroup(Long memberId, Long groupId);
    GroupApplyListGetResDto getGroupApplyList(Long memberId, Long groupId);
    void acceptGroupApply(Long memberId, Long groupMemberId);
    void declineGroupApply(Long memberId, Long groupMemberId);
    GroupMemberListGetResDto getGroupMemberList(Long memberId, Long groupId);
    GroupMemberDetailGetResDto getGroupMemberDetail(Long memberId, Long groupId, Long groupMemberId);
    void exileGroupMember(Long memberId, Long groupMemberId);
    void likeGroup(Long memberId, Long groupId);
    void dislikeGroup(Long memberId, Long groupId);
    void quitJoinGroup(Long memberId, Long groupId);
    LikeGroupListGetResDto getMemberLikeGroupList(Long memberId);
    GroupResDto getMemberJoinGroup(Long memberId);
}