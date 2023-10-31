import * as styled from './Table.styles';
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
import { changes, changesRatio, highRatio, lowRatio } from 'utils/priceCalc';

interface IProps {
  socketData: IBithumbFetchTicker;
}

export default function BithumbTable({ socketData }: IProps) {
  const {
    closing_price,
    min_price,
    max_price,
    acc_trade_value_24H,
    binancePrice,
  } = socketData[1];

  const [thumb, setThumb] = useState('');
  const [coinName, setCoinName] = useState('');
  const nowPrice = Number(closing_price);
  const simpleSymbol = socketData[0];
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
        <div>
          <img
            alt={`${coinName} 아이콘`}
            width="15"
            height="15"
            decoding="async"
            data-nimg="1"
            className="rounded-full"
            src={thumb}
            loading="lazy"
          />
        </div>
        <styled.CoinBoxName>
          <styled.CoinBoxNameKorean>
            <div>{coinName}</div>
          </styled.CoinBoxNameKorean>
          <styled.CoinBoxNameMarket>{simpleSymbol}</styled.CoinBoxNameMarket>
        </styled.CoinBoxName>
        <styled.CoinBoxPrice>
          <styled.CoinBoxPriceKorean>
            {Number(closing_price).toLocaleString('ko-KR')}
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
            {changesRatio(socketData) > 0 ? '+' : null}
            {changesRatio(socketData).toFixed(2)}%
          </styled.CoinBoxChangeRate>
          <styled.CoinBoxChangePrice>
            {changes(socketData).toLocaleString('ko-KR')}
          </styled.CoinBoxChangePrice>
        </styled.CoinBoxChange>
        <styled.CoinBoxHighestWeek>
          <styled.CoinBoxHighestWeekRate>
            {highRatio(socketData) > 0 ? '+' : null}
            {highRatio(socketData).toFixed(2)}%
          </styled.CoinBoxHighestWeekRate>
          <styled.CoinBoxHighestWeekPrice>
            {Number(max_price).toLocaleString('ko-KR')}
          </styled.CoinBoxHighestWeekPrice>
        </styled.CoinBoxHighestWeek>
        <styled.CoinBoxLowestWeek>
          <styled.CoinBoxLowestWeekRate>
            {'+' + lowRatio(socketData).toFixed(2) + '%'}
          </styled.CoinBoxLowestWeekRate>
          <styled.CoinBoxLowestWeekPrice>
            {Number(min_price).toLocaleString('ko-KR')}
          </styled.CoinBoxLowestWeekPrice>
        </styled.CoinBoxLowestWeek>
        <styled.CoinBoxVolume>
          <div>
            {Math.ceil(
              convertMillonWon(Number(Number(acc_trade_value_24H))),
            ).toLocaleString('ko-KR')}
          </div>
          <div>백만</div>
        </styled.CoinBoxVolume>
      </styled.CoinBox>
    </>
  );
}
