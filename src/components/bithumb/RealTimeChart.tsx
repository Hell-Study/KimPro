import { memo, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import ChartComponent from './ChartComponent';
import { fetchBithumbCandlestick } from 'api/bithumb/fetchBithumbCandlestick';
import type { IBithumbFetchCandlestick } from '../../@types/bithumb.types';
import { CandlestickData } from 'lightweight-charts';
import { convertDate } from 'utils';
import {
  selectedCoinInfoState,
  selectedCoinState,
} from 'recoil/atoms/commonAtoms';

function RealTimeChart() {
  const selectedCoin = useRecoilValue(selectedCoinState);
  const selectedCoinInfo = useRecoilValue(selectedCoinInfoState);
  const [fetchedData, setFetchedData] = useState<IBithumbFetchCandlestick[]>(
    [],
  );
  const [processedData, setProcessedData] = useState<CandlestickData[]>([]);
  const [updatedCandle, setUpdatedCandle] = useState<CandlestickData | null>(
    null,
  );

  useEffect(() => {
    if (selectedCoin) {
      fetchBithumbCandlestick(selectedCoin, '24h').then((res) => {
        setFetchedData(res);
      });
    }
  }, [selectedCoin]);

  useEffect(() => {
    if (fetchedData) {
      const processed = fetchedData
        .map((data) => {
          const time = convertDate(data[0]);
          return {
            time: time,
            open: Number(data[1]),
            close: Number(data[2]),
            high: Number(data[3]),
            low: Number(data[4]),
          };
        })
        .reduce((acc: CandlestickData[], current) => {
          if (
            acc.findIndex(({ time }) => {
              return time === current.time;
            }) === -1
          ) {
            acc.push(current);
          }
          return acc;
        }, []);
      setProcessedData(processed);
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

  return (
    <>
      {updatedCandle && (
        <ChartComponent
          processedData={processedData}
          updatedCandle={updatedCandle}
        ></ChartComponent>
      )}
    </>
  );
}

export default memo(RealTimeChart);
