import Header from '@/components/common/Header/Header';
import { returnConfigTitle } from '@/utils/util';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Announcement from './Announcement';

type ConfigType = 'announcement' | 'policy' | 'withdraw';

function ConfigLayout() {
  const param = useParams().category?.split(':')[1] as ConfigType;
  console.log(param);
  const navigate = useNavigate();
  return (
    <div>
      <Header
        purpose="title"
        title={returnConfigTitle(param)}
        clickBack={() => {
          navigate(-1);
        }}
      />

      {param === 'announcement' && <Announcement param={param} />}
    </div>
  );
}

export default ConfigLayout;
