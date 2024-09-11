import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './Header.styled';
import Icon from '../Icon/Icon';
import Flex from '../Flex';
import Text from '../Text';
import logo from '../../../assets/img/logo2.png';

interface HeaderProps {
  purpose: string;
  title?: string;
  arrive?: string;
  depart?: string;
  back?: boolean;
  $isShadow?: boolean;
  $isborder?: boolean;
  $isGrey?: boolean;
  searchValue?: string;
  clickBack: () => void;
  complete?: () => void;
  focus?: boolean;
  clickOption?: () => void;
  changeEven?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  keyDownEven?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  plusBtnclick?: () => void;
  /** 일정 & 모임 구분 */
  isSchedule?: boolean;
  readonly?: boolean;
}

const Header = ({
  purpose,
  title,
  arrive,
  depart,
  back,
  clickBack,
  complete,
  focus,
  clickOption,
  $isborder = false,
  $isShadow = false,
  changeEven,
  keyDownEven,
  searchValue,
  plusBtnclick,
  $isGrey = false,
  isSchedule,
  readonly = false,
}: HeaderProps) => {
  const navigate = useNavigate();
  const onClickHandler = (to: string) => {
    navigate(`/${to}`);
  };

  const path = useLocation().pathname.substring(1);

  //  default(알림, user만 있는)
  // title(약관동의, 회원정보 등)
  // result(글씨가 왼쪽에 붙어있는)
  // root(출발지, 도착지 있는)
  // merge(검색창, 북마크, 알림, user가 다 합쳐져 있는)
  // search-place(w장소이름, 주소 검색)
  // search(돋보기 검색창)
  // back(뒤로가기)
  // mypage(우측에 톱니바퀴)

  const renderHeader = () => {
    switch (purpose) {
      case 'title':
        return (
          <Flex $align="center" $justify="center">
            <Icon
              name="IconBackArrow"
              className="back-arrow"
              size={15}
              onClick={() => {
                clickBack();
              }}
            />
            <Text as="div" $bold={true} $typography="t20">
              {title}
            </Text>
          </Flex>
        );

      case 'result':
        return (
          <Flex $align="center" style={{ paddingLeft: '4.7rem' }}>
            <Icon
              name="IconBackArrow"
              className="back-arrow"
              size={15}
              onClick={() => {
                clickBack();
              }}
            />
            <Text as="div" $bold={true} $typography="t20">
              {title}
            </Text>
          </Flex>
        );

      case 'meet':
        return (
          <Flex $justify="space-between" $align="center">
            <img
              onClick={() => navigate('/')}
              src={logo}
              alt="logo"
              style={{ width: '3.1rem', height: '3rem' }}
            />
            <Flex $gap={16} style={{ width: 'auto' }}>
              <Icon
                name="IconFilter"
                onClick={() => onClickHandler('meet/filter')}
                size={20}
              />
              <Icon
                name="IconHeaderPlus"
                // onClick={() => onClickHandler('mypage')}
                onClick={() => {
                  onClickHandler('meet/addMain');
                }}
                size={20}
              />
              <Icon
                name="IconUser"
                onClick={() => onClickHandler('mypage')}
                size={20}
              />
            </Flex>
          </Flex>
        );

      case 'root':
        return (
          <Flex $align="center" $justify="center">
            <Flex></Flex>
            <Flex direction="column" $gap={4} $align="end">
              <Text as="div" $bold={true} $typography="t10" color="grey2">
                출발지
              </Text>
              <Text as="div" $bold={true} $typography="t12">
                {depart}
              </Text>
            </Flex>
            <Flex $justify="center" $align="center">
              <Icon name="IconGreyLeftArrow" size={15} />
            </Flex>
            <Flex direction="column" $gap={4} $align="start">
              <Text as="div" $bold={true} $typography="t10" color="grey2">
                도착지
              </Text>
              <Text as="div" $bold={true} $typography="t12">
                {arrive}
              </Text>
            </Flex>
            <Flex></Flex>
          </Flex>
        );
      case 'route-detail':
        return (
          <Flex $align="center" $justify="end">
            <Icon
              name="IconBackArrow"
              className="back-arrow"
              size={15}
              onClick={clickBack}
            />
            <Icon name="IconOption" size={15} onClick={clickOption} />
          </Flex>
        );
      case 'merge':
        return (
          <Flex $align="center" $justify="space-between">
            {!isSchedule ? (
              <div className="search-bar" onClick={clickOption}>
                <Icon name="IconSearch" size={14} />
                <input type="text" />
              </div>
            ) : (
              <img
                onClick={() => navigate('/')}
                src={logo}
                alt="logo"
                style={{ width: '3.1rem', height: '3rem' }}
              />
            )}
            <Flex
              $gap={20}
              style={{
                width: 'auto',
                marginLeft: 8,
              }}
              $justify="space-around"
            >
              <Icon name="IconHeaderPlus" onClick={plusBtnclick} size={14} />
              <Icon
                name="IconUser"
                onClick={() => onClickHandler('mypage')}
                size={14}
              />
            </Flex>
          </Flex>
        );
      case 'search-place':
        return (
          <Flex style={{ marginLeft: '2rem' }} $align="start">
            <input
              className="place-input"
              style={{ height: '4.8rem' }}
              type="text"
              placeholder="장소 이름, 주소로 검색해보세요."
            />
          </Flex>
        );

      case 'search':
        return (
          <Flex style={{ marginLeft: '2rem' }} $align="start">
            <div className="search-bar">
              <Icon name="IconSearch" size={14} />
              <input
                type="text"
                onChange={changeEven}
                onKeyDown={keyDownEven}
                value={searchValue}
                onClick={clickOption}
                readOnly={readonly}
              />
            </div>
          </Flex>
        );

      case 'back':
        return <Flex style={{ marginLeft: '2rem' }} $align="start"></Flex>;

      case 'mypage':
        return (
          <Flex $align="center" $justify="center">
            <Icon
              name="IconBackArrow"
              className="back-arrow"
              size={15}
              onClick={() => {
                console.log('눌림');
                clickBack();
              }}
            />
            <Text as="div" $bold={true} $typography="t20">
              {title}
            </Text>

            <div
              style={{ position: 'absolute', right: 16 }}
              onClick={() => navigate('/config')}
            >
              {/* <Icon name="IconConfig" /> */}
            </div>
          </Flex>
        );

      case 'complete':
        return (
          <Flex $align="end" $justify="center">
            <Icon
              name="IconBackArrow"
              className="back-arrow"
              size={15}
              onClick={() => {
                navigate('/myprofile');
              }}
            />
            <Text as="div" $bold={true} $typography="t20">
              {title}
            </Text>

            <div style={{ position: 'absolute', right: 16 }} onClick={complete}>
              <Text $typography="t16" color={focus ? 'main' : 'grey2'}>
                완료
              </Text>
            </div>
          </Flex>
        );

      case 'route-retouch':
        return (
          <Flex $align="end" $justify="center">
            <div style={{ position: 'absolute', left: 16 }} onClick={clickBack}>
              <Text $typography="t16" color={'red'}>
                취소
              </Text>
            </div>

            <div
              style={{ position: 'absolute', right: 16 }}
              onClick={clickOption}
            >
              <Text $typography="t16" color={'main'}>
                완료
              </Text>
            </div>
          </Flex>
        );

      case 'main':
        return (
          <Flex $justify="space-between" $align="center">
            <img
              onClick={() => navigate('/')}
              src={logo}
              alt="logo"
              style={{ width: '3.1rem', height: '3rem' }}
            />
            <Icon
              name="IconUser"
              onClick={() => onClickHandler('mypage')}
              size={20}
            />
          </Flex>
        );
      case 'schedule':
        return (
          <>
            <Flex $align="center" $justify="space-between">
              <S.TextWrap>
                <Text as="div">
                  <Icon
                    name="IconBackArrow"
                    className="back-arrow"
                    size={15}
                    onClick={clickBack}
                  />
                </Text>

                <Text as="div" $bold={true} $typography="t15" color="black1">
                  {title}
                </Text>
              </S.TextWrap>
              <Icon name="IconOption" size={15} onClick={clickOption} />
            </Flex>
          </>
        );

      case 'meet-detail':
        return (
          <>
            <Flex $align="center" $justify="space-between">
              <S.MeetTextWrap>
                <Text as="div">
                  <Icon
                    name="IconBackArrow"
                    className="back-arrow"
                    size={15}
                    onClick={clickBack}
                  />
                </Text>

                <Text as="div" $bold={true} $typography="t15" color="black1">
                  {title}
                </Text>
              </S.MeetTextWrap>
              <Icon name="IconOption" size={15} onClick={clickOption} />
            </Flex>
          </>
        );
    }
  };

  return (
    <>
      <S.HeaderWrapper
        $isShadow={$isShadow}
        $isborder={$isborder}
        $isGrey={$isGrey}
      >
        {back && (
          <Icon
            name="IconBackArrow"
            className="back-arrow"
            size={15}
            onClick={clickBack}
          />
        )}
        {renderHeader()}
      </S.HeaderWrapper>
    </>
  );
};

export default Header;
