package backend.hanpum.domain.group.dto.responseDto;

import backend.hanpum.domain.group.enums.GroupJoinStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroupDetailGetResDto {
    private String title;
    private String groupImg;
    private String description;
    private Long recruitedCount;
    private int recruitmentCount;
    private Date recruitmentPeriod;
    private GroupJoinStatus groupJoinStatus;

    @Builder
    public GroupDetailGetResDto(String title, String groupImg, String description,
                                Long recruitedCount, int recruitmentCount, Date recruitmentPeriod) {
        this.title = title;
        this.groupImg = groupImg;
        this.description = description;
        this.recruitedCount = recruitedCount;
        this.recruitmentCount = recruitmentCount;
        this.recruitmentPeriod = recruitmentPeriod;
    }
}