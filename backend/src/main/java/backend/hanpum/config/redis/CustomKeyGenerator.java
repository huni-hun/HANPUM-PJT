package backend.hanpum.config.redis;

import org.springframework.cache.interceptor.KeyGenerator;

import java.lang.reflect.Method;

public class CustomKeyGenerator implements KeyGenerator {

    @Override
    public Object generate(Object target, Method method, Object... params) {
        // 캐시 키를 생성하기 위해 대상 클래스의 이름, 메서드 이름, 파라미터 정보를 조합
        return target.getClass().getSimpleName() +  // 대상 클래스의 간단한 이름 (예: UserService)
                method.getName() +                  // 호출된 메서드의 이름 (예: getUserById)
                arrayToDelimitedString(params);     // 메서드의 파라미터들을 문자열로 변환하여 추가
    }

    // 파라미터 배열을 - 로 연결하여 문자열로 변환하는 헬퍼 메서드
    public String arrayToDelimitedString(Object... params) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < params.length; i++) {
            Object param = params[i];
            if (param == null) continue;    // 파라미터가 null인 경우 건너뜀
            sb.append(param.hashCode());    // 파라미터의 해시코드를 추가
            if (i != params.length - 1) {   // 파라미터 사이에 -를 추가하여 구분
                sb.append("-");
            }
        }
        return sb.toString();
    }
}
