import { useMutation, useQuery } from 'react-query';
import * as S from '../../Style/My/config/ConfigItem.styled';
import { GetUser } from '@/api/mypage/GET';
import Text from '@/components/common/Text';
import Flex from '@/components/common/Flex';
import { STATUS, WITHDRAW } from '@/constants';
import { useState } from 'react';
import BaseButton from '@/components/common/BaseButton';
import { useAlert } from '@/hooks/global/useAlert';
import { WithdrawMembership } from '@/api/mypage/Delete';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

function Withdraw() {
  const { data } = useQuery('getUser', GetUser);
  const navigate = useNavigate();
  // console.log(data);

  const [agree, setAgree] = useState(true);

  const { open } = useAlert();

  const { mutate: withdrawMembership } = useMutation(WithdrawMembership, {
    onSuccess: (res) => {
      if (res.status === STATUS.success) {
        toast.success(res.message);
        localStorage.removeItem('token');
        navigate('/login');
      }
      if (res.status === STATUS.error) {
        toast.error(res.message);
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  const handleClickAlert = () => {
    open({
      purpose: 'withdraw',
      onButtonClick: (cancel?: boolean) => {
        if (cancel) {
        } else {
          withdrawMembership();
        }
      },
    });
  };

  return (
    <S.WithdrawContainer>
      {data && (
        <>
          <div className="text-box">
            <Flex direction="column" $gap={8}>
              <Flex>
                <Text $typography="t20" $bold={true}>
                  안녕하세요,
                </Text>
                <Text $typography="t20" $bold={true} color="main">
                  {data.data.name}님
                </Text>
              </Flex>
              <Text $typography="t14">
                탈퇴 전 아래의 내용을 다시 한 번 확인해주세요.
              </Text>
            </Flex>
          </div>

          <Flex direction="column" $gap={12} style={{ margin: '12px auto' }}>
            {WITHDRAW.map((section) => (
              <div className="section" key={section.id}>
                <Text $typography="t14" $bold={true}>
                  {section.title}
                </Text>
                <Text $typography="t14" color="grey2">
                  {section.desc}
                </Text>
              </div>
            ))}
          </Flex>

          <div className="text-box">
            <Text $typography="t14">
              정말로 탈퇴를 원하시면 아래의 [탈퇴하기] 버튼을 눌러 주시기
              바랍니다.
            </Text>
          </div>

          <div className="agree-box">
            <Text
              $typography="t14"
              color={!agree ? 'main' : 'grey2'}
              $bold={!agree}
            >
              안내사항을 확인하였으며, 이에 동의 합니다.
            </Text>
            <div
              className={agree ? 'agree' : 'agree check'}
              onClick={() => setAgree(!agree)}
            />
          </div>

          <Flex $justify="center" style={{ marginTop: '16px' }}>
            <BaseButton
              size="large"
              disabled={agree}
              onClick={handleClickAlert}
              style={{ marginTop: '16px auto 0' }}
            >
              탈퇴하기
            </BaseButton>
          </Flex>
        </>
      )}
    </S.WithdrawContainer>
  );
}

export default Withdraw;
