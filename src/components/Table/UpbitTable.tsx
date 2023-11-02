import { useEffect, useState, memo } from 'react';
import * as styled from './Table.styles';
import { convertMillonWon } from 'utils/convertMillonWon';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  selectedCoinInfoState,
  selectedCoinState,
  searchCoinState,
} from 'recoil/atoms/common';
import { tableSortUpDownState, tableSortValueState } from 'recoil/atoms/table';
import { upbitMarketCodesState } from 'recoil/atoms/upbit';
import useFetchUpbitMarketCode from 'hooks/upbit/useFetchUpbitMarketCode';
import { exchangeRateState } from 'recoil/atoms/exchange';
import {
  binancePriceToKRW,
  kimchiPremiumRatio,
  kimchiPremiumDiff,
  highest_52_week_rate,
  lowest_52_week_rate,
} from 'utils/priceCalc';
import useUpbitTicker, { IUpbitMarketCode } from 'hooks/upbit/useUpbitTicker';

function UpbitTable() {
  const { marketCodes } = useFetchUpbitMarketCode();
  const [upbitMarketCodes, setUpbitMarketCodes] = useRecoilState(
    upbitMarketCodesState,
  );
  setUpbitMarketCodes(marketCodes);
  const { socketDatas } = useUpbitTicker(upbitMarketCodes);

  const [selectedCoin, setSelectedCoin] = useRecoilState(selectedCoinState);

  const [selectedCoinInfo, setSelectedCoinInfo] = useRecoilState(
    selectedCoinInfoState,
  );

  useEffect(() => {
    if (socketDatas) {
      const targetData = socketDatas.filter(
        (data) => data.code == selectedCoin[0].market,
      );
      setSelectedCoinInfo(targetData);
    }
  }, [selectedCoin, socketDatas]);

  const clickCoinHandler = (evt: React.MouseEvent<HTMLDivElement>) => {
    const currentTarget = marketCodes.filter(
      (code: IUpbitMarketCode) => code.market === evt.currentTarget.id,
    );
    setSelectedCoin(currentTarget);
  };

  const myExchangeRate = useRecoilValue(exchangeRateState);
  const searchCoin = useRecoilValue(searchCoinState);
  const [filteredSocketDatas, setFilteredSocketDatas] = useState(socketDatas);

  useEffect(() => {
    const filteredSocketDatas = socketDatas.filter((data) =>
      marketCodes.some(
        (marketCode) =>
          marketCode.market === data.code &&
          marketCode.korean_name.includes(searchCoin),
      ),
    );
    setFilteredSocketDatas(filteredSocketDatas);
  }, [searchCoin, socketDatas]);

  // TODO|서지수 - 모듈화 예정
  const tableSortValue = useRecoilValue(tableSortValueState);
  const tableSortUpDown = useRecoilValue(tableSortUpDownState);
  useEffect(() => {
    switch (tableSortValue) {
      case '코인':
        if (tableSortUpDown) {
          socketDatas.sort((a, b) => {
            if (a.code > b.code) {
              return 1;
            } else {
              return -1;
            }
          });
        } else {
          socketDatas.sort((a, b) => {
            if (a.code > b.code) {
              return -1;
            } else {
              return 1;
            }
          });
        }
        break;

      case '현재가':
        if (tableSortUpDown) {
          socketDatas.sort((a, b) => a.trade_price - b.trade_price);
        } else {
          socketDatas.sort((a, b) => b.trade_price - a.trade_price);
        }
        break;

      case '김프':
        if (tableSortUpDown) {
          socketDatas.sort((a, b) => {
            if (a.binancePrice && b.binancePrice) {
              return (
                kimchiPremiumRatio(
                  a.trade_price,
                  a.binancePrice,
                  myExchangeRate,
                ) -
                kimchiPremiumRatio(
                  b.trade_price,
                  b.binancePrice,
                  myExchangeRate,
                )
              );
            } else if (a.binancePrice && !b.binancePrice) {
              return -1;
            } else {
              return 1;
            }
          });
        } else {
          socketDatas.sort((a, b) => {
            if (a.binancePrice && b.binancePrice) {
              return (
                kimchiPremiumRatio(
                  b.trade_price,
                  b.binancePrice,
                  myExchangeRate,
                ) -
                kimchiPremiumRatio(
                  a.trade_price,
                  a.binancePrice,
                  myExchangeRate,
                )
              );
            } else if (a.binancePrice && !b.binancePrice) {
              return -1;
            } else {
              return 1;
            }
          });
        }
        break;

      case '전일대비':
        if (tableSortUpDown) {
          socketDatas.sort(
            (a, b) => a.signed_change_rate - b.signed_change_rate,
          );
        } else {
          socketDatas.sort(
            (a, b) => b.signed_change_rate - a.signed_change_rate,
          );
        }
        break;

      case '고가대비(52주)':
        if (tableSortUpDown) {
          socketDatas.sort(
            (a, b) => highest_52_week_rate(a) - highest_52_week_rate(b),
          );
        } else {
          socketDatas.sort(
            (a, b) => highest_52_week_rate(b) - highest_52_week_rate(a),
          );
        }
        break;

      case '저가대비(52주)':
        if (tableSortUpDown) {
          socketDatas.sort(
            (a, b) => lowest_52_week_rate(a) - lowest_52_week_rate(b),
          );
        } else {
          socketDatas.sort(
            (a, b) => lowest_52_week_rate(b) - lowest_52_week_rate(a),
          );
        }
        break;

      case '거래액(일)':
        if (tableSortUpDown) {
          socketDatas.sort(
            (a, b) => a.acc_trade_price_24h - b.acc_trade_price_24h,
          );
        } else {
          socketDatas.sort(
            (a, b) => b.acc_trade_price_24h - a.acc_trade_price_24h,
          );
        }
        break;
    }
  }, [socketDatas, tableSortValue, tableSortUpDown]);

  return (
    <styled.CoinListWrapper>
      {filteredSocketDatas
        ? filteredSocketDatas.map((data) => {
            return (
              <styled.CoinBox
                key={data.code}
                id={data.code}
                onClick={clickCoinHandler}
                $selected={selectedCoin[0]?.market === data.code}
              >
                <styled.CoinIconWrap>
                  <styled.CoinIcon
                    alt={`${data.code?.split('-')[1]} 아이콘`}
                    src={`https://static.upbit.com/logos/${data.code?.split(
                      '-',
                    )[1]}.png`}
                    loading="lazy"
                  />
                </styled.CoinIconWrap>

                <styled.CoinLeftWrap>
                  <styled.CoinName>
                    {
                      marketCodes.filter(
                        (code) => code?.market === data.code,
                      )[0]?.korean_name
                    }
                  </styled.CoinName>
                  <styled.CoinSubText>
                    {
                      marketCodes
                        .filter((code) => code?.market === data.code)[0]
                        ?.market?.split('-')[1]
                    }
                  </styled.CoinSubText>
                </styled.CoinLeftWrap>

                <styled.CoinRightWrap>
                  <styled.CoinKoreanPrice>
                    {data.trade_price?.toLocaleString('ko-KR')}
                  </styled.CoinKoreanPrice>
                  <styled.CoinSubText>
                    {data.binancePrice
                      ? binancePriceToKRW(
                          data.binancePrice,
                          myExchangeRate,
                        ).toLocaleString('ko-KR')
                      : ''}
                  </styled.CoinSubText>
                </styled.CoinRightWrap>

                <styled.CoinRightWrap>
                  <styled.CoinKimpRatio
                    $isPositive={
                      data.binancePrice
                        ? data.trade_price >
                          binancePriceToKRW(data.binancePrice, myExchangeRate)
                          ? 'true'
                          : 'false'
                        : 'none'
                    }
                  >
                    {data.binancePrice ? (
                      <>
                        {kimchiPremiumRatio(
                          data.trade_price,
                          data.binancePrice,
                          myExchangeRate,
                        ) > 0 && '+'}
                        {kimchiPremiumRatio(
                          data.trade_price,
                          data.binancePrice,
                          myExchangeRate,
                        ).toFixed(2)}
                        %
                      </>
                    ) : (
                      ''
                    )}
                  </styled.CoinKimpRatio>
                  <styled.CoinSubText>
                    {data.binancePrice ? (
                      <>
                        {kimchiPremiumDiff(
                          data.trade_price,
                          data.binancePrice,
                          myExchangeRate,
                        ) > 0 && '+'}
                        {kimchiPremiumDiff(
                          data.trade_price,
                          data.binancePrice,
                          myExchangeRate,
                        ).toFixed(2)}
                      </>
                    ) : (
                      ''
                    )}
                  </styled.CoinSubText>
                </styled.CoinRightWrap>

                <styled.CoinRightWrap>
                  <styled.CoinChangeRatio $changeType={data.change}>
                    {data.signed_change_rate > 0 ? '+' : null}
                    {(data.signed_change_rate * 100).toFixed(2)}%
                  </styled.CoinChangeRatio>
                  <styled.CoinSubText>
                    {data.signed_change_price?.toLocaleString('ko-KR')}
                  </styled.CoinSubText>
                </styled.CoinRightWrap>

                <styled.CoinRightWrap>
                  <styled.CoinHighestRatio>
                    {data.highest_52_week_price
                      ? highest_52_week_rate(data).toFixed(2) + '%'
                      : null}
                  </styled.CoinHighestRatio>
                  <styled.CoinSubText>
                    {data.highest_52_week_price
                      ? data.highest_52_week_price?.toLocaleString('ko-KR')
                      : null}
                  </styled.CoinSubText>
                </styled.CoinRightWrap>

                <styled.CoinRightWrap>
                  <styled.CoinLowestRatio>
                    {data.lowest_52_week_price
                      ? '+' + lowest_52_week_rate(data).toFixed(2) + '%'
                      : null}
                  </styled.CoinLowestRatio>
                  <styled.CoinSubText>
                    {data.lowest_52_week_price
                      ? data.lowest_52_week_price?.toLocaleString('ko-KR')
                      : null}
                  </styled.CoinSubText>
                </styled.CoinRightWrap>

                <styled.CoinRightWrap>
                  <styled.CoinSubText>
                    {Math.ceil(
                      convertMillonWon(data.acc_trade_price_24h),
                    )?.toLocaleString('ko-KR')}
                    백만
                  </styled.CoinSubText>
                </styled.CoinRightWrap>
              </styled.CoinBox>
            );
          })
        : null}
    </styled.CoinListWrapper>
  );
}

export default memo(UpbitTable);
