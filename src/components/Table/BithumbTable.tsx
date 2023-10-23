import * as style from './Table.styles';
import { IBithumbTicker } from 'components/bithumb/Bithumb.type';
import { convertMillonWon } from 'utils/convertMillonWon';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  ICoingeckoCoin,
  coingeckoCoinsListState,
} from 'recoil/atoms/coingecko';

interface Props {
  socketData: IBithumbTicker;
}

export default function BithumbTable({ socketData }: Props) {
  const {
    symbol, // 통화코드
    closePrice, // 종가
    lowPrice, // 저가
    highPrice, // 고가
    value, // 누적거래금액
    prevClosePrice, // 전일종가
  } = socketData;

  const simpleSymbol = symbol.replace('_KRW', '');
  const changesRatio =
    ((Number(closePrice) - Number(prevClosePrice)) / Number(prevClosePrice)) *
    100; // 전일 대비 증감률
  const changes = Number(closePrice) - Number(prevClosePrice); // 전일 대비
  const highRatio =
    ((Number(closePrice) - Number(highPrice)) / Number(highPrice)) * 100; // 고가 대비 증감률(전일)
  const high = Number(highPrice); // 고가(전일)
  const lowRatio =
    ((Number(closePrice) - Number(lowPrice)) / Number(lowPrice)) * 100; // 저가 대비 증감률(전일)
  const low = Number(lowPrice); // 저가(전일)

  const judgeColor = (num: number) => {
    if (num > 0) {
      return 'RISE';
    } else if (num < 0) {
      return 'FALL';
    } else {
      return 'EVEN';
    }
  };

  const [englishName, setEnglishName] = useState('');
  const coingeckoCoinsList = useRecoilValue(coingeckoCoinsListState);
  useEffect(() => {
    const target = coingeckoCoinsList.filter((coin: ICoingeckoCoin) => {
      return coin.symbol == symbol.replace('_KRW', '').toLowerCase();
    });
    setEnglishName(target[0].name);
  }, []);

  return (
    <>
      <style.CoinBox
        key={socketData.symbol}
        id={socketData.symbol}
        // onClick={clickCoinHandler}
        // $selected={selectedCoin[0].market === data.code}
        $selected={false}
      >
        <style.CoinBoxName>
          <div>{englishName}</div>
          <div>{simpleSymbol}</div>
        </style.CoinBoxName>
        <style.CoinBoxPrice $changeType={'EVEN'}>
          {closePrice}
        </style.CoinBoxPrice>
        <style.CoinBoxKimchiPremium>
          (국내코인원화 / 해외코인달러 x 환율 - 1)*100
        </style.CoinBoxKimchiPremium>
        <style.CoinBoxChange $changeType={judgeColor(Number(changesRatio))}>
          <style.CoinBoxChangeRate>
            {changesRatio > 0 ? '+' : null}
            {changesRatio.toFixed(2)}%
          </style.CoinBoxChangeRate>
          <style.CoinBoxChangePrice>
            {changes.toFixed(2)}
          </style.CoinBoxChangePrice>
        </style.CoinBoxChange>
        <style.CoinBoxHighestWeek>
          <style.CoinBoxHighestWeekRate>
            {highRatio > 0 ? '+' : null}
            {highRatio.toFixed(2) + '%'}
          </style.CoinBoxHighestWeekRate>
          <style.CoinBoxHighestWeekPrice>{high}</style.CoinBoxHighestWeekPrice>
        </style.CoinBoxHighestWeek>
        <style.CoinBoxLowestWeek>
          <style.CoinBoxLowestWeekRate>
            {'+' + lowRatio.toFixed(2) + '%'}
          </style.CoinBoxLowestWeekRate>
          <style.CoinBoxLowestWeekPrice>{low}</style.CoinBoxLowestWeekPrice>
        </style.CoinBoxLowestWeek>
        <style.CoinBoxVolume>
          <div>{Math.ceil(convertMillonWon(Number(value)))}</div>
          <div>백만</div>
        </style.CoinBoxVolume>
      </style.CoinBox>
    </>
  );
}
