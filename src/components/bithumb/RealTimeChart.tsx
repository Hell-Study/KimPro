import { memo, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import ChartComponent from './ChartComponent';
import {
  selectedBithumbCoinInfoState,
  selectedBithumbCoinState,
} from 'recoil/atoms/bithumbAtoms';
import { fetchBithumbCandlestick } from 'api/bithumb/fetchBithumbCandlestick';
import { IBithumbFetchCandlestick } from './Bithumb.type';
import { CandlestickData } from 'lightweight-charts';

function RealTimeChart() {
  const selectedBithumbCoin = useRecoilValue(selectedBithumbCoinState);
  const selectedBithumbCoinInfo = useRecoilValue(selectedBithumbCoinInfoState);
  const [fetchedData, setFetchedData] = useState<IBithumbFetchCandlestick[]>(
    [],
  );
  const [processedData, setProcessedData] = useState<CandlestickData[]>([]);
  const [updatedCandle, setUpdatedCandle] = useState<CandlestickData | null>(
    null,
  );

  useEffect(() => {
    if (selectedBithumbCoin) {
      fetchBithumbCandlestick(selectedBithumbCoin, '24h').then((res) => {
        setFetchedData(res);
      });
    }
  }, [selectedBithumbCoin]);

  useEffect(() => {
    if (fetchedData) {
      const processed = fetchedData
        .map((data) => {
          const date = new Date(data[0]);
          const time = `${date.getFullYear()}-${String(
            date.getMonth() + 1,
          ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
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
    if (selectedBithumbCoinInfo) {
      if (selectedBithumbCoinInfo.date) {
        setUpdatedCandle({
          time: `${selectedBithumbCoinInfo.date.slice(
            0,
            4,
          )}-${selectedBithumbCoinInfo.date.slice(
            4,
            6,
          )}-${selectedBithumbCoinInfo.date.slice(6, 8)}`,
          open: Number(selectedBithumbCoinInfo.opening_price),
          high: Number(selectedBithumbCoinInfo.max_price),
          low: Number(selectedBithumbCoinInfo.min_price),
          close: Number(selectedBithumbCoinInfo.closing_price),
        });
      }
    }
  }, [selectedBithumbCoinInfo]);

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
