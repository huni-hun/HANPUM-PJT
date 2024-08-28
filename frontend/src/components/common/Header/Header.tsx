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
  back?: boolean;
  clickBack: () => void;
  clickOption?: () => void;
}

const Header = ({
  purpose,
  title,
  arrive,
  depart,
  back,
  clickBack,
  clickOption,
}: HeaderProps) => {
  const navigate = useNavigate();
  const onClickHandler = (to: string) => {
    navigate(`/${to}`);
  };

  const path = useLocation().pathname.substring(1);
  console.log(path);

  //  default(알림, user만 있는)
  // title(약관동의, 회원정보 등)
  // result(글씨가 왼쪽에 붙어있는)
  // root(출발지, 도착지 있는)
  // merge(검색창, 북마크, 알림, user가 다 합쳐져 있는)
  // search-place(w장소이름, 주소 검색)
  // search(돋보기 검색창)
  // back(뒤로가기)

  const renderHeader = () => {
    switch (purpose) {
      case 'title':
        return (
          <Flex $align="center" $justify="center">
            <Icon name="IconBackArrow" className="back-arrow" size={15} />
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
            <div className="search-bar">
              <Icon name="IconSearch" size={14} />
              <input type="text" />
            </div>
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
        {back && <Icon name="IconBackArrow" className="back-arrow" size={15} />}
        {renderHeader()}
      </S.HeaderWrapper>
      {/* <Outlet /> */}
    </>
  );
};

export default Header;
