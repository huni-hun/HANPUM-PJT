package backend.hanpum.domain.group.service;

import backend.hanpum.domain.group.dto.requestDto.GroupPostReqDto;
import backend.hanpum.domain.group.dto.responseDto.*;
import backend.hanpum.domain.member.entity.Member;

public interface GroupService {

    GroupPostResDto createGroup(Long memberId, GroupPostReqDto groupPostReqDto);
    GroupListGetResDto getGroupList(Long memberId);
    GroupDetailGetResDto getGroupDetail(Long memberId, Long groupId);
    void applyGroup(Long memberId, Long groupId);
    void removeApplyGroup(Long memberId, Long groupId);
    GroupApplyListGetResDto getGroupApplyList(Long memberId, Long groupId);
    void acceptGroupApply(Long memberId, Long groupMemberId);
    void declineGroupApply(Long memberId, Long groupMemberId);
    GroupMemberListGetResDto getGroupMemberList(Long memberId, Long groupId);
    void exileGroupMember(Long memberId, Long groupMemberId);
    boolean likeGroup(Long memberId, Long groupId);
    void quitJoinGroup(Long memberId, Long groupId);
    GroupListGetResDto getMemberLikeGroupList(Long memberId);
}