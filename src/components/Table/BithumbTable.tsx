import * as styled from './Table.styles';
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
      <styled.CoinBox
        key={socketData.symbol}
        id={socketData.symbol}
        // onClick={clickCoinHandler}
        // $selected={selectedCoin[0].market === data.code}
        $selected={false}
      >
        <styled.CoinBoxName>
          <div>{englishName}</div>
          <div>{simpleSymbol}</div>
        </styled.CoinBoxName>
        <styled.CoinBoxPrice>
          <styled.CoinBoxPriceKorean>{closePrice}</styled.CoinBoxPriceKorean>
          <styled.CoinBoxPriceBinance>바이낸스 시세</styled.CoinBoxPriceBinance>
        </styled.CoinBoxPrice>
        <styled.CoinBoxKimchiPremium>김치프리미엄%</styled.CoinBoxKimchiPremium>
        <styled.CoinBoxChange $changeType={judgeColor(Number(changesRatio))}>
          <styled.CoinBoxChangeRate>
            {changesRatio > 0 ? '+' : null}
            {changesRatio.toFixed(2)}%
          </styled.CoinBoxChangeRate>
          <styled.CoinBoxChangePrice>
            {changes.toFixed(2)}
          </styled.CoinBoxChangePrice>
        </styled.CoinBoxChange>
        <styled.CoinBoxHighestWeek>
          <styled.CoinBoxHighestWeekRate>
            {highRatio > 0 ? '+' : null}
            {highRatio.toFixed(2) + '%'}
          </styled.CoinBoxHighestWeekRate>
          <styled.CoinBoxHighestWeekPrice>
            {high}
          </styled.CoinBoxHighestWeekPrice>
        </styled.CoinBoxHighestWeek>
        <styled.CoinBoxLowestWeek>
          <styled.CoinBoxLowestWeekRate>
            {'+' + lowRatio.toFixed(2) + '%'}
          </styled.CoinBoxLowestWeekRate>
          <styled.CoinBoxLowestWeekPrice>{low}</styled.CoinBoxLowestWeekPrice>
        </styled.CoinBoxLowestWeek>
        <styled.CoinBoxVolume>
          <div>{Math.ceil(convertMillonWon(Number(value)))}</div>
          <div>백만</div>
        </styled.CoinBoxVolume>
      </styled.CoinBox>
    </>
  );
}
