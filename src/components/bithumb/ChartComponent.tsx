import { useEffect, useRef } from 'react';
import {
  CandlestickData,
  createChart,
  CrosshairMode,
  IChartApi,
  ISeriesApi,
} from 'lightweight-charts';
import * as styled from '../ChartRight/ChartRight.styles';
import { selectedBithumbCoinInfoState } from 'recoil/atoms/bithumbAtoms';
import { useRecoilValue } from 'recoil';
import { changes, changesRatio } from 'utils/priceCalc';
import useMatchCoingecko from 'hooks/bithumb/useMatchCoingecko';
import { IBithumbTicker } from './Bithumb.type';
import { useTheme } from 'styled-components';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';

interface IProps {
  processedData: CandlestickData[];
  updatedCandle: CandlestickData;
}

export default function ChartComponent({
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

  const selectedBithumbCoinInfo = useRecoilValue(selectedBithumbCoinInfoState);
  const { thumb, coinName } = useMatchCoingecko(
    (selectedBithumbCoinInfo as IBithumbTicker).symbol,
  );

  return (
    <styled.ChartContainer>
      {selectedBithumbCoinInfo !== null && (
        <styled.CoinInfoContainer>
          <styled.CoinImgWrapper>
            <img
              alt={`${selectedBithumbCoinInfo.symbol} 아이콘`}
              width="45"
              height="45px"
              decoding="async"
              data-nimg="1"
              className="rounded-full"
              src={thumb}
            />
          </styled.CoinImgWrapper>
          <styled.CoinInfo>
            <styled.CoinIdentity>
              <styled.CoinName>{coinName}</styled.CoinName>
              <styled.CoinSymbol>
                /{selectedBithumbCoinInfo.symbol}
              </styled.CoinSymbol>
            </styled.CoinIdentity>

            <styled.CoinPrice
              $isPositive={
                Number(selectedBithumbCoinInfo?.closing_price) > 0
                  ? 'true'
                  : 'false'
              }
            >
              {Number(selectedBithumbCoinInfo?.closing_price).toLocaleString(
                'ko-KR',
              )}{' '}
              <span style={{ fontSize: '0.9rem' }}>KRW</span>
            </styled.CoinPrice>
          </styled.CoinInfo>

          <styled.CoinChangeWrapper
            $isPositive={
              changesRatio(selectedBithumbCoinInfo) > 0 ? 'true' : 'false'
            }
          >
            <styled.CoinChangeRate>
              <span>전일대비</span>
              {changesRatio(selectedBithumbCoinInfo) > 0 ? (
                <FaCaretUp />
              ) : (
                <FaCaretDown />
              )}
              {changesRatio(selectedBithumbCoinInfo).toFixed(2)}%
            </styled.CoinChangeRate>
            <styled.CoinChangePrice>
              {changes(selectedBithumbCoinInfo) > 0 ? '+' : '-'}
              {Math.abs(changes(selectedBithumbCoinInfo))?.toLocaleString(
                'ko-KR',
              )}
            </styled.CoinChangePrice>
          </styled.CoinChangeWrapper>
        </styled.CoinInfoContainer>
      )}

      <styled.ChartRefDiv ref={chartContainerRef}></styled.ChartRefDiv>
    </styled.ChartContainer>
  );
}
