package backend.hanpum.domain.group.repository.custom;


import backend.hanpum.domain.group.dto.responseDto.GroupResDto;

import java.util.List;

public interface GroupRepositoryCustom {
    List<GroupResDto> findGroupList();
}
