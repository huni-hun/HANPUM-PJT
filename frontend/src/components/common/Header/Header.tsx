import { Outlet, useNavigate } from 'react-router-dom';
import * as S from './Header.styled';
import Icon from '../Icon/Icon';
import Flex from '../Flex';

const Header = () => {
  const navigate = useNavigate();
  const onClickHandler = (to: string) => {
    navigate(`/${to}`);
  };
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
