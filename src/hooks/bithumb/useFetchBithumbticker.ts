import { useEffect, useState } from 'react';
import { fetchBithumbTicker } from 'api/bithumb/fetchBithumbTicker';
import { IBithumbFetchTicker } from 'components/bithumb/Bithumb.type';
import { useSetRecoilState } from 'recoil';
import { bithumbMarketCodesState } from 'recoil/atoms/bithumb';

export default function useFetchBithumbTicker() {
  const setMarketCodes = useSetRecoilState(bithumbMarketCodesState);
  const [fetchData, setFetchData] = useState<IBithumbFetchTicker[]>([]);

  useEffect(() => {
    fetchBithumbTicker().then((res) => {
      const fetchArr: IBithumbFetchTicker[] = Object.entries(res);
      fetchArr.splice(fetchArr.length - 1);
      setFetchData(fetchArr);
      setMarketCodes(Object.keys(res));
    });
  }, []);

  return fetchData;
}
