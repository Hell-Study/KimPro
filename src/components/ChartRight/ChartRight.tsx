import { memo, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedCoinInfoState, selectedCoinState } from 'recoil/atoms/upbit';
import { createChart, CrosshairMode } from 'lightweight-charts';
import styled from 'styled-components';
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
  } | null;
  open: number;
  high: number;
  low: number;
  close: number;
}

const ChartContainer = styled.div`
  width: 100%;
  height: 400;
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  div {
    border: 1px solid white;
  }
`;

function ChartComponent({
  processedData,
  updatedCandle,
}: {
  processedData: CandleData[];
  updatedCandle: UpdatedCandleData | null;
}) {
  const backgroundColor = 'white';
  const textColor = 'black';
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chart = useRef<any>(null);
  const newSeries = useRef<any>(null);
  useEffect(() => {
    if (processedData) {
      const handleResize = () => {
        chart.current.applyOptions({
          width: chartContainerRef.current?.clientWidth,
        });
      };
      chart.current = createChart(chartContainerRef.current as HTMLElement, {
        layout: {
          background: {
            color: backgroundColor,
          },
          textColor,
        },
        width: chartContainerRef.current?.clientWidth,
        height: 300,
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        leftPriceScale: {
          borderVisible: false,
        },
        rightPriceScale: {
          borderVisible: false,
          scaleMargins: {
            top: 0.1,
            bottom: 0.1,
          },
        },
        timeScale: {
          borderVisible: false,
        },
      });
      chart.current.timeScale().fitContent();
      newSeries.current = chart.current.addCandlestickSeries({
        upColor: '#D24F45',
        wickUpColor: '#D24F45',
        downColor: '#1261C4',
        wickDownColor: '#1261C4',
        borderVisible: false,
      });
      window.addEventListener('resize', handleResize);

      newSeries.current.setData(processedData);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.current.remove();
      };
    }
  }, [processedData]);

  useEffect(() => {
    if (updatedCandle && newSeries.current) {
      newSeries.current.update(updatedCandle);
    }
  }, [updatedCandle]);

  return (
    <ChartContainer>
      <div ref={chartContainerRef}></div>
    </ChartContainer>
  );
}

function ChartRight() {
  const selectedCoin = useRecoilValue(selectedCoinState);
  const selectedCoinInfo = useRecoilValue(selectedCoinInfoState);
  const [fetchedData, setFetchedData] = useState<any>(null);
  const [processedData, setProcessedData] = useState<any>(null);
  const [updatedCandle, setUpdatedCandle] = useState<any>(null);

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
      fetchDayCandle(selectedCoin[0].market, getTodayDate(), 200);
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

  return (
    <ChartComponent
      processedData={processedData}
      updatedCandle={updatedCandle}
    ></ChartComponent>
  );
}

export default memo(ChartRight);
