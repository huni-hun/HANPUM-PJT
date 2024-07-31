import { useRecoilValue } from 'recoil';
import { userAtom } from '../../atoms/userAtom';

function useUser() {
  return useRecoilValue(userAtom);
}

export default useUser;
