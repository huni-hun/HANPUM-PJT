import Flex from '../common/Flex';
import * as S from '../Style/My/ReviewForm.styled';
import img from '../../assets/img/mountain.jpg';
import Text from '../common/Text';
import { useState } from 'react';
import { formatAreaValue } from '@/utils/util';
import BaseButton from '../common/BaseButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { Rating } from '@mui/material';
import { SetRouteReview } from '@/api/route/POST';
import { toast } from 'react-toastify';

function ReviewForm() {
  const navigate = useNavigate();
  const [reviewValue, setReviewValue] = useState({
    review: '',
  });
  const [rating, setRating] = useState<number>(0);
  const location = useLocation();
  const info = { ...location.state };
  const onChangeReview = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewValue({ ...reviewValue, review: e.target.value });
  };

  const addReviewHandler = () => {
    SetRouteReview(info.courseId, reviewValue.review, rating, 0)
      .then((res) => {
        if (res.status === 200 && res.data.status === 'SUCCESS') {
          toast.done('리뷰를 성공적으로 작성하셨습니다.');
          navigate(-1);
        } else {
          if (res.data.message === '이미 리뷰를 작성한 회원입니다.') {
            toast.info('이미 리뷰를 작성하셨습니다.');
          }
        }
      })
      .catch((err) => {
        toast.error('리뷰 작성에 실패했습니다.');
      });
  };

  return (
    <S.ReviewFormContainer>
      <Flex $gap="19px" $align="center">
        <img className="course_img" src={info.img} alt="" />
        <Flex direction="column" $gap="4px">
          <Flex $gap="4px" $align="center">
            <Text $typography="t12" color="grey2">
              {info.start}
            </Text>
            <Text $typography="t12" color="grey2">
              -
            </Text>
            <Text $typography="t12" color="grey2">
              {info.end}
            </Text>
          </Flex>
          <Text $typography="t16" $bold={true}>
            {info.title}
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
        별점등록({rating}/5)
      </Text>

      <div className="stars-box">
        <Rating
          name="rating"
          value={rating}
          onChange={(event: any, newValue: number | null) => {
            if (newValue !== null) {
              setRating(newValue);
            }
          }}
          precision={0.5}
          size="large"
          sx={{
            fontSize: '4.5rem',
          }}
        />
      </div>

      <Text
        as="div"
        $typography="t12"
        $bold={true}
        color="grey2"
        style={{ marginTop: '16px' }}
      >
        리뷰 ({reviewValue.review.length}/100)
      </Text>

      <textarea
        placeholder="리뷰를 작성해 주세요."
        onChange={onChangeReview}
        value={reviewValue.review}
      />

      <div className="card-bottom">
        <BaseButton
          size="large"
          onClick={() => {
            addReviewHandler();
          }}
        >
          작성 완료
        </BaseButton>
      </div>
    </S.ReviewFormContainer>
  );
}

export default ReviewForm;
