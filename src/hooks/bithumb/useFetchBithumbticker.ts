import { useEffect, useState } from 'react';
import { fetchBithumbTicker } from 'api/bithumb/fetchBithumbTicker';
import { IBithumbTicker } from 'components/bithumb/Bithumb.type';
import { useSetRecoilState } from 'recoil';
import { bithumbMarketCodesState } from 'recoil/atoms/bithumbAtoms';

type IFetchTicker = [
  string,
  {
    opening_price: string;
    closing_price: string;
    min_price: string;
    max_price: string;
    units_traded: string;
    acc_trade_value: string;
    prev_closing_price: string;
    units_traded_24H: string;
    acc_trade_value_24H: string;
    fluctate_24H: string;
    fluctate_rate_24H: string;
  },
];

export default function useFetchBithumbTicker() {
  const setMarketCodes = useSetRecoilState(bithumbMarketCodesState);
  const [fetchData, setFetchData] = useState<IBithumbTicker[]>([]);

  useEffect(() => {
    fetchBithumbTicker().then((res) => {
      const fetchArr: IFetchTicker[] = Object.entries(res);
      fetchArr.splice(fetchArr.length - 1); // 배열 마지막 날짜 값 제거

      // 빗썸 ticker 전처리
      const tickerData: IBithumbTicker[] = [];
      fetchArr.map((data) => {
        tickerData.push({ ...data[1], symbol: data[0] });
      });
      setFetchData(tickerData);

      // 빗썸 마켓 데이터 recoil에 저장
      setMarketCodes(Object.keys(res));
    });
  }, []);

  return fetchData;
}
