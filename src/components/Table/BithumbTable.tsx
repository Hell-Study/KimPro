import * as styled from './Table.styles';
import { IBithumbTicker } from 'components/bithumb/Bithumb.type';
import { convertMillonWon } from 'utils/convertMillonWon';
import { useEffect } from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import judgeColor from 'utils/judgeColor';
import { exchangeRateState } from 'recoil/atoms/exchange';
import { changes, changesRatio, highRatio, lowRatio } from 'utils/priceCalc';
import {
  selectedBithumbCoinInfoState,
  selectedBithumbCoinState,
} from 'recoil/atoms/bithumb';
import useMatchCoingecko from 'hooks/bithumb/useMatchCoingecko';

interface IProps {
  socketData: IBithumbTicker;
}

export default function BithumbTable({ socketData }: IProps) {
  const {
    symbol,
    closing_price,
    min_price,
    max_price,
    acc_trade_value_24H,
    binancePrice,
  } = socketData;

  const [selectedBithumbCoin, setSelectedBithumbCoin] = useRecoilState(
    selectedBithumbCoinState,
  );
  const setSelectedBithumbCoinInfo = useSetRecoilState(
    selectedBithumbCoinInfoState,
  );
  const { thumb, coinName } = useMatchCoingecko(symbol);
  const nowPrice = Number(closing_price);

  useEffect(() => {
    if (socketData.symbol === selectedBithumbCoin) {
      setSelectedBithumbCoinInfo(socketData);
    }
  }, [selectedBithumbCoin, socketData]);

  const clickCoinHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setSelectedBithumbCoin(e.currentTarget.id);
  };

  const myExchangeRate = useRecoilValue(exchangeRateState);

  return (
    <>
      <styled.CoinBox
        key={symbol}
        id={symbol}
        onClick={clickCoinHandler}
        $selected={selectedBithumbCoin === socketData.symbol}
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
          <styled.CoinBoxNameMarket>{symbol}</styled.CoinBoxNameMarket>
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
