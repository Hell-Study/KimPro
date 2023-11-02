import { useEffect, useState } from 'react';
import useBithumbWsTicker from 'hooks/bithumb/useBithumbWsTicker';
import CoinList from './CoinList';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  ICoingeckoCoinData,
  coingeckoCoinDataState,
} from 'recoil/atoms/coingeckoAtoms';
import {
  tableSortUpDownState,
  tableSortValueState,
} from 'recoil/atoms/tableAtoms';
import { getCoingeckoData } from 'api/coingecko/getCoingeckoData';
import { changesRatio, highRatio, kimchiPremiumRatio, lowRatio } from 'utils';
import { searchCoinState } from 'recoil/atoms/commonAtoms';
import { exchangeRateState } from 'recoil/atoms/exchangeAtoms';
import * as styled from './Table.styles';

export function BithumbTable() {
  const socketDatas = useBithumbWsTicker();

  const [coingeckoCoinData, setCoingeckoData] = useRecoilState(
    coingeckoCoinDataState,
  );
  useEffect(() => {
    getCoingeckoData().then((res) => {
      setCoingeckoData(res.coins);
    });
  }, []);
  const searchCoin = useRecoilValue(searchCoinState);
  const [filteredSocketDatas, setFilteredSocketDatas] = useState(socketDatas);

  useEffect(() => {
    const filteredSocketDatas = socketDatas.filter((socketData) =>
      coingeckoCoinData.some(
        (gecko: ICoingeckoCoinData) =>
          gecko.symbol == socketData.symbol &&
          gecko.name.toLowerCase().includes(searchCoin.toLowerCase()),
      ),
    );
    setFilteredSocketDatas(filteredSocketDatas);
  }, [searchCoin, socketDatas]);

  const myExchangeRate = useRecoilValue(exchangeRateState);

  // TODO|서지수 - 모듈화 예정
  const tableSortValue = useRecoilValue(tableSortValueState);
  const tableSortUpDown = useRecoilValue(tableSortUpDownState);
  useEffect(() => {
    switch (tableSortValue) {
      case '코인':
        if (tableSortUpDown) {
          socketDatas.sort((a, b) => {
            if (a.symbol > b.symbol) {
              return 1;
            } else {
              return -1;
            }
          });
        } else {
          socketDatas.sort((a, b) => {
            if (a.symbol > b.symbol) {
              return -1;
            } else {
              return 1;
            }
          });
        }
        break;
      case '현재가':
        if (tableSortUpDown) {
          socketDatas.sort(
            (a, b) => Number(a.closing_price) - Number(b.closing_price),
          );
        } else {
          socketDatas.sort(
            (a, b) => Number(b.closing_price) - Number(a.closing_price),
          );
        }
        break;
      case '김프':
        if (tableSortUpDown) {
          socketDatas.sort((a, b) => {
            if (a.binancePrice && b.binancePrice) {
              return (
                kimchiPremiumRatio(
                  Number(a.closing_price),
                  a.binancePrice,
                  myExchangeRate,
                ) -
                kimchiPremiumRatio(
                  Number(b.closing_price),
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
                  Number(b.closing_price),
                  b.binancePrice,
                  myExchangeRate,
                ) -
                kimchiPremiumRatio(
                  Number(a.closing_price),
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
            (a, b) =>
              changesRatio(a.closing_price, a.prev_closing_price) -
              changesRatio(b.closing_price, b.prev_closing_price),
          );
        } else {
          socketDatas.sort(
            (a, b) =>
              changesRatio(b.closing_price, b.prev_closing_price) -
              changesRatio(a.closing_price, a.prev_closing_price),
          );
        }
        break;
      case '고가대비(전일)':
        if (tableSortUpDown) {
          socketDatas.sort(
            (a, b) =>
              highRatio(a.closing_price, a.max_price) -
              highRatio(b.closing_price, b.max_price),
          );
        } else {
          socketDatas.sort(
            (a, b) =>
              highRatio(b.closing_price, b.max_price) -
              highRatio(a.closing_price, a.max_price),
          );
        }
        break;
      case '저가대비(전일)':
        if (tableSortUpDown) {
          socketDatas.sort(
            (a, b) =>
              lowRatio(a.closing_price, a.min_price) -
              lowRatio(b.closing_price, b.min_price),
          );
        } else {
          socketDatas.sort(
            (a, b) =>
              lowRatio(b.closing_price, b.min_price) -
              lowRatio(a.closing_price, a.min_price),
          );
        }
        break;
      case '거래액(일)':
        if (tableSortUpDown) {
          socketDatas.sort(
            (a, b) =>
              Number(a.acc_trade_value_24H) - Number(b.acc_trade_value_24H),
          );
        } else {
          socketDatas.sort(
            (a, b) =>
              Number(b.acc_trade_value_24H) - Number(a.acc_trade_value_24H),
          );
        }
        break;
    }
  }, [socketDatas, tableSortValue, tableSortUpDown]);

  return (
    <styled.CoinListWrapper>
      {filteredSocketDatas.map((socketData) => {
        return <CoinList key={socketData.symbol} socketData={socketData} />;
      })}
    </styled.CoinListWrapper>
  );
}
