import { SignupRequestValues } from '@/models/signup';
import { Token } from '@/models/user';
import CryptoJS from 'crypto-js';

const secretKey = process.env.REACT_APP_SECRET_KEY;

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
    // console.log(telnum);

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
  // console.log('인코딩에서', accessToken);
  if (secretKey) {
    const token = {
      accessToken: CryptoJS.AES.encrypt(accessToken, secretKey).toString(),
    };

    // console.log('token ::', token);
    return token;
  }
}

// 토큰 디코딩
export function decodeToken(tokenObj: Token) {
  if (secretKey) {
    const accesssTokenBytes = CryptoJS.AES.decrypt(
      tokenObj.accessToken,
      secretKey,
    );

    const byteTokenObj = {
      accessToken: accesssTokenBytes.toString(CryptoJS.enc.Utf8),
    };

    return byteTokenObj;
  }
}

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
