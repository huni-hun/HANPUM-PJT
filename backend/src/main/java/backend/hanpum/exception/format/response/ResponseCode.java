package backend.hanpum.exception.format.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ResponseCode {

    /* 예시 */
    TEST_SUCCESS(HttpStatus.OK, "성공 예시용 테스트 코드입니다."),

    /* 일정 */
    SCHEDULE_CREATED(HttpStatus.OK, "일정이 성공적으로 생성되었습니다."),
    GROUP_SCHEDULE_CREATED(HttpStatus.OK, "모임 일정이 성공적으로 생성되었습니다."),
    RUNNING_SCHEDULE_FETCHED(HttpStatus.OK, "진행중인 일정이 성공적으로 조회되었습니다."),
    SCHEDULE_LIST_FETCHED(HttpStatus.OK, "일정 정보가 성공적으로 조회되었습니다."),
    GROUP_SCHEDULE_LIST_FETCHED(HttpStatus.OK, "모임 일정 정보가 성공적으로 조회되었습니다."),
    SCHEDULE_DAY_FETCHED(HttpStatus.OK, "세부일정이 성공적으로 조회되었습니다."),
    SCHEDULE_STATE_CHANGED(HttpStatus.OK, "진행 상태가 성공적으로 변경되었습니다."),
    SCHEDULE_RUN_STATE_CHANGED(HttpStatus.OK, "진행 상태가 성공적으로 변경되었습니다."),
    SCHEDULED_DELETED(HttpStatus.OK, "일정이 성공적으로 삭제되었습니다."),
    MEMO_CREATED(HttpStatus.OK, "메모가 성공적으로 생성되었습니다."),
    SCHEDULE_WAY_POINT_STATE_CHANGED(HttpStatus.OK, "경유지 방문상태가 성공적으로 변경되었습니다."),
    NEARBY_ATTRACTION_LIST_FETCHED(HttpStatus.OK, "주변 관광지 정보가 조회되었습니다."),
    WEATHER_LIST_FETCHED(HttpStatus.OK, "날씨정보가 성공적으로 조회되었습니다."),

    /* 경로 */
    COURSE_LIST_FETCHED(HttpStatus.OK, "경로 목록이 성공적으로 조회되었습니다."),
    COURSE_MAKE_SUCCESS(HttpStatus.OK, "경로 생성이 성공적으로 완료되었습니다."),
    COURSE_EDIT_SUCCESS(HttpStatus.OK, "경로 수정이 성공적으로 완료되었습니다."),
    COURSE_DELETE_SUCCESS(HttpStatus.OK, "경로 삭제가 성공적으로 완료되었습니다."),
    COURSE_DETAIL_FETCHED(HttpStatus.OK, "경로 상세정보가 성공적으로 조회되었습니다."),
    COURSE_DAY_FETCHED(HttpStatus.OK, "경로 일차 정보가 성공적으로 조회되었습니다."),
    ADD_INTEREST_COURSE_SUCCESS(HttpStatus.OK, "관심 경로 추가가 성공적으로 완료되었습니다."),
    DELETE_INTEREST_COURSE_SUCCESS(HttpStatus.OK, "관심 경로 삭제가 성공적으로 완료되었습니다."),
    COURSE_REVIEWS_FETCHED(HttpStatus.OK, "경로 리뷰 조회가 성공적으로 완료되었습니다."),
    COURSE_REVIEWS_WRITE_SUCCESS(HttpStatus.OK, "경로 리뷰 작성이 성공적으로 완료되었습니다."),
    COURSE_REVIEWS_EDIT_SUCCESS(HttpStatus.OK, "경로 리뷰 수정이 성공적으로 완료되었습니다."),
    COURSE_REVIEWS_DELETE_SUCCESS(HttpStatus.OK, "경로 리뷰 삭제가 성공적으로 완료되었습니다."),
    SEARCH_ATTRACTION_RESTAPI_SUCCESS(HttpStatus.OK, "한국관광공사 관광지 데이터가 성공적으로 검색되었습니다."),
    SEARCH_WAYPOINT_RESTAPI_SUCCESS(HttpStatus.OK, "카카오 디벨로퍼 키워드기반 장소 데이터가 성공적으로 검색되었습니다."),
    SEARCH_MULTI_WAYPOINT_COURSE_RESTAPI_SUCCESS(HttpStatus.OK, "카카오 디벨로퍼 다중 경유지 경로조회가 성공적으로 완료되었습니다."),

    /* 모임 */
    GROUP_CREATED_SUCCESS(HttpStatus.OK, "모임이 성공적으로 생성되었습니다."),
    GROUP_DELETE_SUCCESS(HttpStatus.OK, "모임이 성공적으로 삭제되었습니다."),
    GROUP_LIST_FETCHED(HttpStatus.OK, "모임 리스트가 성공적으로 조회되었습니다."),
    GROUP_DETAIL_FETCHED(HttpStatus.OK, "모임 상세 정보가 성공적으로 조회되었습니다."),
    GROUP_APPLY_SUCCESS(HttpStatus.OK, "모임 신청이 성공적으로 완료되었습니다."),
    GROUP_APPLY_REMOVE_SUCCESS(HttpStatus.OK, "모임 신청 취소가 성공적으로 완료되었습니다."),
    GROUP_APPLY_LIST_FETCHED(HttpStatus.OK, "모임 신청 리스트가 성공적으로 조회되었습니다."),
    GROUP_APPLY_ACCEPT_SUCCESS(HttpStatus.OK, "모임 신청 수락이 성공적으로 완료되었습니다."),
    GROUP_APPLY_DECLINE_SUCCESS(HttpStatus.OK, "모임 신청 거절이 성공적으로 완료되었습니다."),
    GROUP_MEMBER_LIST_FETCHED(HttpStatus.OK, "모임 멤버 리스트가 성공적으로 조회되었습니다."),
    GROUP_MEMBER_DETAIL_FETCHED(HttpStatus.OK, "모임 멤버 상세가 성공적으로 조회되었습니다."),
    GROUP_MEMBER_EXILE_SUCCESS(HttpStatus.OK, "모임 멤버 추방이 성공적으로 완료되었습니다."),
    GROUP_LIKE_SUCCESS(HttpStatus.OK, "모임 관심 목록 등록이 성공적으로 완료되었습니다."),
    GROUP_UNLIKE_SUCCESS(HttpStatus.OK, "모임 관심 목록 삭제가 성공적으로 완료되었습니다."),
    GROUP_QUIT_SUCCESS(HttpStatus.OK, "모임 탈퇴가 성공적으로 완료되었습니다."),

    /* 인증 */
    AUTHENTICATION_MAIL_SEND_SUCCESS(HttpStatus.OK, "인증 메일이 성공적으로 전송되었습니다."),
    AUTHENTICATION_SUCCESS(HttpStatus.OK, "인증이 성공적으로 완료되었습니다."),
    LOGIN_ID_CHECK_SUCCESS(HttpStatus.OK, "사용할 수 있는 아이디입니다."),
    NICKNAME_CHECK_SUCCESS(HttpStatus.OK, "사용할 수 있는 닉네임입니다."),
    SING_UP_SUCCESS(HttpStatus.OK, "회원가입이 성공적으로 완료되었습니다."),
    KAKAO_SING_UP_SUCCESS(HttpStatus.OK, "카카오 회원가입이 성공적으로 완료되었습니다."),
    LOGIN_SUCCESS(HttpStatus.OK, "로그인이 성공적으로 완료되었습니다."),
    LOGOUT_SUCCESS(HttpStatus.OK, "로그아웃이 성공적으로 완료되었습니다."),
    TOKEN_REISSUE_SUCCESS(HttpStatus.OK, "토큰이 성공적으로 재발급되었습니다."),
    MEMBER_FETCH_SUCCESS(HttpStatus.OK, "회원정보가 성공적으로 조회되었습니다."),
    MEMBER_PASSWORD_RESET_SUCCESS(HttpStatus.OK, "비밀번호 재설정이 성공적으로 완료되었습니다."),

    /* 멤버 */
    MEMBER_PROFILE_FETCHED(HttpStatus.OK, "회원 프로필이 성공적으로 조회되었습니다."),
    PROFILE_IMAGE_UPDATE_SUCCESS(HttpStatus.OK, "프로필 이미지가 성공적으로 변경되었습니다."),
    NICKNAME_UPDATE_SUCCESS(HttpStatus.OK, "닉네임이 성공적으로 변경되었습니다."),
    PASSWORD_UPDATE_SUCCESS(HttpStatus.OK, "비밀번호가 성공적으로 변경되었습니다."),
    MEMBER_INFO_UPDATE_SUCCESS(HttpStatus.OK, "회원정보가 성공적으로 변경되었습니다."),
    MEMBER_LIKE_GROUP_LIST_FETCHED(HttpStatus.OK, "관심 모임 리스트가 성공적으로 조회되었습니다."),
    MEMBER_LIKE_COURSE_LIST_FETCHED(HttpStatus.OK, "관심 경로 리스트가 성공적으로 조회되었습니다."),
    MEMBER_MADE_COURSE_LIST_FETCHED(HttpStatus.OK, "내가 만든 경로 리스트가 성공적으로 조회되었습니다."),
    MEMBER_DELETE_SUCCESS(HttpStatus.OK, "회원탈퇴가 성공적으로 완료되었습니다."),
    ;

    private final HttpStatus status;
    private final String message;
}