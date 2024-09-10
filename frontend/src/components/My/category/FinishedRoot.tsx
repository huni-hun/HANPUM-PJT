import React from 'react';
import * as S from '../../Style/My/category/FinishedRoot.styled';
import RootCard from '../../RootCard';
import { useQuery } from 'react-query';
import { GetUseRouteList } from '@/api/mypage/GET';
import { STATUS } from '@/constants';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

function FinishedRoot() {
  const { data: finishedRoute } = useQuery('GetUseRouteList', GetUseRouteList, {
    onSuccess: (res) => {
      // console.log('res ::', res.data);
      if (res.status === STATUS.success) {
      } else if (res.status === STATUS.error) {
        toast.error(res.message);
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });
  return (
    <S.FinishedRootContainer>
      <div className="card-list">
        {finishedRoute &&
          finishedRoute.status === 'SUCCESS' &&
          finishedRoute.data.map((ele: any) => <RootCard {...ele} />)}
      </div>
    </S.FinishedRootContainer>
  );
}

export default FinishedRoot;
