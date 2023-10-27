import { createChart, ColorType, UTCTimestamp } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import useChartTickers from 'hooks/useChartTickers';

interface TickerWidgetProps {
  pairId: string;
}

export const ChartWidget: React.FC<TickerWidgetProps> = ({ pairId }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading } = useChartTickers(pairId, 'PT1H');

  useEffect(() => {
    if (!chartContainerRef.current || !data || data.length === 0) return;
    const baselineValue = data[0].value;

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };
    const chart = createChart(chartContainerRef.current as HTMLElement, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
      },
      width: 64,
      height: 32,
      timeScale: {
        visible: false,
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
      rightPriceScale: {
        visible: false,
      },
      handleScroll: {
        mouseWheel: false,
        pressedMouseMove: false,
      },
      handleScale: {
        mouseWheel: false,
        pinch: false,
        axisPressedMouseMove: {
          time: false,
          price: false,
        },
      },
      crosshair: {
        vertLine: {
          visible: false,
        },
        horzLine: {
          visible: false,
        },
      },
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addBaselineSeries({
      baseValue: { type: 'price', price: baselineValue },
      lineWidth: 1,
      topLineColor: 'rgba( 38, 166, 154, 1)',
      topFillColor1: 'rgba( 38, 166, 154, 0.4)',
      topFillColor2: 'rgba( 38, 166, 154, 0.05)',
      bottomLineColor: 'rgba( 239, 83, 80, 1)',
      bottomFillColor1: 'rgba( 239, 83, 80, 0.05)',
      bottomFillColor2: 'rgba( 239, 83, 80, 0.4)',
      crosshairMarkerVisible: false,
      priceLineVisible: false,
    });

    const convertedData = data.map((item) => ({
      time: item.time as UTCTimestamp,
      value: item.value,
    }));

    newSeries.setData(convertedData);

    const lineSeries = chart.addLineSeries({
      color: '#B2B5BE',
      priceLineVisible: false,
      lineWidth: 1,
      lineStyle: 2,
      crosshairMarkerVisible: false,
    });

    const lineData = data.map((item) => ({
      time: item.time as UTCTimestamp,
      value: baselineValue,
    }));

    lineSeries.setData(lineData);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, [data]);

  if (isLoading) return <>로딩중...</>;
  if (!data) return <>데이터 없음</>;

  return <div ref={chartContainerRef} />;
};
