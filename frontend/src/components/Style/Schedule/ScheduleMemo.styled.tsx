import styled from 'styled-components';

export const Container = styled.div`
  width: 85vw;
  height: 100%;
  box-sizing: border-box;
  margin: auto;
`;

export const AttractionCard = styled.div`
  width: 90%;
  height: 30vw;
  display: flex;
  align-items: center;
  margin: 0 auto;
  .img_wrap {
    width: 20vw;
    height: 20vw;
    border-radius: 1.4rem;
    box-sizing: border-box;
    margin-right: 2rem;
    img {
      width: 20vw;
      height: 20vw;
      border-radius: 1.4rem;
    }
  }

  .text_wrap {
    display: flex;
    flex-direction: column;
    height: 55%;
    justify-content: space-between;
    font-size: 1.2rem;

    h3 {
      font-weight: bold;
      font-size: 1.3rem;
    }
  }
`;

export const InputWrap = styled.div``;
