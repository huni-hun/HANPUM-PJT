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
public class GroupListGetResDto {
    List<GroupResDto> groupResDtoList = new ArrayList<>();
}