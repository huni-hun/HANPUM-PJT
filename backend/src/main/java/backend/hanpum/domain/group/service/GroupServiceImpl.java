package backend.hanpum.domain.group.service;

import backend.hanpum.domain.group.dto.requestDto.GroupPostReqDto;
import backend.hanpum.domain.group.dto.responseDto.GroupDetailGetResDto;
import backend.hanpum.domain.group.dto.responseDto.GroupListGetResDto;
import backend.hanpum.domain.group.dto.responseDto.GroupPostResDto;
import backend.hanpum.domain.group.dto.responseDto.GroupResDto;
import backend.hanpum.domain.group.entity.Group;
import backend.hanpum.domain.group.entity.GroupMember;
import backend.hanpum.domain.group.enums.GroupJoinStatus;
import backend.hanpum.domain.group.enums.JoinType;
import backend.hanpum.domain.group.repository.GroupMemberRepository;
import backend.hanpum.domain.group.repository.GroupRepository;
import backend.hanpum.domain.group.repository.custom.GroupRepositoryCustom;
import backend.hanpum.domain.member.entity.Member;
import backend.hanpum.domain.member.repository.MemberRepository;
import backend.hanpum.exception.exception.auth.LoginInfoInvalidException;
import backend.hanpum.exception.exception.group.GroupAlreadyJoinedException;
import backend.hanpum.exception.exception.group.GroupMemberNotFoundException;
import backend.hanpum.exception.exception.group.GroupNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final MemberRepository memberRepository;
    private final GroupRepository groupRepository;
    private final GroupRepositoryCustom groupRepositoryCustom;
    private final GroupMemberRepository groupMemberRepository;

    @Override
    @Transactional
    public GroupPostResDto createGroup(Long memberId, GroupPostReqDto groupPostReqDto) {
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);
        if (member.getGroupMember() != null) throw new GroupAlreadyJoinedException();

        Group group = Group.builder()
                .title(groupPostReqDto.getTitle())
                .groupImg(groupPostReqDto.getGroupImg())
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

        return GroupPostResDto.builder().groupId(group.getGroupId()).build();
    }

    @Override
    @Transactional(readOnly = true)
    public GroupListGetResDto getGroupList(Long memberId) {
        List<GroupResDto> groupResDtoList = groupRepositoryCustom.findGroupList();
        return GroupListGetResDto.builder().groupResDtoList(groupResDtoList).build();
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
        Group group = groupRepository.findById(groupId).orElseThrow(GroupNotFoundException::new);
        if (member.getGroupMember() != null) throw new GroupAlreadyJoinedException();

        GroupMember groupMember = GroupMember.builder()
                .joinType(JoinType.APPLY)
                .group(group)
                .member(member)
                .build();
        group.getGroupMemberList().add(groupMember);
        groupMemberRepository.save(groupMember);
        member.updateGroupMember(groupMember);
        groupRepository.save(group);
    }

    @Override
    @Transactional
    public void removeApplyGroup(Long memberId, Long groupId) {
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);
        Group group = groupRepository.findById(groupId).orElseThrow(GroupNotFoundException::new);
        if (member.getGroupMember() == null) throw new GroupMemberNotFoundException();
        GroupMember groupMember =
                groupMemberRepository.findByGroupAndMember(group, member).orElseThrow(GroupMemberNotFoundException::new);
        member.updateGroupMember(null);
        group.getGroupMemberList().remove(groupMember);
        groupMemberRepository.delete(groupMember);
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
}