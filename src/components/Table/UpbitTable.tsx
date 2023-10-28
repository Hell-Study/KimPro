import { useEffect, useState } from 'react';
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
import useFetchUpbitMarketCode from 'api/upbit/useFetchUpbitMarketCode';
import { exchangeRateState } from 'recoil/atoms/exchange';
import { highest_52_week_rate, lowest_52_week_rate } from 'utils/priceCalc';
import useUpbitTicker, { IUpbitMarketCode } from 'hooks/upbit/useUpbitTicker';

export default function UpbitTable() {
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

      // case '김프':
      //   socketDatas.sort(
      //     (a, b) => a.acc_trade_price_24h - b.acc_trade_price_24h,
      //   );
      //   break;

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
                <div>
                  <img
                    alt={`${data.code?.split('-')[1]} 아이콘`}
                    width="15"
                    height="15"
                    decoding="async"
                    data-nimg="1"
                    className="rounded-full"
                    src={`https://static.upbit.com/logos/${data.code?.split(
                      '-',
                    )[1]}.png`}
                  />
                </div>

                <styled.CoinBoxName>
                  <styled.CoinBoxNameKorean>
                    <div>
                      {
                        marketCodes.filter(
                          (code) => code?.market === data.code,
                        )[0]?.korean_name
                      }
                    </div>
                  </styled.CoinBoxNameKorean>
                  <styled.CoinBoxNameMarket>
                    {
                      marketCodes
                        .filter((code) => code?.market === data.code)[0]
                        ?.market?.split('-')[1]
                    }
                  </styled.CoinBoxNameMarket>
                </styled.CoinBoxName>
                <styled.CoinBoxPrice>
                  <styled.CoinBoxPriceKorean>
                    {data.trade_price?.toLocaleString('ko-KR')}
                  </styled.CoinBoxPriceKorean>
                  <styled.CoinBoxPriceBinance>
                    {`${
                      data.binancePrice
                        ? (
                            parseFloat(data.binancePrice) * myExchangeRate
                          ).toLocaleString('ko-KR')
                        : ''
                    }`}
                  </styled.CoinBoxPriceBinance>
                </styled.CoinBoxPrice>
                <styled.CoinBoxKimchiPremium
                  $isPositive={
                    data.binancePrice
                      ? data.trade_price >
                        parseFloat(data.binancePrice) * myExchangeRate
                        ? 'true'
                        : 'false'
                      : 'none'
                  }
                >
                  <styled.CoinBoxKimchiPremiumRate>
                    {data.binancePrice ? (
                      <>
                        {(data.trade_price /
                          (parseFloat(data.binancePrice) * myExchangeRate) -
                          1) *
                          100 >
                          0 && '+'}
                        {`${(
                          (data.trade_price /
                            (parseFloat(data.binancePrice) * myExchangeRate) -
                            1) *
                          100
                        ).toFixed(2)}%`}
                      </>
                    ) : (
                      ''
                    )}
                  </styled.CoinBoxKimchiPremiumRate>
                  <styled.CoinBoxKimchiPremiumDiff>
                    {data.binancePrice ? (
                      <>
                        {data.trade_price -
                          parseFloat(data.binancePrice) * myExchangeRate >
                          0 && '+'}
                        {(
                          data.trade_price -
                          parseFloat(data.binancePrice) * myExchangeRate
                        ).toFixed(2)}
                      </>
                    ) : (
                      ''
                    )}
                  </styled.CoinBoxKimchiPremiumDiff>
                </styled.CoinBoxKimchiPremium>
                <styled.CoinBoxChange $changeType={data.change}>
                  <styled.CoinBoxChangeRate>
                    {data.signed_change_rate > 0 ? '+' : null}
                    {(data.signed_change_rate * 100).toFixed(2)}%
                  </styled.CoinBoxChangeRate>
                  <styled.CoinBoxChangePrice>
                    {data.signed_change_price?.toLocaleString('ko-KR')}
                  </styled.CoinBoxChangePrice>
                </styled.CoinBoxChange>
                <styled.CoinBoxHighestWeek>
                  <styled.CoinBoxHighestWeekRate>
                    {data.highest_52_week_price
                      ? highest_52_week_rate(data).toFixed(2) + '%'
                      : null}
                  </styled.CoinBoxHighestWeekRate>
                  <styled.CoinBoxHighestWeekPrice>
                    {data.highest_52_week_price
                      ? data.highest_52_week_price?.toLocaleString('ko-KR')
                      : null}
                  </styled.CoinBoxHighestWeekPrice>
                </styled.CoinBoxHighestWeek>
                <styled.CoinBoxLowestWeek>
                  <styled.CoinBoxLowestWeekRate>
                    {data.lowest_52_week_price
                      ? '+' + lowest_52_week_rate(data).toFixed(2) + '%'
                      : null}
                  </styled.CoinBoxLowestWeekRate>
                  <styled.CoinBoxLowestWeekPrice>
                    {data.lowest_52_week_price
                      ? data.lowest_52_week_price?.toLocaleString('ko-KR')
                      : null}
                  </styled.CoinBoxLowestWeekPrice>
                </styled.CoinBoxLowestWeek>
                <styled.CoinBoxVolume>
                  <div>
                    {Math.ceil(
                      convertMillonWon(data.acc_trade_price_24h),
                    )?.toLocaleString('ko-KR')}
                  </div>
                  <div>백만</div>
                </styled.CoinBoxVolume>
              </styled.CoinBox>
            );
          })
        : null}
    </styled.CoinListWrapper>
  );
}
