import { useEffect, useRef } from 'react';
import {
  CandlestickData,
  createChart,
  CrosshairMode,
  IChartApi,
  ISeriesApi,
} from 'lightweight-charts';
import * as styled from './ChartRight.styles';
import { useRecoilValue } from 'recoil';
import { useTheme } from 'styled-components';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import { selectedCoinInfoState } from 'recoil/atoms/commonAtoms';
import type { ITicker } from '../../@types/common.types';

interface IProps {
  processedData: CandlestickData[];
  updatedCandle: CandlestickData;
}

export default function BithumbChartComponent({
  processedData,
  updatedCandle,
}: IProps) {
  const theme = useTheme();
  const textColor = theme.colors.text1;

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
          textColor,
        },
        autoSize: true,
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

  const selectedCoinInfo = useRecoilValue(selectedCoinInfoState);
  const { symbol, coinName, thumbnail, tradePrice, changeRatio, changePrice } =
    selectedCoinInfo as ITicker;

  return (
    <styled.ChartContainer>
      {selectedCoinInfo !== null && (
        <styled.CoinInfoContainer>
          <styled.CoinImgWrapper>
            <img
              alt={`${symbol} 아이콘`}
              width="45"
              height="45px"
              decoding="async"
              data-nimg="1"
              className="rounded-full"
              src={thumbnail}
            />
          </styled.CoinImgWrapper>
          <styled.CoinInfo>
            <styled.CoinIdentity>
              <styled.CoinName>{coinName}</styled.CoinName>
              <styled.CoinSymbol>/{symbol}</styled.CoinSymbol>
            </styled.CoinIdentity>

            <styled.CoinPrice $isPositive={tradePrice > 0 ? 'true' : 'false'}>
              {tradePrice.toLocaleString('ko-KR')}{' '}
              <span style={{ fontSize: '0.9rem' }}>KRW</span>
            </styled.CoinPrice>
          </styled.CoinInfo>

          <styled.CoinChangeWrapper
            $isPositive={changeRatio > 0 ? 'true' : 'false'}
          >
            <styled.CoinChangeRate>
              <span>전일대비</span>
              {changeRatio > 0 ? <FaCaretUp /> : <FaCaretDown />}
              {changeRatio.toFixed(2)}%
            </styled.CoinChangeRate>
            <styled.CoinChangePrice>
              {changePrice > 0 ? '+' : '-'}
              {Math.abs(changePrice).toLocaleString('ko-KR')}
            </styled.CoinChangePrice>
          </styled.CoinChangeWrapper>
        </styled.CoinInfoContainer>
      )}

      <styled.ChartRefDiv ref={chartContainerRef}></styled.ChartRefDiv>
    </styled.ChartContainer>
  );
}
