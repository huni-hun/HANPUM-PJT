package backend.hanpum.domain.member.service;

import backend.hanpum.config.redis.RedisDao;
import backend.hanpum.config.s3.S3ImageService;
import backend.hanpum.domain.course.repository.CourseUsageHistoryRepository;
import backend.hanpum.domain.course.repository.InterestCourseRepository;
import backend.hanpum.domain.group.repository.LikeGroupRepository;
import backend.hanpum.domain.member.dto.requestDto.UpdateMemberInfoReqDto;
import backend.hanpum.domain.member.dto.requestDto.UpdateNicknameReqDto;
import backend.hanpum.domain.member.dto.requestDto.UpdatePasswordReqDto;
import backend.hanpum.domain.member.dto.responseDto.MemberProfileResDto;
import backend.hanpum.domain.member.entity.Member;
import backend.hanpum.domain.member.enums.MemberType;
import backend.hanpum.domain.member.repository.MemberRepository;
import backend.hanpum.domain.schedule.repository.ScheduleRepository;
import backend.hanpum.exception.exception.auth.LoginInfoInvalidException;
import backend.hanpum.exception.exception.auth.NicknameExpiredException;
import backend.hanpum.exception.exception.group.GroupAlreadyJoinedException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    private final LikeGroupRepository likeGroupRepository;
    private final InterestCourseRepository interestCourseRepository;
    private final CourseUsageHistoryRepository courseUsageHistoryRepository;
    private final ScheduleRepository scheduleRepository;
    private final PasswordEncoder passwordEncoder;
    private final S3ImageService s3ImageService;
    private final RedisDao redisDao;

    @Override
    @Transactional(readOnly = true)
    public MemberProfileResDto getMemberProfile(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);
        return MemberProfileResDto.builder()
                .name(member.getName())
                .email(member.getEmail())
                .phoneNumber(member.getPhoneNumber())
                .birthDate(member.getBirthDate())
                .gender(member.getGender())
                .nickname(member.getNickname())
                .profilePicture(member.getProfilePicture())
                .memberType(member.getMemberType())
                .build();
    }

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
    public void updatePassword(Long memberId, UpdatePasswordReqDto updatePasswordReqDto) {
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);
        if (!passwordEncoder.matches(updatePasswordReqDto.getCurrentPassword(), member.getPassword())) {
            throw new LoginInfoInvalidException();
        }
        member.updateMemberPassword(passwordEncoder.encode(updatePasswordReqDto.getUpdatePassword()));
    }


    @Override
    @Transactional
    public void updateMemberInfo(Long memberId, UpdateMemberInfoReqDto updateMemberInfoReqDto) {
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);
        if (updateMemberInfoReqDto.getName() != null) {
            member.updateName(updateMemberInfoReqDto.getName());
        }
        if (updateMemberInfoReqDto.getBirthDate() != null) {
            member.updateBirthDate(updateMemberInfoReqDto.getBirthDate());
        }
        if (updateMemberInfoReqDto.getGender() != null) {
            member.updateGender(updateMemberInfoReqDto.getGender());
        }
        if (updateMemberInfoReqDto.getPhoneNumber() != null) {
            member.updatePhoneNumber(updateMemberInfoReqDto.getPhoneNumber());
        }
    }

    @Override
    @Transactional
    public void updateMemberProfileImg(Long memberId, MultipartFile multipartFile) {
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);
        if(!multipartFile.isEmpty()){
            String currentImage = member.getProfilePicture();
            String updateImage = s3ImageService.uploadImage(multipartFile);
            member.updateProfilePicture(updateImage);
            s3ImageService.deleteImage(currentImage);
        }
    }

    @Override
    @Transactional
    public void deleteMember(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(LoginInfoInvalidException::new);
        if (member.getGroupMember() != null) {
            throw new GroupAlreadyJoinedException();
        }
        String profilePicture = member.getProfilePicture();
        member.deleteMember(null, null, null, null, null,
                null, null, null, "탈퇴회원", MemberType.DELETE
        );
        likeGroupRepository.deleteAllByMember_MemberId(memberId); // 관심모임 삭제
        interestCourseRepository.deleteAllByMember_MemberId(memberId); // 관심 경로 삭제
        courseUsageHistoryRepository.deleteAllByMember_MemberId(memberId); // 사용한 경로 삭제
        scheduleRepository.deleteAllByMember_MemberId(memberId); // 일정 삭제
        // 사진 삭제 로직 추가 예정
    }
}