import Text from '@/components/common/Text';
import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

function PersonalInformationText() {
  return (
    <PersonalInformationContainer>
      <div className="section">
        <Text $typography="t14" $bold={true}>
          제1조(목적)
        </Text>
        <Text $typography="t12" color="grey2" style={{ lineHeight: '19px' }}>
          한품(이하 ‘회사’라고 함)는 회사가 제공하고자 하는 서비스(이하 ‘회사
          서비스’)를 이용하는 개인(이하 ‘이용자’ 또는 ‘개인’)의 정보(이하
          ‘개인정보’)를 보호하기 위해, 개인정보보호법, 정보통신망 이용촉진 및
          정보보호 등에 관한 법률(이하 ‘정보통신망법’) 등 관련 법령을 준수하고,
          서비스 이용자의 개인정보 보호 관련 고충을 신속하고 원활하게 처리할 수
          있도록 다음과 같이 개인정보처리방침(이하 ‘본 방침’)을 수립합니다.
        </Text>
      </div>

      <div className="section">
        <Text $typography="t14" $bold={true}>
          제2조(개인정보 처리의 원칙)
        </Text>
        <Text $typography="t12" color="grey2" style={{ lineHeight: '19px' }}>
          개인정보 관련 법령 및 본 방침에 따라 회사는 이용자의 개인정보를 수집할
          수 있으며, 수집된 개인정보는 개인의 동의가 있는 경우에 한해 제3자에게
          제공될 수 있습니다. 단, 법령의 규정 등에 의해 적법하게 강제되는 경우,
          회사는 수집한 이용자의 개인정보를 사전에 개인의 동의 없이 제3자에게
          제공할 수도 있습니다.
        </Text>
      </div>

      <div className="section">
        <Text $typography="t14" $bold={true}>
          제3조(본 방침의 변경)
        </Text>
        <ol>
          <li>
            본 방침은 개인정보 관련 법령, 지침, 고시 또는 정부나 회사 서비스의
            정책에 따라 개정될 수 있습니다.
          </li>
          <li>
            회사는 제1항에 따라 본 방침을 개정하는 경우, 다음 각 호 중 하나
            이상의 방법으로 공지합니다.
            <div className="second-text">
              가. 회사가 운영하는 인터넷 홈페이지의 첫 화면의 공지사항란 또는
              별도의 창을 통해 공지하는 방법
            </div>
            <div className="second-text">
              나. 서면, 모사전송, 전자우편 또는 이와 비슷한 방법으로 이용자에게
              공지하는 방법
            </div>
          </li>
          <li>
            회사는 제2항의 공지는 본 방침 개정의 시행일로부터 최소 7일 이전에
            공지합니다. 다만, 이용자 권리의 중요한 변경이 있을 경우에는 최소
            30일 전에 공지합니다.
          </li>
        </ol>
      </div>

      <div className="section">
        <Text $typography="t14" $bold={true}>
          제4조(처리하는 개인정보 항목 및 수집방법)
        </Text>
        <ol>
          <li>
            회사는 안정적인 서비스 제공 및 운영을 위해 회원 가입시 또는 서비스
            이용과정에서 귀하의 개인정보를 수집 및 이용하고 있습니다.
          </li>
          <li>
            처리하고 있는 개인정보의 항목은 다음과 같습니다.
            <div className="second-text">
              가. 회원가입 및 관리 : 이메일 주소, 비밀번호, 이름, 닉네임,
              생년월일 및 휴대폰 번호
            </div>
            <div className="second-text">
              나. 서비스 제공 및 운영 : 국토대장정 일정(경우지, 메모)
            </div>
            <div className="second-text">
              * 외부 플랫폼(Kakao) 계졍 연동 시 일부 계정 정보(회원 식별 번호)가
              수집될 수 있습니다
            </div>
            <div className="second-text">
              * 서비스 이용 및 제공과정에서 서비스 이용 기록(방문
              일시(접속기록), IP주소, 부정 이용 기록) 및 디바이스
              정보(이동통신사, OS정보, 기종 및 모델명, 사용 언어, 기기
              고유식별번호, 광고 식별자), 쿠키가 생성 및 수집 될 수 있으며,
              수집되는 정보는 개인정보와의 연계 여부 둥에 따라 개인정보에 해당할
              수 있고, 개인정보에 해당하지 않을 수도 있습니다.
            </div>
          </li>
          <li>
            개인정보 수집 방법은 다음과 같습니다.
            <div className="second-text">
              가. 서비스 사용 중 이용자의 자발적 제공을 통한 수집
            </div>
            <div className="second-text">
              나. 서비스 제공을 위해 Kakao에서 제공받아 수집
            </div>
          </li>
        </ol>
      </div>

      <div className="section">
        <Text $typography="t14" $bold={true}>
          제5조(개인정보 처리 목적)
        </Text>
        <Text $typography="t12" color="grey2" style={{ lineHeight: '19px' }}>
          회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
          개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이
          변경되는 경우에는 개인정보 보호법 제18조 등 관계 법령에 따라 별도의
          동의를 받는 등 필요한 조치를 이행할 예정입니다.
        </Text>
        <ol>
          <li>회원가입 및 관리</li>
          <li>서비스 제공 및 운영</li>
          <li>고객지원 서비스</li>
        </ol>
      </div>

      <div className="section">
        <Text $typography="t14" $bold={true}>
          제6조(개인정보의 처리 위탁)
        </Text>
        <Text $typography="t12" style={{ lineHeight: '19px' }}>
          회사는 원할한 개인정보 업무 처리를 위해 다음과 같이 개인정보 처리
          업무를 위탁하고 있습니다.
        </Text>
        <ol>
          <li>수탁 업체 : Amazon Web Services</li>
          <li>수탁업체의 위치: 대한민국</li>
          <li>
            위탁 일시 및 방법: 수집 시점에 암호화 통신을 통해 AWS 대한민국
            리전으로 이전
          </li>
          <li>위탁 업무 내용: 클라우드 서버 운영 및 관리</li>
          <li>
            개인정보 보유 및 이용기간: 회원탈퇴 시 혹은 클라우드 서비스 계약
            종료 시
          </li>
        </ol>
      </div>

      <div className="section">
        <Text $typography="t14" $bold={true}>
          제7조(개인정보의 파기 원칙)
        </Text>
        <Text $typography="t12" color="grey2" style={{ lineHeight: '19px' }}>
          회사는 원칙적으로 이용자의 개인정보 처리 목적의 달성, 보유·이용 기간의
          경과 등 개인정보가 필요하지 않을 경우에는 해당 정보를 지체 없이
          파기합니다.
        </Text>
        <div className="highlight-box">
          <Text $typography="t12" $bold={true} style={{ lineHeight: '19px' }}>
            파기방법:
          </Text>
          <Text $typography="t12" style={{ lineHeight: '19px' }}>
            전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을
            사용합니다.
          </Text>
        </div>
      </div>

      <div className="section">
        <Text $typography="t14" $bold={true}>
          제8조(이용자의 의무)
        </Text>
        <ol>
          <li>
            이용자는 자신의 개인정보를 최신 상태로 유지해야 하며, 이용자의
            부정확한 정보 입력으로 발생하는 문제의 책임은 이용자 자신에게
            있습니다.
          </li>
          <li>
            타인의 개인정보를 도용한 회원가입의 경우, 이용자 자격을 상실하거나
            관련 개인정보보호 법령에 의해 처벌받을 수 있습니다.
          </li>
          <li>
            이용자는 전자우편주소, 비밀번호 등에 대한 보안을 유지할 책임이
            있으며, 제3자에게 이를 양도하거나 대여할 수 없습니다.
          </li>
        </ol>
      </div>

      <div className="section">
        <Text $typography="t14" $bold={true}>
          제9조(개인정보 유출 등에 대한 조치)
        </Text>
        <Text $typography="t12" color="grey2" style={{ lineHeight: '19px' }}>
          회사는 개인정보의 분실, 도난, 유출(이하 "유출 등"이라 한다) 사실을
          알게 되었을 때, 지체 없이 다음 각 호의 모든 사항을 해당 이용자에게
          알리고 방송통신위원회 또는 한국인터넷진흥원에 신고합니다.
        </Text>
        <ol>
          <li>유출 등이 된 개인정보 항목</li>
          <li>유출 등이 발생한 시점</li>
          <li>유출 등의 사실과 그 후 조치에 관한 대응 조치</li>
          <li>피해를 최소화하기 위하여 이용자가 할 수 있는 방법</li>
          <li>회사의 대응 조치 및 피해 구제 절차</li>
        </ol>
      </div>

      <div className="section">
        <Text $typography="t14" $bold={true}>
          제10조(권익침해에 대한 구제방법)
        </Text>
        <ol>
          <li>
            정보주체는 개인정보침해로 인한 구제를 받기 위하여
            개인정보분쟁조정위원회, 한국인터넷진홍원 개인 정보침해신고센터 등에
            분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타
            개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기
            바랍니다.
            <div className="second-text">
              가. 개인정보분쟁조정위원회 : (국번없이) 1833-6972
              (www.kopico.go.kr)
            </div>
            <div className="second-text">
              나. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)
            </div>
            <div className="second-text">
              다. 대검찰청 : (국번없이) 1301 (www.spo.go.kr)
            </div>
            <div className="second-text">
              라. 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)
            </div>
          </li>
          <li>
            회사는 정보주체의 개인정보자기결정권을 보장하고, 개인정보침해로 인한
            상담 및 피해 구제를 위해 노 력하고있으며, 신고나상담이 필요한경우제
            1항의 담당부서로연락해주시기 바랍니다.
          </li>
          <li>
            개인정보 보호법 제 35조(개인정보의 열람), 제 36조(개인정보의
            정정·삭제), 제 37조(개인정보의 처리정 지 등)의 규정에 의한 요구에 대
            하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의
            침해를받은자는행정심판법이 정하는바에
            따라행정심판을청구할수있습니다.
            <div className="second-text">
              가. 중앙행정심판위원회 : (국번없이) 110 (www.simpan.go.kr)
            </div>
          </li>
        </ol>
      </div>

      <div className="section">
        <Text $typography="t14" $bold={true}>
          본 방침은 2024.09.09부터 시행됩니다.
        </Text>

        <Text $typography="t12" color="grey2">
          최종 수정일 2024.09.09
        </Text>
      </div>
    </PersonalInformationContainer>
  );
}

export default PersonalInformationText;

const PersonalInformationContainer = styled.div`
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
        .second-text {
          padding-left: 5px;
        }
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
