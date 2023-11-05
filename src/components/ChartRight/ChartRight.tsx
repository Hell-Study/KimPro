import { memo, useEffect, useRef } from 'react';
import { useTheme } from 'styled-components';
import * as styled from './ChartRight.styles';
import { useCreateRightChart } from 'hooks';
import { useRecoilValue } from 'recoil';
import { selectedCoinInfoState } from 'recoil/atoms/tableAtoms';
import { createChart, CrosshairMode } from 'lightweight-charts';
import type { IChartApi, ISeriesApi } from 'lightweight-charts';

function ChartRight() {
  const { processedData, updatedCandle } = useCreateRightChart();
  const selectedCoinInfo = useRecoilValue(selectedCoinInfoState);

  const theme = useTheme();

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chart = useRef<IChartApi>();
  const newSeries = useRef<ISeriesApi<'Candlestick'>>();

  useEffect(() => {
    if (processedData.length > 0) {
      chart.current = createChart(chartContainerRef.current as HTMLElement, {
        layout: {
          background: {
            color: 'transparent',
          },
          textColor: theme.colors.text1,
        },
        autoSize: false,
        grid: {
          vertLines: {
            color: theme.colors.border2,
          },
          horzLines: {
            color: theme.colors.border2,
          },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        leftPriceScale: {
          borderVisible: false,
        },
        rightPriceScale: {
          borderVisible: false,
          textColor: theme.colors.text1,
          scaleMargins: {
            top: 0.1,
            bottom: 0.1,
          },
        },
        timeScale: {
          borderVisible: false,
          fixLeftEdge: true,
          fixRightEdge: true,
        },
      });
      chart.current.timeScale().applyOptions({
        barSpacing: 8,
      });

      newSeries.current = chart.current.addCandlestickSeries({
        upColor: theme.colors.red,
        wickUpColor: theme.colors.red,
        downColor: theme.colors.blue,
        wickDownColor: theme.colors.blue,
        borderVisible: false,
      });

      newSeries.current?.setData(processedData);

      return () => {
        chart.current?.remove();
      };
    }
  }, [processedData]);

  useEffect(() => {
    if (updatedCandle && newSeries.current) {
      newSeries.current.update(updatedCandle);
    }
  }, [updatedCandle]);

  return (
    <styled.ChartContainer>
      {selectedCoinInfo !== null && (
        <styled.CoinInfoContainer>
          <styled.CoinImgWrapper>
            <styled.CoinImg
              alt={`${selectedCoinInfo.symbol} 아이콘`}
              src={selectedCoinInfo.thumbnail}
              loading="lazy"
            />
          </styled.CoinImgWrapper>
          <styled.CoinInfo>
            <styled.CoinIdentity>
              <styled.CoinName>{selectedCoinInfo.coinName}</styled.CoinName>
              <styled.CoinSymbol>/{selectedCoinInfo.symbol}</styled.CoinSymbol>
            </styled.CoinIdentity>

            <styled.CoinPrice $isPositive={selectedCoinInfo.changeRatio > 0}>
              {selectedCoinInfo.tradePrice.toLocaleString('ko-KR')} KRW
            </styled.CoinPrice>
          </styled.CoinInfo>

          <styled.CoinChangeWrapper
            $isPositive={selectedCoinInfo.changeRatio > 0}
          >
            <styled.CoinChangeRate>
              <span>전일대비</span>
              {selectedCoinInfo.changeRatio > 0 ? (
                <styled.CaretUpSVG />
              ) : (
                <styled.CaretDownSVG />
              )}
              {Math.abs(selectedCoinInfo.changeRatio).toFixed(2)}%
            </styled.CoinChangeRate>
            <styled.CoinChangePrice>
              {selectedCoinInfo.changePrice > 0 ? '+' : '-'}
              {Math.abs(selectedCoinInfo.changePrice)?.toLocaleString('ko-KR')}
            </styled.CoinChangePrice>
          </styled.CoinChangeWrapper>
        </styled.CoinInfoContainer>
      )}

      <styled.ChartRefDiv ref={chartContainerRef}></styled.ChartRefDiv>
    </styled.ChartContainer>
  );
}

export default memo(ChartRight);
