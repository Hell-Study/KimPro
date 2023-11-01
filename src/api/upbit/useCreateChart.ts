import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedCoinInfoState, selectedCoinState } from 'recoil/atoms/common';
import getTodayDate from 'utils/getTodayDate';

interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface UpdatedCandleData {
  time: {
    day: string;
    month: string;
    year: string;
  };
  open: number | undefined;
  high: number | undefined;
  low: number | undefined;
  close: number | undefined;
}

function useCreateChart() {
  const selectedCoin = useRecoilValue(selectedCoinState);
  const selectedCoinInfo = useRecoilValue(selectedCoinInfoState);
  const [fetchedData, setFetchedData] = useState<CandleData[] | null>(null);
  const [processedData, setProcessedData] = useState<CandleData[] | null>(null);
  const [updatedCandle, setUpdatedCandle] = useState<UpdatedCandleData | null>(
    null,
  );

  const options = { method: 'GET', headers: { Accept: 'application/json' } };
  async function fetchDayCandle(
    marketCode: string,
    date: string,
    count: number,
  ) {
    try {
      const response = await fetch(
        `https://api.upbit.com/v1/candles/days?market=${marketCode}&to=${date}T09:00:00Z&count=${count}&convertingPriceUnit=KRW`,
        options,
      );
      const result = await response.json();
      setFetchedData(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (selectedCoin) {
      const cachedData = sessionStorage.getItem(selectedCoin[0].market); // 시장 코드를 키로 사용
      if (cachedData) {
        setFetchedData(JSON.parse(cachedData));
      } else {
        fetchDayCandle(selectedCoin[0].market, getTodayDate(), 200);
      }
    }
  }, [selectedCoin]);

  useEffect(() => {
    if (fetchedData) {
      const processed = [...fetchedData].reverse().map((data: any) => {
        return {
          time: data.candle_date_time_kst.slice(0, 10), // 2023-10-08T09:00:00에서 T전까지
          open: data.opening_price,
          high: data.high_price,
          low: data.low_price,
          close: data.trade_price,
        };
      });
      setProcessedData(processed);
      sessionStorage.setItem(
        selectedCoin[0].market,
        JSON.stringify(fetchedData),
      );
    }
  }, [fetchedData]);

  useEffect(() => {
    if (selectedCoinInfo) {
      setUpdatedCandle({
        time: {
          day: selectedCoinInfo[0]?.trade_date?.slice(6, 8),
          month: selectedCoinInfo[0]?.trade_date?.slice(4, 6),
          year: selectedCoinInfo[0]?.trade_date?.slice(0, 4),
        },
        open: selectedCoinInfo[0]?.opening_price,
        high: selectedCoinInfo[0]?.high_price,
        low: selectedCoinInfo[0]?.low_price,
        close: selectedCoinInfo[0]?.trade_price,
      });
    }
  }, [selectedCoinInfo]);

  return { processedData, updatedCandle };
}
export default useCreateChart;
