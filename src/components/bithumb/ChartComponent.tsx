import { useEffect, useRef } from 'react';
import {
  CandlestickData,
  createChart,
  CrosshairMode,
  IChartApi,
  ISeriesApi,
} from 'lightweight-charts';
import * as styled from '../ChartRight/ChartRight.styles';
import { selectedBithumbCoinInfoState } from 'recoil/atoms/bithumb';
import { useRecoilValue } from 'recoil';
import { changes, changesRatio } from 'utils/priceCalc';
import useMatchCoingecko from 'hooks/bithumb/useMatchCoingecko';
import { IBithumbTicker } from './Bithumb.type';

interface IProps {
  processedData: CandlestickData[];
  updatedCandle: CandlestickData;
}

export default function ChartComponent({
  processedData,
  updatedCandle,
}: IProps) {
  const backgroundColor = 'white';
  const textColor = 'black';
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chart = useRef<IChartApi>();
  const newSeries = useRef<ISeriesApi<'Candlestick'>>();
  useEffect(() => {
    if (processedData.length > 0) {
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
              {changesRatio(selectedBithumbCoinInfo) > 0 ? '+' : null}
              {changesRatio(selectedBithumbCoinInfo).toFixed(2)}%
            </styled.CoinChangeRate>
            <styled.CoinChangePrice>
              {changes(selectedBithumbCoinInfo) > 0 ? '▲' : '▼'}
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
