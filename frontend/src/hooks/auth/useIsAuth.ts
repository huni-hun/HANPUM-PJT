import { isAuthEnticatedAtom } from '@/atoms/isAuthEnticatedAtom';
import { useRecoilValue } from 'recoil';

function useIsAuth() {
  return useRecoilValue(isAuthEnticatedAtom);
}

export default useIsAuth;
