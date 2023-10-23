import { memo, useEffect, useRef } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { ChartContainer } from './ChartRight.styles';
import useCreateChart from 'api/upbit/useCreateChart';

// interface CandleData {
//   time: string;
//   open: number;
//   high: number;
//   low: number;
//   close: number;
// }

// interface UpdatedCandleData {
//   time: {
//     day: string;
//     month: string;
//     year: string;
//   } | null;
//   open: number;
//   high: number;
//   low: number;
//   close: number;
// }

function ChartRight() {
  const { processedData, updatedCandle } = useCreateChart();

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

export default memo(ChartRight);
