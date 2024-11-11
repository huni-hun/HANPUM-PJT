package backend.hanpum.domain.group.dto.responseDto;

import backend.hanpum.domain.group.enums.JoinType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroupMemberResDto {
    private Long memberId;
    private Long groupMemberId;
    private JoinType joinType;
    private String profilePicture;
    private String nickname;
}