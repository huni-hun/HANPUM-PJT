import Header from '@/components/common/Header/Header';
import ReviewForm from '@/components/My/ReviewForm';
import { colors } from '@/styles/colorPalette';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function ReviewPage() {
  const navigate = useNavigate();
  return (
    <ReviewPageContainer>
      <Header
        purpose="title"
        title="리뷰작성"
        clickBack={() => {
          navigate(-1);
        }}
      />
      <ReviewForm />
    </ReviewPageContainer>
  );
}

export default ReviewPage;

const ReviewPageContainer = styled.div`
  width: 100vw;
  height: 100%;
  background-color: ${colors.white};
`;
