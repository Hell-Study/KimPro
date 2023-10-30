import { memo, useEffect, useRef } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import * as styled from './ChartRight.styles';
import useCreateChart from 'api/upbit/useCreateChart';
import { useRecoilValue, useRecoilState } from 'recoil';
import { selectedCoinState, selectedCoinInfoState } from 'recoil/atoms/common';
import { upbitMarketCodesState } from 'recoil/atoms/upbit';

function ChartRight() {
  const { processedData, updatedCandle } = useCreateChart();
  const selectedCoin = useRecoilValue(selectedCoinState);
  const selectedCoinInfo = useRecoilValue(selectedCoinInfoState);

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
  useEffect(() => {
    console.log('selectedCoinInfo ', selectedCoinInfo);
  }, [selectedCoinInfo]);

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
          />
        </styled.CoinImgWrapper>
        <styled.CoinInfo>
          <styled.CoinIdentity>
            <styled.CoinName>{selectedCoin[0].korean_name}</styled.CoinName>
            <styled.CoinSymbol>
              /{selectedCoin[0].market.split('-')[1]}
            </styled.CoinSymbol>
          </styled.CoinIdentity>

          <styled.CoinPrice
            $isPositive={
              selectedCoinInfo?.[0]?.signed_change_price > 0 ? 'true' : 'false'
            }
          >
            {selectedCoinInfo?.[0]?.trade_price.toLocaleString('ko-KR')}{' '}
            <span>KRW</span>
          </styled.CoinPrice>
        </styled.CoinInfo>

        <styled.CoinChangeWrapper
          $isPositive={
            selectedCoinInfo?.[0]?.signed_change_price > 0 ? 'true' : 'false'
          }
        >
          <styled.CoinChangeRate>
            <span>전일대비</span>
            {selectedCoinInfo?.[0]?.signed_change_rate > 0 ? '+' : null}
            {(selectedCoinInfo?.[0]?.signed_change_rate * 100).toFixed(2)}%
          </styled.CoinChangeRate>
          <styled.CoinChangePrice>
            {selectedCoinInfo?.[0]?.signed_change_price > 0 ? '▲' : '▼'}
            {Math.abs(
              selectedCoinInfo?.[0]?.signed_change_price,
            )?.toLocaleString('ko-KR')}
          </styled.CoinChangePrice>
        </styled.CoinChangeWrapper>
      </styled.CoinInfoContainer>

      <styled.ChartRefDiv ref={chartContainerRef}></styled.ChartRefDiv>
    </styled.ChartContainer>
  );
}

export default memo(ChartRight);
