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

  const selectedRate = selectedCoinInfo?.[0]?.signed_change_rate;
  const selectedChangePrice = selectedCoinInfo?.[0]?.signed_change_price;
  const isPositiveRate = selectedRate > 0;

  return (
    <styled.ChartContainer>
      <styled.CoinInfoContainer>
        <styled.CoinImgWrapper>
          <img
            alt={`${selectedCoin[0].market.split('-')[1]} 아이콘`}
            width="45"
            height="45px"
            decoding="async"
            data-nimg="1"
            className="rounded-full"
            src={`https://static.upbit.com/logos/${
              selectedCoin[0].market.split('-')[1]
            }.png`}
            loading="lazy"
          />
        </styled.CoinImgWrapper>
        <styled.CoinInfo>
          <styled.CoinIdentity>
            <styled.CoinName>{selectedCoin[0].korean_name}</styled.CoinName>
            <styled.CoinSymbol>
              /{selectedCoin[0].market.split('-')[1]}
            </styled.CoinSymbol>
          </styled.CoinIdentity>

          <styled.CoinPrice $isPositive={isPositiveRate ? 'true' : 'false'}>
            {selectedCoinInfo?.[0]?.trade_price.toLocaleString('ko-KR')}{' '}
            <span>KRW</span>
          </styled.CoinPrice>
        </styled.CoinInfo>

        <styled.CoinChangeWrapper
          $isPositive={isPositiveRate ? 'true' : 'false'}
        >
          <styled.CoinChangeRate>
            <span>전일대비</span>
            {isPositiveRate ? <FaCaretUp /> : <FaCaretDown />}
            {Math.abs(selectedRate * 100).toFixed(2)}%
          </styled.CoinChangeRate>
          <styled.CoinChangePrice>
            {selectedChangePrice > 0 ? '+' : '-'}
            {Math.abs(selectedChangePrice)?.toLocaleString('ko-KR')}
          </styled.CoinChangePrice>
        </styled.CoinChangeWrapper>
      </styled.CoinInfoContainer>

      <styled.ChartRefDiv ref={chartContainerRef}></styled.ChartRefDiv>
    </styled.ChartContainer>
  );
}

export default memo(ChartRight);
