import { useState, useEffect } from 'react';
import { IUpbitMarketCode } from './useUpbitTicker';

function useFetchUpbitMarketCode(): {
  isLoading: boolean;
  marketCodes: IUpbitMarketCode[];
} {
  const REST_API_URL = 'https://api.upbit.com/v1/market/all?isDetails=false';

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [marketCodes, setMarketCodes] = useState([]);

  const fetchMarketCodes = async () => {
    try {
      const response = await fetch(REST_API_URL);
      if (!response.ok) {
        throw new Error('API를 불러올 수 없습니다!');
      }
      const json = await response.text(); // 텍스트 형식으로 추출

      const result = JSON.parse(json).filter((code: IUpbitMarketCode) =>
        code.market.includes('KRW'),
      ); // 텍스트 데이터를 객체로 변환 후 원화만 필터링
      setMarketCodes(result);
    } catch (error) {
      console.error('API를 불러오는 중 에러 발생!', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketCodes();
  }, []);

  return { isLoading, marketCodes };
}

export default useFetchUpbitMarketCode;
