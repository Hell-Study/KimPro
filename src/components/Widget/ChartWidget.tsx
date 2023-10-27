import { createChart, ColorType, UTCTimestamp } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import useChartTickers from 'hooks/useChartTickers';
import styled, { useTheme } from 'styled-components';

interface TickerWidgetProps {
  pairId: string;
}

export const ChartWidget: React.FC<TickerWidgetProps> = ({ pairId }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading, prevCloseData } = useChartTickers(pairId, 'PT1H');
  const theme = useTheme();

  useEffect(() => {
    if (
      !chartContainerRef.current ||
      !data ||
      data.length === 0 ||
      !prevCloseData
    )
      return;
    const baselineValue = prevCloseData.value;

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
      topLineColor: 'rgb( 239, 83, 80)',
      topFillColor1: 'rgba( 239, 83, 80, 0.03)',
      topFillColor2: 'rgba( 239, 83, 80, 0.4)',
      bottomLineColor: 'rgb(42,127,255)',
      bottomFillColor1: 'rgba( 42,127,255, 0.03)',
      bottomFillColor2: 'rgba(42,127,255,0.4)',
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
  }, [data, prevCloseData]);

  if (isLoading) return <>로딩중...</>;
  if (!data) return <>데이터 없음</>;

  return <div ref={chartContainerRef} />;
};
