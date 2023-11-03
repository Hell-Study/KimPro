import React, { memo, useEffect, useRef } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import useCreateChart from 'hooks/upbit/useCreateChart';
import { useRecoilValue } from 'recoil';
import {
  selectedCoinState,
  selectedCoinInfoState,
} from 'recoil/atoms/commonAtoms';
import { useTheme } from 'styled-components';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import * as styled from './ChartRight.styles';

function ChartRight() {
  const { processedData, updatedCandle } = useCreateChart();
  const selectedCoin = useRecoilValue(selectedCoinState);
  const selectedCoinInfo = useRecoilValue(selectedCoinInfoState);
  const theme = useTheme();

  const textColor = theme.colors.text1;
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
            color: 'transparent',
          },
          textColor,
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
        upColor: 'rgb( 239, 83, 80)',
        wickUpColor: 'rgb( 239, 83, 80)',
        downColor: 'rgb(42,127,255)',
        wickDownColor: 'rgb(42,127,255)',
        borderVisible: false,
      });
      window.addEventListener('resize', handleResize);

      newSeries.current?.setData(processedData);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.current.remove();
      };
    }
  }, [processedData, theme]);

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
            <img
              alt={`${selectedCoinInfo.symbol} 아이콘`}
              width="45"
              height="45px"
              decoding="async"
              data-nimg="1"
              className="rounded-full"
              src={`https://static.upbit.com/logos/${selectedCoinInfo.symbol}.png`}
              loading="lazy"
            />
          </styled.CoinImgWrapper>
          <styled.CoinInfo>
            <styled.CoinIdentity>
              <styled.CoinName>{selectedCoinInfo.coinName}</styled.CoinName>
              <styled.CoinSymbol>/{selectedCoinInfo.symbol}</styled.CoinSymbol>
            </styled.CoinIdentity>

            <styled.CoinPrice
              $isPositive={selectedCoinInfo.changeRatio > 0 ? 'true' : 'false'}
            >
              {selectedCoinInfo.tradePrice.toLocaleString('ko-KR')}{' '}
              <span>KRW</span>
            </styled.CoinPrice>
          </styled.CoinInfo>

          <styled.CoinChangeWrapper
            $isPositive={selectedCoinInfo.changeRatio > 0 ? 'true' : 'false'}
          >
            <styled.CoinChangeRate>
              <span>전일대비</span>
              {selectedCoinInfo.changeRatio > 0 ? (
                <FaCaretUp />
              ) : (
                <FaCaretDown />
              )}
              {Math.abs(selectedCoinInfo.changeRatio * 100).toFixed(2)}%
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
