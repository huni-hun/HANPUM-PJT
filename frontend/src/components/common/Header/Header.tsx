import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './Header.styled';
import Icon from '../Icon/Icon';
import Flex from '../Flex';
import Text from '../Text';
import api from '@/api';

interface HeaderProps {
  purpose: string;
  title?: string;
  arrive?: string;
  depart?: string;
  clickBack: () => void;
}

const Header = ({ purpose, title, arrive, depart, clickBack }: HeaderProps) => {
  const navigate = useNavigate();
  const onClickHandler = (to: string) => {
    navigate(`/${to}`);
  };

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
      case 'root':
        return (
          <Flex $align="center" $justify="center">
            <Flex direction="column" $gap={4}>
              <Text as="div" $bold={true} $typography="t10" color="grey2">
                출발지
              </Text>
              <Text as="div" $bold={true} $typography="t12">
                {depart}
              </Text>
            </Flex>

            <Flex direction="column" $gap={4}>
              <Text as="div" $bold={true} $typography="t10" color="grey2">
                도착지
              </Text>
              <Text as="div" $bold={true} $typography="t12">
                {arrive}
              </Text>
            </Flex>
          </Flex>
        );
      case 'merge':
        return (
          <Flex style={{ marginLeft: '4.4rem' }} $align="center">
            <input type="text" />
            <Flex $gap={20} style={{ width: 'auto', marginLeft: '9px' }}>
              <Icon
                name="IconBookMarkInHeader"
                size={14}
                onClick={() => onClickHandler('noti')}
              />
              <Icon
                name="IconNotification"
                onClick={() => onClickHandler('noti')}
                size={14}
              />
              <Icon
                name="IconUser"
                onClick={() => onClickHandler('my')}
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
              <input type="text" />
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
                clickBack();
              }}
            />
            <Text as="div" $bold={true} $typography="t20">
              {title}
            </Text>

            <div
              style={{ position: 'absolute', right: 16 }}
              onClick={() => {
                // 프로필 편집으로
              }}
            >
              <Icon name="IconConfig" />
            </div>
          </Flex>
        );

      default:
        return (
          <S.HeaderWrapper>
            <Flex $justify="end">
              <Icon
                name="IconNotification"
                onClick={() => onClickHandler('noti')}
                size={14}
              />
              <Icon
                name="IconUser"
                onClick={() => onClickHandler('my')}
                size={14}
              />
            </Flex>
          </S.HeaderWrapper>
        );
    }
  };

  return (
    <>
      <S.HeaderWrapper>
        <Icon
          name="IconBackArrow"
          className="back-arrow"
          size={15}
          onClick={() => {
            clickBack();
          }}
        />
        {renderHeader()}
      </S.HeaderWrapper>
      {/* <Outlet /> */}
    </>
  );
};

export default Header;
