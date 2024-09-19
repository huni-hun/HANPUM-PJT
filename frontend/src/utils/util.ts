import api from '@/api';
import { GetRefreshToken } from '@/api/signup/POST';
import { SignupRequestValues } from '@/models/signup';
import CryptoJS from 'crypto-js';

const secretKey = process.env.REACT_APP_SECRET_KEY;

type ConfigType = 'announcement' | 'policy' | 'withdraw' | 'pw';

// 생년월일
//2024-08-14T07:13:27.725Z -> 2024년01월14일
export function dateFormat(date: string | undefined) {
  if (date) {
    const sliceDate = date.split('T')[0];
    const formatDate = `${sliceDate.split('-')[0]}년 ${sliceDate.split('-')[1]}월 ${sliceDate.split('-')[2]}일`;
    return formatDate;
  }
}

// 휴대전화 - 붙이기
export function telnumberFormat(telnum: string | undefined) {
  if (telnum) {
    telnum = telnum.replace(/\D/g, '');

    if (telnum.length <= 3) {
      return telnum;
    } else if (telnum.length <= 7) {
      return `${telnum.slice(0, 3)}-${telnum.slice(3)}`;
    } else if (telnum.length <= 11) {
      return `${telnum.slice(0, 3)}-${telnum.slice(3, 7)}-${telnum.slice(7)}`;
    } else {
      return `${telnum.slice(0, 3)}-${telnum.slice(3, 7)}-${telnum.slice(7, 11)}`;
    }
  }
}

// 토큰 인코딩 refreshToken 제외
export function encodeToken(accessToken: string) {
  if (secretKey) {
    return CryptoJS.AES.encrypt(accessToken, secretKey).toString();
  }
}

// 토큰 디코딩
export function decodeToken(accessToken: string) {
  if (secretKey) {
    let decrypted = CryptoJS.AES.decrypt(accessToken, secretKey).toString(
      CryptoJS.enc.Utf8,
    );
    return decrypted;
  }
}

export const handleTokenExpiration = async (originalRequest?: any) => {
  // 토큰 재발급 로직
  const newToken = await GetRefreshToken();
  const encodeNewToken = encodeToken(newToken.data.accessToken.split('+')[1]);
  if (encodeNewToken) {
    localStorage.setItem('token', encodeNewToken);

    if (originalRequest) {
      originalRequest.headers['Authorization'] = `Bearer ${encodeNewToken}`;
      return api(originalRequest);
    }
  }
  // window.location.reload();
};

// text Area \n 붙이기
export function formatAreaValue(text: string) {
  return text.replace(/\n/g, '\\n');
}

// 성별 한글 포맷터
export function genderKor(gender: string) {
  if (gender === 'MAN') {
    return '남자';
  } else if (gender === 'WOMAN') {
    return '여자';
  } else {
    return '기타';
  }
}

// 성별 영어 포맷터
export function genderEng(gender: string) {
  if (gender === '남성') {
    return 'MAN';
  } else if (gender === '여성') {
    return 'WOMAN';
  } else {
    return 'OTHER';
  }
}

// param에 따른 title 반환
export function returnTitle(param: keyof SignupRequestValues) {
  if (param === 'nickname') {
    return '닉네임';
  }
  if (param === 'name') {
    return '이름';
  }
  if (param === 'email') {
    return '이메일';
  }
  if (param === 'phoneNumber') {
    return '전화번호';
  }
  if (param === 'birthDate') {
    return '생년월일';
  }
  if (param === 'gender') {
    return '성별';
  }
}

export function returnConfigTitle(param: ConfigType): string {
  switch (param) {
    case 'announcement':
      return '공지사항';
    case 'policy':
      return '이용약관 및 정책';
    case 'withdraw':
      return '회원탈퇴';
    case 'pw':
      return '비밀번호 변경';
    default:
      return '';
  }
}

export function startDateEndDateStringFormat(
  startDate: string,
  endDate: string,
) {
  const formatDateString = (dateStr: string) => {
    return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
  };

  const start = new Date(formatDateString(startDate));
  const end = new Date(formatDateString(endDate));

  const formatDate = (date: Date) => {
    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const startStr = formatDate(start);
  const endStr = formatDate(end);

  return `${startStr} - ${endStr}`;
}

/** 관광지 자르기 */
export function cutAddress(address: string): string {
  const addressPattern =
    /^(.*?도|.*?특별시|.*?광역시|제주도)\s+(\S{2,}?[시|군|구])/;
  const match = address.match(addressPattern);

  if (match) {
    return `${match[1]} ${match[2]}`;
  } else {
    return address;
  }
}
