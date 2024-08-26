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

    if (telnum.length <= 3) {
      return telnum;
    } else if (telnum.length <= 7) {
      return `${telnum.slice(0, 3)}-${telnum.slice(3)}`;
    } else {
      return `${telnum.slice(0, 3)}-${telnum.slice(3, 7)}-${telnum.slice(7, 11)}`;
    }
  }
}

// 토큰 인코딩
// export function encodeToken(accessToken: string, refreshToken: string) {
//   console.log('인코딩에서', accessToken, refreshToken);
//   if (secretKey) {
//     // console.log(CryptoJS.AES.encrypt(token, secretKey).toString());
//     const token = {
//       accessToken: CryptoJS.AES.encrypt(accessToken, secretKey).toString(),
//       refreshToken: CryptoJS.AES.encrypt(refreshToken, secretKey).toString(),
//     };
//     return token;
//     // return CryptoJS.AES.encrypt(token, secretKey).toString();
//   }
// }

// 토큰 인코딩 refreshToken 제외
export function encodeToken(accessToken: string) {
  console.log('인코딩에서', accessToken);
  if (secretKey) {
    const token = {
      accessToken: CryptoJS.AES.encrypt(accessToken, secretKey).toString(),
    };
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
    const refreshTokenBytes = CryptoJS.AES.decrypt(
      tokenObj.refreshToken,
      secretKey,
    );
    const byteTokenObj = {
      accessToken: accesssTokenBytes.toString(CryptoJS.enc.Utf8),
      refreshToken: refreshTokenBytes.toString(CryptoJS.enc.Utf8),
    };

    return byteTokenObj;
  }
}

export function formatAreaValue(text: string) {
  return text.replace(/\n/g, '\\n');
}
