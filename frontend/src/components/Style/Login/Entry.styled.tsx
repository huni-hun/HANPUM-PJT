import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const EntryContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    margin: 65px 0 23.52px;
  }

  .round {
    width: 100%;
    height: 100%;
    .round_bg {
      margin-top: 32px;
      height: 100%;
      position: relative;
      overflow: hidden;
      width: 100%;
      padding-bottom: 5rem;

      .circle {
        width: 560px;
        opacity: 0.3;
        background-color: ${colors.main}; /* 초록색 배경 */
        border-radius: 300px 300px 0 0;

        height: 100%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }

      .flag_img {
        position: absolute;
        left: 37px;
        top: 23px;
      }
      .human_img {
        position: absolute;
        right: 27.22px;
        top: 156px;
      }

      .login_group {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 12px;
        position: absolute;
        top: 350px;
        .kakao_login {
          width: 26.9rem;
          height: 4.8rem;
          background-color: ${colors.yellow};
          font-size: 1.3rem;
          color: #191919;
          border-radius: 12px;

          padding: 0 13px;
          box-sizing: border-box;

          a {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            text-decoration: none;
            color: ${colors.black3};

            span {
              flex: 1;
              text-align: center;
            }
          }
        }
        .local_login {
          width: 26.9rem;
          height: 4.8rem;
          border-radius: 12px;
          background-color: ${colors.main};
          font-weight: bold;
          color: ${colors.white};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
        }
      }
    }
  }
`;
