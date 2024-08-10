package backend.hanpum.domain.member.service;

import backend.hanpum.domain.member.dto.requestDto.UpdateMemberInfoReqDto;
import backend.hanpum.domain.member.dto.requestDto.UpdateNicknameReqDto;

public interface MemberService {
    void updateNickname(Long memberId, UpdateNicknameReqDto updateNicknameReqDto);
    void updateMemberInfo(Long memberId, UpdateMemberInfoReqDto updateMemberInfoReqDto);
}