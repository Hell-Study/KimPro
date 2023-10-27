import * as styled from './Table.styles';
import { IBinanceTicker } from 'hooks/binance/useBinanceTicker';
import { IBithumbFetchTicker } from 'components/bithumb/Bithumb.type';
import { convertMillonWon } from 'utils/convertMillonWon';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  ICoingeckoCoinData,
  coingeckoCoinDataState,
} from 'recoil/atoms/coingecko';
import judgeColor from 'utils/judgeColor';
import useFetchExchangeRate from 'hooks/binance/useFetchExchangeRate';
import { changes, changesRatio, highRatio, lowRatio } from 'utils/bithumbCalc';

interface IProps {
  socketData: IBithumbFetchTicker;
  matchingTicker?: IBinanceTicker; // '?'를 통해 선택적 사용하여 undefined 에러 해결
}

export default function BithumbTable({ socketData, matchingTicker }: IProps) {
  const { closing_price, min_price, max_price, acc_trade_value_24H } =
    socketData[1];

  const [thumb, setThumb] = useState('');
  const [coinName, setCoinName] = useState('');
  const coingeckoCoinData = useRecoilValue(coingeckoCoinDataState);
  const simpleSymbol = socketData[0];
  useEffect(() => {
    if (simpleSymbol !== undefined) {
      const target = coingeckoCoinData.filter((coin: ICoingeckoCoinData) => {
        return coin.symbol === simpleSymbol;
      });
      setCoinName(target[0]?.name);
      setThumb(target[0]?.thumb);
    }
  }, []);

  const { exchangeRate } = useFetchExchangeRate();

  return (
    <>
      <styled.CoinBox
        key={socketData[0]}
        id={socketData[0]}
        // onClick={clickCoinHandler}
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
          <styled.CoinBoxPriceBinance>
            {matchingTicker
              ? `${(parseFloat(matchingTicker.c) * exchangeRate).toLocaleString(
                  'ko-KR',
                )}`
              : '로딩중'}
          </styled.CoinBoxPriceBinance>
        </styled.CoinBoxPrice>
        <styled.CoinBoxKimchiPremium $isPositive={false}>
          <styled.CoinBoxKimchiPremiumRate>d</styled.CoinBoxKimchiPremiumRate>
          <styled.CoinBoxKimchiPremiumDiff>a</styled.CoinBoxKimchiPremiumDiff>
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
