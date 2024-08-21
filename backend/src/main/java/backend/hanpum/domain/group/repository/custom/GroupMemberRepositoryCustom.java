package backend.hanpum.domain.group.repository.custom;

import backend.hanpum.domain.group.dto.responseDto.GroupApplyResDto;
import backend.hanpum.domain.group.dto.responseDto.GroupMemberResDto;

import java.util.List;

public interface GroupMemberRepositoryCustom {
    Long countGroupMember(Long groupId);
    List<GroupApplyResDto> findGroupApplyList(Long groupId);
    List<GroupMemberResDto> findGroupMemberList(Long groupId);
}