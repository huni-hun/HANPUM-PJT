// 생년월일
//2024-08-14T07:13:27.725Z -> 2024년01월14일
export function dateFormat(date: string | undefined) {
  if (date) {
    const sliceDate = date.split('T')[0];
    const formatDate = `${sliceDate.split('-')[0]}년 ${sliceDate.split('-')[1]}월 ${sliceDate.split('-')[2]}일`;
    return formatDate;
  }
}

export function telnumberFormat(telnum: string | undefined) {
  if (telnum) {
    telnum = telnum.replace(/\D/g, '');

    // 11자리가 넘어가면 마지막 자리를 잘라내기
    // if (telnum.length > 11) {
    //   telnum = telnum.substring(0, 11);
    // }

    if (telnum.length <= 3) {
      return telnum;
    } else if (telnum.length <= 7) {
      return `${telnum.slice(0, 3)}-${telnum.slice(3)}`;
    } else {
      return `${telnum.slice(0, 3)}-${telnum.slice(3, 7)}-${telnum.slice(7, 11)}`;
    }
  }
}
