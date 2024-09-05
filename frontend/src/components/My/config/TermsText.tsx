import Text from '@/components/common/Text';
import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

function TermsText() {
  return (
    <TermsContainer>
      <div className="section">
        <Text $typography="t14" $bold={true}>
          제 1조 (목적)
        </Text>
        <Text $typography="t12" color="grey2" style={{ lineHeight: '19px' }}>
          이 약관은 국토 대장정 플랫폼 한품(이하 "한품" 또는 "서비스")이
          제공하는 서비스의 이용과 관련하여 서비스와 이용자의 권리, 의무, 책임
          사항 및 절차 등을 규정 함을 목적으로 합니다.
        </Text>
      </div>

      <div className="section">
        <Text $typography="t14" $bold={true}>
          제 2조 (정의)
        </Text>
        <ol>
          <li>
            이용자: 이 약관에 따라 서비스에 접속하여, 한품이 제공하는 모든
            서비스를 이용하는 회원 및 비회원.
          </li>
          <li>
            회원: 한품에 개인정보를 제공하여 회원 등록을 한 자로서, 서비스를
            지속적으로 이용할 수 있는 자.
          </li>
          <li>비회원: 회원으로 가입하지 않고 서비스를 이용하는 자.</li>
          <li>
            게시물: 이용자가 서비스를 이용함에 있어 서비스에 게시한 글, 사진,
            동영상 등의 콘텐츠.
          </li>
        </ol>
      </div>

      <div className="section">
        <Text $typography="t14" $bold={true}>
          제 3조 (약관의 효력 및 변경)
        </Text>
        <ol>
          <li>
            이 약관은 이용자가 동의한 후 서비스에 가입함과 동시에 효력을
            발생합니다.
          </li>
          <li>
            한품은 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 이 약관을
            변경할 수 있으며, 변경된 약관은 공지사항을 통해 공지됩니다.
          </li>
          <li>
            이용자가 변경된 약관에 동의하지 않을 경우, 서비스 이용을 중단하고
            회원 탈퇴를 할 수 있습니다.
          </li>
        </ol>
      </div>

      <div className="section">
        <Text $typography="t14" $bold={true}>
          제 4조 (이용계약 체결)
        </Text>
        <ol>
          <li>
            이용계약은 이용자가 서비스 가입 시 약관에 동의하고, 한품이 이를
            승인함으로써 성립됩니다.
          </li>
          <li>
            한품은 다음 각 호에 해당하는 신청에 대해서는 승인을 거절하거나,
            사후에 이용계약을 해지할 수 있습니다.
          </li>
        </ol>
        <div className="text-box">
          <Text color="grey2">
            1) 허위 정보를 기재하거나, 타인의 정보를 도용한 경우
          </Text>
          <Text color="grey2">
            2) 법령 또는 약관을 위반하여 이용이 제한된 이력이 있는 경우
          </Text>
          <Text color="grey2">3) 기타 부적절한 이용으로 판단되는 경우</Text>
        </div>
      </div>

      <div className="section">
        <Text $typography="t14" $bold={true}>
          제 5조 (개인정보 보호)
        </Text>
        <ol>
          <li>
            한품은 이용자의 개인정보를 보호하기 위해 최선을 다하며, 관련 법령에
            따라 이를 처리합니다.
          </li>
          <li>
            이용자는 개인정보의 변경이 있을 경우, 즉시 한품에 알리며, 이를
            이행하지 않아 발생하는 불이익에 대해서는 한품이 책임지지 않습니다.
          </li>
        </ol>
      </div>
    </TermsContainer>
  );
}

export default TermsText;

const TermsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  .section {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
    ol {
      padding-left: 16px;
      font-size: 1.2rem;
      color: ${colors.grey2};
      line-height: 19px;
      list-style: auto;
      li {
        margin-top: 12px;
      }
    }

    .text-box {
      display: flex;
      flex-direction: column;
      gap: 19px;
      padding: 8px 20px;
      border-radius: 12px;
      background-color: #f3f4f8;
    }
  }
`;
