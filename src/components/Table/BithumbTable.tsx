import * as styled from './Table.styles';
import { IBinanceTicker } from 'hooks/binance/useBinanceTicker';
import { IBithumbFetchTicker } from 'components/bithumb/Bithumb.type';
import { convertMillonWon } from 'utils/convertMillonWon';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { selectedBithumbCoinState } from 'recoil/atoms/common';
import {
  ICoingeckoCoinData,
  coingeckoCoinDataState,
} from 'recoil/atoms/coingecko';
import judgeColor from 'utils/judgeColor';
import { exchangeRateState } from 'recoil/atoms/exchange';

interface IProps {
  socketData: IBithumbFetchTicker;
}

export default function BithumbTable({ socketData }: IProps) {
  const {
    closing_price,
    min_price,
    max_price,
    prev_closing_price,
    acc_trade_value_24H,
    binancePrice,
  } = socketData[1];

  const [thumb, setThumb] = useState('');
  const [coinName, setCoinName] = useState('');
  const coingeckoCoinData = useRecoilValue(coingeckoCoinDataState);
  useEffect(() => {
    if (simpleSymbol !== undefined) {
      const target = coingeckoCoinData.filter((coin: ICoingeckoCoinData) => {
        return coin.symbol === simpleSymbol;
      });
      setCoinName(target[0]?.name);
      setThumb(target[0]?.thumb);
    }
  }, []);

  const simpleSymbol = socketData[0];
  const nowPrice = Number(closing_price);
  const changesRatio =
    ((Number(closing_price) - Number(prev_closing_price)) /
      Number(prev_closing_price)) *
    100; // 전일 대비 증감률
  const changes = Number(closing_price) - Number(prev_closing_price); // 전일 대비
  const highRatio =
    ((Number(closing_price) - Number(max_price)) / Number(max_price)) * 100; // 고가 대비 증감률(전일)
  const high = Number(max_price); // 고가(전일)
  const lowRatio =
    ((Number(closing_price) - Number(min_price)) / Number(min_price)) * 100; // 저가 대비 증감률(전일)
  const low = Number(min_price); // 저가(전일)
  const value = Number(acc_trade_value_24H);

  const myExchangeRate = useRecoilValue(exchangeRateState);
  const [selectedCoin, setSelectedCoin] = useRecoilState(
    selectedBithumbCoinState,
  );

  const clickCoinHandler = (evt: React.MouseEvent<HTMLDivElement>) => {
    const targetId = (evt.target as HTMLDivElement).id;
    setSelectedCoin(targetId);
  };

  return (
    <>
      <styled.CoinBox
        key={socketData[0]}
        id={socketData[0]}
        onClick={clickCoinHandler}
        // $selected={selectedCoin[0].market === data.code}
        $selected={false}
      >
        <styled.CoinBoxName>
          <styled.CoinBoxNameKorean>
            <img
              alt={`${coinName} 아이콘`}
              width="15"
              height="15"
              decoding="async"
              data-nimg="1"
              className="rounded-full"
              src={thumb}
            />
            <div>{coinName}</div>
          </styled.CoinBoxNameKorean>
          <styled.CoinBoxNameMarket>{simpleSymbol}</styled.CoinBoxNameMarket>
        </styled.CoinBoxName>
        <styled.CoinBoxPrice>
          <styled.CoinBoxPriceKorean>
            {nowPrice.toLocaleString('ko-KR')}
          </styled.CoinBoxPriceKorean>
          <styled.CoinBoxPriceBinance>{`${
            binancePrice
              ? (parseFloat(binancePrice) * myExchangeRate).toLocaleString(
                  'ko-KR',
                )
              : ''
          }`}</styled.CoinBoxPriceBinance>
        </styled.CoinBoxPrice>
        <styled.CoinBoxKimchiPremium
          $isPositive={
            binancePrice
              ? nowPrice > parseFloat(binancePrice) * myExchangeRate
                ? 'true'
                : 'false'
              : 'none'
          }
        >
          <styled.CoinBoxKimchiPremiumRate>
            {binancePrice ? (
              <>
                {nowPrice / (parseFloat(binancePrice) * myExchangeRate) - 1 >
                  0 && '+'}
                {`${(
                  (nowPrice / (parseFloat(binancePrice) * myExchangeRate) - 1) *
                  100
                ).toFixed(2)}%`}
              </>
            ) : (
              ''
            )}
          </styled.CoinBoxKimchiPremiumRate>
          <styled.CoinBoxKimchiPremiumDiff>
            {binancePrice ? (
              <>
                {nowPrice - parseFloat(binancePrice) * myExchangeRate > 0 &&
                  '+'}
                {(nowPrice - parseFloat(binancePrice) * myExchangeRate).toFixed(
                  2,
                )}
              </>
            ) : (
              ''
            )}
          </styled.CoinBoxKimchiPremiumDiff>
        </styled.CoinBoxKimchiPremium>
        <styled.CoinBoxChange $changeType={judgeColor(Number(changesRatio))}>
          <styled.CoinBoxChangeRate>
            {changesRatio > 0 ? '+' : null}
            {changesRatio.toFixed(2)}%
          </styled.CoinBoxChangeRate>
          <styled.CoinBoxChangePrice>
            {changes.toLocaleString('ko-KR')}
          </styled.CoinBoxChangePrice>
        </styled.CoinBoxChange>
        <styled.CoinBoxHighestWeek>
          <styled.CoinBoxHighestWeekRate>
            {highRatio > 0 ? '+' : null}
            {highRatio.toFixed(2)}%
          </styled.CoinBoxHighestWeekRate>
          <styled.CoinBoxHighestWeekPrice>
            {high.toLocaleString('ko-KR')}
          </styled.CoinBoxHighestWeekPrice>
        </styled.CoinBoxHighestWeek>
        <styled.CoinBoxLowestWeek>
          <styled.CoinBoxLowestWeekRate>
            {'+' + lowRatio.toFixed(2) + '%'}
          </styled.CoinBoxLowestWeekRate>
          <styled.CoinBoxLowestWeekPrice>
            {low.toLocaleString('ko-KR')}
          </styled.CoinBoxLowestWeekPrice>
        </styled.CoinBoxLowestWeek>
        <styled.CoinBoxVolume>
          <div>
            {Math.ceil(convertMillonWon(Number(value))).toLocaleString('ko-KR')}
          </div>
          <div>백만</div>
        </styled.CoinBoxVolume>
      </styled.CoinBox>
    </>
  );
}
