package backend.hanpum.domain.group.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LikeGroupListGetResDto {
    List<GroupResDto> groupResDtoList = new ArrayList<>();
}