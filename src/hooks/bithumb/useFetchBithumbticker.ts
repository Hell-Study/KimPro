import { useEffect } from 'react';
import { fetchBithumbTicker } from 'api/bithumb/fetchBithumbTicker';
import { IBithumbFetchTicker } from 'components/bithumb/Bithumb.type';
import { useSetRecoilState } from 'recoil';
import {
  bithumbMarketCodesState,
  bithumbTickerState,
} from 'recoil/atoms/bithumb';

export default function useFetchBithumbTicker() {
  const setSocketDatas = useSetRecoilState(bithumbTickerState);
  const setMarketCodes = useSetRecoilState(bithumbMarketCodesState);

  useEffect(() => {
    fetchBithumbTicker().then((res) => {
      const socketArr: IBithumbFetchTicker[] = Object.entries(res);
      socketArr.splice(socketArr.length - 1);
      setSocketDatas(socketArr);
      setMarketCodes(Object.keys(res));
    });
  }, []);
}
