import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import * as S from './Header.styled';
import Icon from '../Icon/Icon';
import Flex from '../Flex';
import { PATH } from '@/constants';

const Header = () => {
  const navigate = useNavigate();
  const onClickHandler = (to: string) => {
    navigate(`/${to}`);
  };

  const path = useLocation().pathname.substring(1);
  console.log(path);

  // TODO
  // 1. path를 기준으로 state를 만들고 그걸로 Header 분기처리

  return (
    <>
      <S.HeaderWrapper>
        <Icon name="IconNotification" onClick={() => onClickHandler('noti')} />
        <Icon name="IconUser" onClick={() => onClickHandler('my')} />
      </S.HeaderWrapper>
      <Outlet />
    </>
  );
};

export default Header;
