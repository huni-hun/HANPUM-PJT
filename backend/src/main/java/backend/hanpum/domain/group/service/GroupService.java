package backend.hanpum.domain.group.service;

import backend.hanpum.domain.group.dto.requestDto.ApplyPostReqDto;
import backend.hanpum.domain.group.dto.requestDto.GroupPostReqDto;
import backend.hanpum.domain.group.dto.responseDto.*;
import backend.hanpum.domain.member.entity.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface GroupService {

    GroupPostResDto createGroup(Long memberId, MultipartFile multipartFile, GroupPostReqDto groupPostReqDto);
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
    boolean likeGroup(Long memberId, Long groupId);
    void quitJoinGroup(Long memberId, Long groupId);
    LikeGroupListGetResDto getMemberLikeGroupList(Long memberId);
}