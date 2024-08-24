package backend.hanpum.domain.group.service;

import backend.hanpum.config.s3.S3ImageService;
import backend.hanpum.domain.group.dto.requestDto.GroupPostReqDto;
import backend.hanpum.domain.group.dto.responseDto.*;
import backend.hanpum.domain.group.entity.Group;
import backend.hanpum.domain.group.entity.GroupMember;
import backend.hanpum.domain.group.entity.LikeGroup;
import backend.hanpum.domain.group.enums.GroupJoinStatus;
import backend.hanpum.domain.group.enums.JoinType;
import backend.hanpum.domain.group.repository.GroupMemberRepository;
import backend.hanpum.domain.group.repository.GroupRepository;
import backend.hanpum.domain.group.repository.LikeGroupRepository;
import backend.hanpum.domain.group.repository.custom.GroupMemberRepositoryCustom;
import backend.hanpum.domain.group.repository.custom.GroupRepositoryCustom;
import backend.hanpum.domain.member.entity.Member;
import backend.hanpum.domain.member.repository.MemberRepository;
import backend.hanpum.exception.exception.auth.LoginInfoInvalidException;
import backend.hanpum.exception.exception.group.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final MemberRepository memberRepository;
    private final GroupRepository groupRepository;
    private final GroupRepositoryCustom groupRepositoryCustom;
    private final GroupMemberRepository groupMemberRepository;
    private final GroupMemberRepositoryCustom groupMemberRepositoryCustom;
    private final LikeGroupRepository likeGroupRepository;
    private final S3ImageService s3ImageService;

    @Override
    @Transactional
    public GroupPostResDto createGroup(Long memberId, MultipartFile multipartFile, GroupPostReqDto groupPostReqDto) {
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);
        if (member.getGroupMember() != null) throw new GroupAlreadyJoinedException();

        Group group = Group.builder()
                .title(groupPostReqDto.getTitle())
                .description(groupPostReqDto.getDescription())
                .recruitmentCount(groupPostReqDto.getRecruitmentCount())
                .recruitmentPeriod(groupPostReqDto.getRecruitmentPeriod())
                .build();

        GroupMember groupMember = GroupMember.builder()
                .joinType(JoinType.GROUP_LEADER)
                .group(group)
                .member(member)
                .build();

        group.getGroupMemberList().add(groupMember);
        member.updateGroupMember(groupMember);
        groupRepository.save(group);

        if(!multipartFile.isEmpty()) {
            group.updateGroupImg(s3ImageService.uploadImage(multipartFile));
        }

        return GroupPostResDto.builder().groupId(group.getGroupId()).build();
    }

    @Override
    @Transactional(readOnly = true)
    public GroupListGetResDto getGroupList(Long memberId, Pageable pageable) {
        return groupRepositoryCustom.findGroupList(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public GroupDetailGetResDto getGroupDetail(Long memberId, Long groupId) {
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);
        GroupDetailGetResDto groupDetailGetResDto = groupRepositoryCustom.findGroupById(groupId).orElseThrow(GroupNotFoundException::new);

        return GroupDetailGetResDto.builder()
                .title(groupDetailGetResDto.getTitle())
                .groupImg(groupDetailGetResDto.getGroupImg())
                .description(groupDetailGetResDto.getDescription())
                .likeCount(groupDetailGetResDto.getLikeCount())
                .recruitmentCount(groupDetailGetResDto.getRecruitmentCount())
                .recruitmentPeriod(groupDetailGetResDto.getRecruitmentPeriod())
                .recruitedCount(groupDetailGetResDto.getRecruitedCount())
                .groupJoinStatus(getGroupJoinStatus(member.getGroupMember(), groupId))
                .build();
    }

    @Override
    @Transactional
    public void applyGroup(Long memberId, Long groupId) {
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);
        if (member.getGroupMember() != null) throw new GroupAlreadyJoinedException();
        Group group = groupRepository.findById(groupId).orElseThrow(GroupNotFoundException::new);
        long countGroupMember = groupMemberRepositoryCustom.countGroupMember(groupId);
        if(countGroupMember >= group.getRecruitmentCount()) throw new GroupMemberFullException();

        GroupMember groupMember = GroupMember.builder()
                .joinType(JoinType.APPLY)
                .group(group)
                .member(member)
                .build();
        group.getGroupMemberList().add(groupMember);
        member.updateGroupMember(groupMember);
        groupRepository.save(group);
    }

    @Override
    @Transactional
    public void removeApplyGroup(Long memberId, Long groupId) {
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);
        Group group = groupRepository.findById(groupId).orElseThrow(GroupNotFoundException::new);
        GroupMember groupMember = member.getGroupMember();
        if (groupMember == null || groupMember.getGroup() != group) throw new GroupMemberNotFoundException();
        member.updateGroupMember(null);
        groupMemberRepository.delete(groupMember);
    }

    @Override
    @Transactional(readOnly = true)
    public GroupApplyListGetResDto getGroupApplyList(Long memberId, Long groupId) {
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);
        Group group = groupRepository.findById(groupId).orElseThrow(GroupNotFoundException::new);
        if(member.getGroupMember().getJoinType() != JoinType.GROUP_LEADER) throw new GroupPermissionException(); // 그룹 리더가 아니라는 예외 처리
        List<GroupApplyResDto> groupApplyList = groupMemberRepositoryCustom.findGroupApplyList(groupId);
        return GroupApplyListGetResDto.builder().groupApplyResList(groupApplyList).build();
    }

    @Override
    @Transactional
    public void acceptGroupApply(Long memberId, Long groupMemberId) {
        GroupMember groupMember = validGroupApply(memberId, groupMemberId);
        groupMember.updateJoinType(JoinType.GROUP_MEMBER);
    }

    @Override
    @Transactional
    public void declineGroupApply(Long memberId, Long groupMemberId) {
        GroupMember groupMember = validGroupApply(memberId, groupMemberId);
        groupMember.getMember().updateGroupMember(null);
        groupMemberRepository.delete(groupMember);
    }

    @Override
    @Transactional(readOnly = true)
    public GroupMemberListGetResDto getGroupMemberList(Long memberId, Long groupId) {
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);
        Group group = groupRepository.findById(groupId).orElseThrow(GroupNotFoundException::new);
        if(member.getGroupMember().getJoinType() != JoinType.GROUP_LEADER) throw new GroupPermissionException();
        List<GroupMemberResDto> groupMemberList = groupMemberRepositoryCustom.findGroupMemberList(groupId);
        return GroupMemberListGetResDto.builder().groupMemberResList(groupMemberList).build();
    }

    @Override
    @Transactional
    public void exileGroupMember(Long memberId, Long groupMemberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);
        GroupMember groupLeader = member.getGroupMember();
        if(groupLeader.getJoinType() != JoinType.GROUP_LEADER) throw new GroupPermissionException();
        GroupMember groupMember = groupMemberRepository.findById(groupMemberId).orElseThrow(GroupMemberNotFoundException::new);
        if(groupLeader.getGroup() == groupMember.getGroup()) {
            groupMember.getMember().updateGroupMember(null);
            groupMemberRepository.delete(groupMember);
        }
    }

    @Override
    @Transactional
    public boolean likeGroup(Long memberId, Long groupId) {
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);
        Group group = groupRepository.findById(groupId).orElseThrow(GroupNotFoundException::new);

        LikeGroup likeGroup = likeGroupRepository.findByMemberAndGroup(member, group);

        if (likeGroup == null) {
            likeGroup = LikeGroup.builder().member(member).group(group).build();
            group.updateLikeCount(group.getLikeCount() + 1);
            member.getLikeGroups().add(likeGroup);
            memberRepository.save(member);
            return true;
        } else {
            group.updateLikeCount(group.getLikeCount() - 1);
            likeGroupRepository.delete(likeGroup);
            return false;
        }
    }

    @Override
    @Transactional
    public void quitJoinGroup(Long memberId, Long groupId) {
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);
        Group group = groupRepository.findById(groupId).orElseThrow(GroupNotFoundException::new);
        GroupMember groupMember = member.getGroupMember();
        if(groupMember == null ||  groupMember.getGroup() != group || groupMember.getJoinType() != JoinType.GROUP_MEMBER) {
            throw new GroupMemberNotFoundException();
        }
        member.updateGroupMember(null);
        groupMemberRepository.delete(groupMember);
    }

    @Override
    @Transactional(readOnly = true)
    public GroupListGetResDto getMemberLikeGroupList(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);
        List<LikeGroup> likeGroups = member.getLikeGroups();
        List<GroupResDto> groupResDtoList = likeGroups.stream()
                .map(likeGroup -> GroupResDto.builder()
                        .title(likeGroup.getGroup().getTitle())
                        .groupImg(likeGroup.getGroup().getGroupImg())
                        .likeCount(likeGroup.getGroup().getLikeCount())
                        .recruitedCount(groupMemberRepositoryCustom.countGroupMember(likeGroup.getGroup().getGroupId())) // 현재 모집된 인원 수
                        .recruitmentCount(likeGroup.getGroup().getRecruitmentCount()) // 총 모집 인원 수
                        .build())
                .toList();
        return GroupListGetResDto.builder().groupResDtoList(groupResDtoList).build();
    }

    private GroupJoinStatus getGroupJoinStatus(GroupMember groupMember, Long groupId) {
        GroupJoinStatus groupJoinStatus = GroupJoinStatus.NOT_JOINED_GROUP;
        if (groupMember != null) {
            if (!groupMember.getGroup().getGroupId().equals(groupId)) {
                groupJoinStatus = GroupJoinStatus.ANOTHER_GROUP;
            } else {
                switch (groupMember.getJoinType()) {
                    case APPLY -> groupJoinStatus = GroupJoinStatus.GROUP_APPLY;
                    case GROUP_MEMBER -> groupJoinStatus = GroupJoinStatus.GROUP_MEMBER;
                    case GROUP_LEADER -> groupJoinStatus = GroupJoinStatus.GROUP_LEADER;
                }
            }
        }
        return groupJoinStatus;
    }

    private GroupMember validGroupApply(Long memberId, Long groupMemberId){
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);
        if(member.getGroupMember().getJoinType() != JoinType.GROUP_LEADER) throw new GroupPermissionException();
        GroupMember groupMember = groupMemberRepository.findById(groupMemberId).orElseThrow(GroupMemberNotFoundException::new);
        if(groupMember.getJoinType() != JoinType.APPLY) throw new GroupAlreadyJoinedException();
        return groupMember;
    }
}