import defaultImg1 from '../assets/img/DefaultImg1.png';
import defaultImg2 from '../assets/img/DefaultImg2.png';
import defaultImg3 from '../assets/img/DefaultImg3.png';
import defaultImg4 from '../assets/img/DefaultImg4.jpg';
import defaultImg5 from '../assets/img/DefaultImg5.jpg';

const imgList = [
  defaultImg1,
  defaultImg2,
  defaultImg3,
  defaultImg4,
  defaultImg5,
];

const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg'];

const randomDefaultImg = (): string => {
  const randomIdx = Math.random() * imgList.length;
  return imgList[Math.floor(randomIdx)];
};

export const setDefaultImg = (img: string | null): string => {
  if (img && imageExtensions.some((ext) => img.toLowerCase().endsWith(ext))) {
    return img; // 올바른 이미지 경로일 경우 반환
  } else {
    return randomDefaultImg(); // 그렇지 않으면 랜덤 기본 이미지 반환
  }
};
