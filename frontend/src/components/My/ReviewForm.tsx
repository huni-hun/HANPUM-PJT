import Flex from '../common/Flex';
import * as S from '../Style/My/ReviewForm.styled';
import img from '../../assets/img/mountain.jpg';
import Text from '../common/Text';
import { useState } from 'react';
import { formatAreaValue } from '@/utils/util';
import BaseButton from '../common/BaseButton';

function ReviewForm() {
  const [reviewValue, setReviewValue] = useState({
    review: '',
  });

  const onChangeReview = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewValue({ ...reviewValue, review: e.target.value });
  };

  // const handleSubmit = () => {
  //   const formattedReview = formatAreaValue(reviewValue.review);
  //   console.log(formattedReview);
  // };

  console.log(reviewValue.review);
  return (
    <S.ReviewFormContainer>
      <Flex $gap="19px" $align="center">
        <img className="course_img" src={img} alt="" />
        <Flex direction="column" $gap="4px">
          <Flex $gap="4px" $align="center">
            <Text $typography="t12" color="grey2">
              서울
            </Text>
            <Text $typography="t12" color="grey2">
              -
            </Text>
            <Text $typography="t12" color="grey2">
              부산
            </Text>
          </Flex>
          <Text $typography="t16" $bold={true}>
            대한민국 여행
          </Text>
        </Flex>
      </Flex>
      <Text
        as="div"
        $typography="t12"
        $bold={true}
        color="grey2"
        style={{ marginTop: '16px' }}
      >
        별점등록(0/5)
      </Text>

      <div className="stars-box"></div>

      <Text
        as="div"
        $typography="t12"
        $bold={true}
        color="grey2"
        style={{ marginTop: '16px' }}
      >
        리뷰 (0/100)
      </Text>

      <textarea
        placeholder="리뷰를 작성해 주세요."
        onChange={onChangeReview}
        value={reviewValue.review}
      />

      <div className="card-bottom">
        <BaseButton size="large" onClick={() => {}}>
          작성 완료
        </BaseButton>
      </div>
    </S.ReviewFormContainer>
  );
}

export default ReviewForm;
