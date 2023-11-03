import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  selectedCoinInfoState,
  selectedCoinState,
} from 'recoil/atoms/commonAtoms';
import { getTodayDate } from 'utils';

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface UpdatedCandleData {
  time: string;
  open: number | undefined;
  high: number | undefined;
  low: number | undefined;
  close: number | undefined;
}

export const useCreateChart = () => {
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
        `https://api.upbit.com/v1/candles/days?market=KRW-${marketCode}&to=${date}T09:00:00Z&count=${count}&convertingPriceUnit=KRW`,
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
      const cachedData = sessionStorage.getItem(selectedCoin); // 시장 코드를 키로 사용
      if (cachedData) {
        setFetchedData(JSON.parse(cachedData));
      } else {
        fetchDayCandle(selectedCoin, getTodayDate(), 200);
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
      sessionStorage.setItem(selectedCoin, JSON.stringify(fetchedData));
    }
  }, [fetchedData]);

  useEffect(() => {
    if (selectedCoinInfo) {
      setUpdatedCandle({
        time: selectedCoinInfo.date,
        open: selectedCoinInfo.openingPrice,
        high: selectedCoinInfo.highestPrice,
        low: selectedCoinInfo.lowestPrice,
        close: selectedCoinInfo.tradePrice,
      });
    }
  }, [selectedCoinInfo]);

  return { processedData, updatedCandle };
};
