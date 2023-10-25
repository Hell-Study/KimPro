import * as styled from './Table.styles';
import { IBithumbFetchTicker } from 'components/bithumb/Bithumb.type';
import { convertMillonWon } from 'utils/convertMillonWon';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  ICoingeckoCoinData,
  coingeckoCoinDataState,
} from 'recoil/atoms/coingecko';
import judgeColor from 'utils/judgeColor';

export default function BithumbTable({
  socketData,
}: {
  socketData: IBithumbFetchTicker;
}) {
  const {
    closing_price,
    min_price,
    max_price,
    prev_closing_price,
    acc_trade_value_24H,
  } = socketData[1];

  const [thumb, setThumb] = useState('');
  const [englishName, setEnglishName] = useState('');
  const coingeckoCoinData = useRecoilValue(coingeckoCoinDataState);
  useEffect(() => {
    if (simpleSymbol !== undefined) {
      const target = coingeckoCoinData.filter((coin: ICoingeckoCoinData) => {
        return coin.symbol === simpleSymbol;
      });
      setEnglishName(target[0]?.name);
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

  return (
    <>
      <styled.CoinBox
        key={socketData[0]}
        id={socketData[0]}
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
          {nowPrice}
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
            {highRatio.toFixed(2)}%
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
