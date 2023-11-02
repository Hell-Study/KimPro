import * as styled from './Table.styles';
import { IBithumbTicker } from 'components/bithumb/Bithumb.type';
import { convertMillonWon } from 'utils/convertMillonWon';
import { useEffect } from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import judgeColor from 'utils/judgeColor';
import { exchangeRateState } from 'recoil/atoms/exchangeAtoms';
import {
  binancePriceToKRW,
  changes,
  changesRatio,
  highRatio,
  kimchiPremiumDiff,
  kimchiPremiumRatio,
  lowRatio,
} from 'utils/priceCalc';
import {
  selectedBithumbCoinInfoState,
  selectedBithumbCoinState,
} from 'recoil/atoms/bithumbAtoms';
import useMatchCoingecko from 'hooks/bithumb/useMatchCoingecko';

interface IProps {
  socketData: IBithumbTicker;
}

export default function CoinList({ socketData }: IProps) {
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
    <styled.CoinBox
      id={symbol}
      onClick={clickCoinHandler}
      $selected={selectedBithumbCoin === socketData.symbol}
    >
      <styled.CoinIconWrap>
        <styled.CoinIcon
          alt={`${coinName} 아이콘`}
          src={thumb}
          loading="lazy"
        />
      </styled.CoinIconWrap>

      <styled.CoinLeftWrap>
        <styled.CoinName>{coinName}</styled.CoinName>
        <styled.CoinSubText>{symbol}</styled.CoinSubText>
      </styled.CoinLeftWrap>

      <styled.CoinRightWrap>
        <styled.CoinKoreanPrice>
          {Number(closing_price).toLocaleString('ko-KR')}
        </styled.CoinKoreanPrice>
        <styled.CoinSubText>{`${
          binancePrice
            ? binancePriceToKRW(binancePrice, myExchangeRate).toLocaleString(
                'ko-KR',
              )
            : ''
        }`}</styled.CoinSubText>
      </styled.CoinRightWrap>

      <styled.CoinRightWrap>
        <styled.CoinKimpRatio
          $isPositive={
            binancePrice
              ? nowPrice > binancePriceToKRW(binancePrice, myExchangeRate)
                ? 'true'
                : 'false'
              : 'none'
          }
        >
          {binancePrice ? (
            <>
              {kimchiPremiumRatio(nowPrice, binancePrice, myExchangeRate) > 0 &&
                '+'}
              {kimchiPremiumRatio(
                nowPrice,
                binancePrice,
                myExchangeRate,
              ).toFixed(2)}
              %
            </>
          ) : (
            ''
          )}
        </styled.CoinKimpRatio>
        <styled.CoinSubText>
          {binancePrice ? (
            <>
              {kimchiPremiumDiff(nowPrice, binancePrice, myExchangeRate) > 0 &&
                '+'}
              {kimchiPremiumDiff(
                nowPrice,
                binancePrice,
                myExchangeRate,
              ).toFixed(2)}
            </>
          ) : (
            ''
          )}
        </styled.CoinSubText>
      </styled.CoinRightWrap>

      <styled.CoinRightWrap>
        <styled.CoinChangeRatio $changeType={judgeColor(Number(changesRatio))}>
          {changesRatio(socketData) > 0 ? '+' : null}
          {changesRatio(socketData).toFixed(2)}%
        </styled.CoinChangeRatio>
        <styled.CoinSubText>
          {changes(socketData).toLocaleString('ko-KR')}
        </styled.CoinSubText>
      </styled.CoinRightWrap>

      <styled.CoinRightWrap>
        <styled.CoinHighestRatio>
          {highRatio(socketData) > 0 ? '+' : null}
          {highRatio(socketData).toFixed(2)}%
        </styled.CoinHighestRatio>
        <styled.CoinSubText>
          {Number(max_price).toLocaleString('ko-KR')}
        </styled.CoinSubText>
      </styled.CoinRightWrap>

      <styled.CoinRightWrap>
        <styled.CoinLowestRatio>
          {'+' + lowRatio(socketData).toFixed(2) + '%'}
        </styled.CoinLowestRatio>
        <styled.CoinSubText>
          {Number(min_price).toLocaleString('ko-KR')}
        </styled.CoinSubText>
      </styled.CoinRightWrap>

      <styled.CoinRightWrap>
        <styled.CoinSubText>
          {Math.ceil(
            convertMillonWon(Number(Number(acc_trade_value_24H))),
          ).toLocaleString('ko-KR')}
          백만
        </styled.CoinSubText>
      </styled.CoinRightWrap>
    </styled.CoinBox>
  );
}
