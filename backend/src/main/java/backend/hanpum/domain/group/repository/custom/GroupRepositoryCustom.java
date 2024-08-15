package backend.hanpum.domain.group.repository.custom;


import backend.hanpum.domain.group.dto.responseDto.GroupDetailGetResDto;
import backend.hanpum.domain.group.dto.responseDto.GroupResDto;

import java.util.List;
import java.util.Optional;

public interface GroupRepositoryCustom {
    List<GroupResDto> findGroupList();
    Optional<GroupDetailGetResDto> findGroupById(Long groupId);
}