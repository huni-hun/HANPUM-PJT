package backend.hanpum.domain.member.service;

import backend.hanpum.config.redis.RedisDao;
import backend.hanpum.domain.member.dto.requestDto.UpdateMemberInfoReqDto;
import backend.hanpum.domain.member.dto.requestDto.UpdateNicknameReqDto;
import backend.hanpum.domain.member.entity.Member;
import backend.hanpum.domain.member.repository.MemberRepository;
import backend.hanpum.exception.exception.auth.LoginInfoInvalidException;
import backend.hanpum.exception.exception.auth.NicknameExpiredException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    private final RedisDao redisDao;

    @Override
    @Transactional
    public void updateNickname(Long memberId, UpdateNicknameReqDto updateNicknameReqDto) {
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);
        if (!redisDao.hasNickname(updateNicknameReqDto.getNickname())) {
            throw new NicknameExpiredException();
        }
        member.updateNickname(updateNicknameReqDto.getNickname());
        redisDao.deleteNickname(updateNicknameReqDto.getNickname());
    }

    @Override
    @Transactional
    public void updateMemberInfo(Long memberId, UpdateMemberInfoReqDto updateMemberInfoReqDto) {
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);
        member.updateMemberInfo(
                updateMemberInfoReqDto.getName(),
                updateMemberInfoReqDto.getBirthDate(),
                updateMemberInfoReqDto.getGender(),
                updateMemberInfoReqDto.getPhoneNumber());
    }
}