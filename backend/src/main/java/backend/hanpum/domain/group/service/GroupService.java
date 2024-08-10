package backend.hanpum.domain.group.service;

import backend.hanpum.domain.group.dto.requestDto.GroupPostReqDto;
import backend.hanpum.domain.group.dto.responseDto.GroupPostResDto;

public interface GroupService {

    GroupPostResDto createGroup(Long memberId, GroupPostReqDto groupPostReqDto);
}
