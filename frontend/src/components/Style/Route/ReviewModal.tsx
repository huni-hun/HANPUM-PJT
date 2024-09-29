import Icon from '@/components/common/Icon/Icon';
import * as R from '@/components/Style/Route/ReviewModal.styled';
import Rating from '@mui/material/Rating';
import { useEffect, useState } from 'react';
import Button from '@/components/common/Button/Button';
import { colors } from '@/styles/colorPalette';
import { SetRouteReview } from '@/api/route/POST';
import { toast } from 'react-toastify';
import { UpdateReview } from '@/api/route/PUT';
import { ReviewDelete } from '@/api/route/Delete';

interface ReviewModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isVisible: boolean;
  routeid: string;
  type: string;
  beforeReview: string;
  beforeRating: number;
  setBeforeRating: React.Dispatch<React.SetStateAction<number>>;
  setBeforeReview: React.Dispatch<React.SetStateAction<string>>;
  reviewId: number;
  setReviewId: React.Dispatch<React.SetStateAction<number>>;
}

function ReviewModal(props: ReviewModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');

  useEffect(() => {
    setRating(props.beforeRating);
    setReview(props.beforeReview);
  }, []);

  const reviewAddHandler = () => {
    if (props.type === '생성') {
      SetRouteReview(props.routeid, review, rating, 0)
        .then((res) => {
          if (res.status === 200 && res.data.status === 'SUCCESS') {
            props.setIsOpen(false);
          } else {
            if (res.data.message === '이미 리뷰를 작성한 회원입니다.') {
              props.setIsOpen(false);
              toast.info('이미 리뷰를 작성하셨습니다.');
            }
          }
        })
        .catch((err) => {
          toast.error('리뷰 작성에 실패했습니다.');
        });
    } else {
      UpdateReview(props.routeid, review, rating, props.reviewId)
        .then((res) => {
          if (res.status === 200 && res.data.status === 'SUCCESS') {
            props.setIsOpen(false);
            toast.info('리뷰를 성공적으로 수정했습니다.');
          } else {
            if (res.data.message === '이미 리뷰를 작성한 회원입니다.') {
              props.setIsOpen(false);
              toast.info('이미 리뷰를 작성하셨습니다.');
            }
          }
        })
        .catch((err) => {
          toast.error('리뷰 작성에 실패했습니다.');
        });
    }
  };

  const reviewDeleteHandler = () => {
    ReviewDelete(props.routeid)
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          modalClosed();
          toast.info(res.data.message);
        }
      })
      .catch((err) => {
        toast.error('경로 삭제 실패했습니다.');
      });
  };

  const modalClosed = () => {
    props.setBeforeRating(0);
    props.setBeforeReview('');
    props.setIsOpen(false);
    props.setReviewId(0);
  };

  return (
    <R.Container
      $isVisible={props.isVisible}
      onClick={() => {
        modalClosed();
      }}
    >
      <R.ModalCard
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <R.ModalHeader>
          리뷰 {props.type === '생성' ? '작성' : '수정'}
          <R.CloseBox
            onClick={(e) => {
              modalClosed();
            }}
          >
            <Icon name="IconClose" size={15} />
          </R.CloseBox>
          {props.type === '수정' && (
            <R.ReviewDeleteBox onClick={reviewDeleteHandler}>
              <Icon name="IconDeleteBlack" size={15} />
            </R.ReviewDeleteBox>
          )}
        </R.ModalHeader>
        <R.RatingBox>
          <R.RatingText>별점등록{` (${rating}/5)`}</R.RatingText>
          <R.Rating>
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
          </R.Rating>
        </R.RatingBox>
        <R.ReviewWriteBox>
          <R.ReviewTitle>리뷰{` (${review.length}/100)`}</R.ReviewTitle>
          <R.ReviewWrite
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
        </R.ReviewWriteBox>
        <R.BtnBox>
          <Button
            width={65}
            height={6}
            fc="ffffff"
            bc={rating > 0 && review.length > 0 ? '#1A823B' : colors.grey4}
            radius={0.7}
            fontSize={1.6}
            children={props.type === '생성' ? '작성완료' : '수정완료'}
            color="#ffffff"
            onClick={() => {
              reviewAddHandler();
            }}
          />
        </R.BtnBox>
      </R.ModalCard>
    </R.Container>
  );
}

export default ReviewModal;
