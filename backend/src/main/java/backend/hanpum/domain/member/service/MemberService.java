package backend.hanpum.domain.member.service;

import backend.hanpum.domain.member.dto.requestDto.UpdateMemberInfoReqDto;
import backend.hanpum.domain.member.dto.requestDto.UpdateNicknameReqDto;
import backend.hanpum.domain.member.dto.requestDto.UpdatePasswordReqDto;
import backend.hanpum.domain.member.dto.responseDto.MemberProfileResDto;

public interface MemberService {
    MemberProfileResDto getMemberProfile(Long memberId);
    void updateNickname(Long memberId, UpdateNicknameReqDto updateNicknameReqDto);
    void updatePassword(Long memberId, UpdatePasswordReqDto updatePasswordReqDto);
    void updateMemberInfo(Long memberId, UpdateMemberInfoReqDto updateMemberInfoReqDto);
}