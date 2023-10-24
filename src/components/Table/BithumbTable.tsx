import * as styled from './Table.styles';
import { IBithumbTicker } from 'components/bithumb/Bithumb.type';
import { convertMillonWon } from 'utils/convertMillonWon';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  ICoingeckoCoinData,
  coingeckoCoinDataState,
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
  const [thumb, setThumb] = useState('');

  const coingeckoCoinData = useRecoilValue(coingeckoCoinDataState);
  useEffect(() => {
    const target = coingeckoCoinData.filter((coin: ICoingeckoCoinData) => {
      return coin.symbol == symbol.replace('_KRW', '');
    });
    setEnglishName(target[0].name);
    setThumb(target[0].thumb);
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
          <img src={thumb} />
          <div>{englishName}</div>
          <div>{simpleSymbol}</div>
        </styled.CoinBoxName>
        <styled.CoinBoxPrice $changeType={'EVEN'}>
          {closePrice}
        </styled.CoinBoxPrice>
        <styled.CoinBoxKimchiPremium>
          (국내코인원화 / 해외코인달러 x 환율 - 1)*100
        </styled.CoinBoxKimchiPremium>
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
