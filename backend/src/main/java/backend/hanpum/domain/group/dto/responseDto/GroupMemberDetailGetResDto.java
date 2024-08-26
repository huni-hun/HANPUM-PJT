package backend.hanpum.domain.group.dto.responseDto;

import backend.hanpum.domain.group.enums.GroupJoinStatus;
import backend.hanpum.domain.group.enums.JoinType;
import backend.hanpum.domain.member.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroupMemberDetailGetResDto {
    private Long memberId;
    private Long groupMemberId;
    private JoinType joinType;
    private String profilePicture;
    private String nickname;
    private String name;
    private Date birthDate;
    private Gender gender;
    private String applyPost;
}