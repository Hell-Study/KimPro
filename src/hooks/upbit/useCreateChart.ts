import { fetchBithumbCandlestick } from 'api/bithumb/fetchBithumbCandlestick';
import { fetchUpbitDayCandle } from 'api/upbit/fetchUpbitDayCandle';
import { CandlestickData } from 'lightweight-charts';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  baseExchangeState,
  selectedCoinInfoState,
  selectedCoinState,
} from 'recoil/atoms/commonAtoms';
import { getTodayDate } from 'utils';

export const useCreateChart = () => {
  const baseExchange = useRecoilValue(baseExchangeState);
  const selectedCoin = useRecoilValue(selectedCoinState);
  const selectedCoinInfo = useRecoilValue(selectedCoinInfoState);

  const [processedData, setProcessedData] = useState<CandlestickData[]>([]);
  const [updatedCandle, setUpdatedCandle] = useState<CandlestickData | null>(
    null,
  );

  const upbitCreateChart = async () => {
    const processedData = await fetchUpbitDayCandle(
      selectedCoin,
      getTodayDate(),
      200,
    );
    setProcessedData(processedData);
  };

  const bithumbCreateChart = async () => {
    const processedData = await fetchBithumbCandlestick(selectedCoin, '24h');
    setProcessedData(processedData);
  };

  useEffect(() => {
    if (baseExchange === 'upbit') {
      const cachedData = sessionStorage.getItem(`upbit_${selectedCoin}`); // 시장 코드를 키로 사용
      if (cachedData) {
        setProcessedData(JSON.parse(cachedData));
      } else {
        upbitCreateChart();
      }
    } else if (baseExchange === 'bithumb') {
      const cachedData = sessionStorage.getItem(`bithumb_${selectedCoin}`);
      if (cachedData) {
        setProcessedData(JSON.parse(cachedData));
      } else {
        bithumbCreateChart();
      }
    }
  }, [baseExchange, selectedCoin]);

  useEffect(() => {
    sessionStorage.setItem(
      `${baseExchange === 'upbit' ? 'upbit_' : 'bithumb_'}${selectedCoin}`,
      JSON.stringify(processedData),
    );
  }, [processedData]);

  useEffect(() => {
    if (selectedCoinInfo) {
      const { date, openingPrice, highestPrice, lowestPrice, tradePrice } =
        selectedCoinInfo;
      setUpdatedCandle({
        time: date,
        open: openingPrice,
        high: highestPrice,
        low: lowestPrice,
        close: tradePrice,
      });
    }
  }, [selectedCoinInfo]);

  return { processedData, updatedCandle };
};
