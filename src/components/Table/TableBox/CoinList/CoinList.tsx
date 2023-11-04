import { useEffect } from 'react';
import * as styled from './CoinList.styles';
import type { ITicker } from '../../../../@types/common.types';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { exchangeRateState } from 'recoil/atoms/exchangeAtoms';
import {
  selectedCoinState,
  selectedCoinInfoState,
} from 'recoil/atoms/tableAtoms';
import { judgeColor } from 'utils';
import { convertMillonWon } from 'utils';
import {
  binancePriceToKRW,
  kimchiPremiumDiff,
  kimchiPremiumRatio,
} from 'utils';

interface IProps {
  socketData: ITicker;
}

export function CoinList({ socketData }: IProps) {
  const {
    symbol,
    coinName,
    thumbnail,
    tradePrice,
    changeRatio,
    changePrice,
    highestRatio,
    highestPrice,
    lowestRatio,
    lowestPrice,
    tradeValue_24H,
    binancePrice,
  } = socketData;

  const [selectedCoin, setSelectedCoin] = useRecoilState(selectedCoinState);
  const setSelectedCoinInfo = useSetRecoilState(selectedCoinInfoState);

  useEffect(() => {
    if (symbol === selectedCoin) setSelectedCoinInfo(socketData);
  }, [selectedCoin, socketData]);

  const clickCoinHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setSelectedCoin(e.currentTarget.id);
  };

  const myExchangeRate = useRecoilValue(exchangeRateState);

  return (
    <styled.CoinBox
      id={symbol}
      onClick={clickCoinHandler}
      $selected={selectedCoin === symbol}
    >
      <styled.CoinIconWrap>
        <styled.CoinIcon
          alt={`${coinName} 아이콘`}
          src={thumbnail}
          loading="lazy"
        />
      </styled.CoinIconWrap>

      <styled.CoinLeftWrap>
        <styled.CoinName>{coinName}</styled.CoinName>
        <styled.CoinSubText>{symbol}</styled.CoinSubText>
      </styled.CoinLeftWrap>

      <styled.CoinRightWrap>
        <styled.CoinKoreanPrice>
          {tradePrice.toLocaleString('ko-KR')}
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
              ? tradePrice > binancePriceToKRW(binancePrice, myExchangeRate)
                ? 'true'
                : 'false'
              : 'none'
          }
        >
          {binancePrice ? (
            <>
              {kimchiPremiumRatio(tradePrice, binancePrice, myExchangeRate) >
                0 && '+'}
              {kimchiPremiumRatio(
                tradePrice,
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
              {kimchiPremiumDiff(tradePrice, binancePrice, myExchangeRate) >
                0 && '+'}
              {kimchiPremiumDiff(
                tradePrice,
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
        <styled.CoinChangeRatio $changeType={judgeColor(changeRatio)}>
          {changeRatio > 0 ? '+' : null}
          {changeRatio.toFixed(2)}%
        </styled.CoinChangeRatio>
        <styled.CoinSubText>
          {changePrice.toLocaleString('ko-KR')}
        </styled.CoinSubText>
      </styled.CoinRightWrap>

      <styled.CoinRightWrap>
        <styled.CoinHighestRatio>
          {highestRatio > 0 ? '+' : null}
          {highestRatio.toFixed(2)}%
        </styled.CoinHighestRatio>
        <styled.CoinSubText>
          {highestPrice.toLocaleString('ko-KR')}
        </styled.CoinSubText>
      </styled.CoinRightWrap>

      <styled.CoinRightWrap>
        <styled.CoinLowestRatio>
          {'+' + lowestRatio.toFixed(2) + '%'}
        </styled.CoinLowestRatio>
        <styled.CoinSubText>
          {lowestPrice.toLocaleString('ko-KR')}
        </styled.CoinSubText>
      </styled.CoinRightWrap>

      <styled.CoinRightWrap>
        <styled.CoinSubText>
          {Math.ceil(convertMillonWon(tradeValue_24H)).toLocaleString('ko-KR')}
          백만
        </styled.CoinSubText>
      </styled.CoinRightWrap>
    </styled.CoinBox>
  );
}
