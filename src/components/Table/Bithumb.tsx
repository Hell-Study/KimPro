import * as styled from './Table.styles';
import { useEffect } from 'react';
import useBithumbWsTicker from 'hooks/bithumb/useBithumbWsTicker';
import BithumbTable from './BithumbTable';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { coingeckoCoinDataState } from 'recoil/atoms/coingecko';
import { getCoingeckoData } from 'api/coingecko/getCoingeckoData';
import useBinanceTicker from 'hooks/binance/useBinanceTicker';
import { tableSortUpDownState, tableSortValueState } from 'recoil/atoms/table';
import { changesRatio, highRatio, lowRatio } from 'utils/bithumbCalc';

export function Bithumb() {
  const socketDatas = useBithumbWsTicker();

  const setCoingeckoData = useSetRecoilState(coingeckoCoinDataState);
  useEffect(() => {
    getCoingeckoData().then((res) => {
      setCoingeckoData(res.coins);
    });
  }, []);

  const { tickers } = useBinanceTicker();
  const removeUSDT = (symbol: string) => {
    return symbol.replace('USDT', '');
  };

  const tableSortValue = useRecoilValue(tableSortValueState);
  const tableSortUpDown = useRecoilValue(tableSortUpDownState);
  useEffect(() => {
    switch (tableSortValue) {
      case '코인':
        if (tableSortUpDown) {
          socketDatas.sort((a, b) => {
            if (a[0] > b[0]) {
              return 1;
            } else {
              return -1;
            }
          });
        } else {
          socketDatas.sort((a, b) => {
            if (a[0] > b[0]) {
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
            (a, b) => Number(a[1].closing_price) - Number(b[1].closing_price),
          );
        } else {
          socketDatas.sort(
            (a, b) => Number(b[1].closing_price) - Number(a[1].closing_price),
          );
        }
        break;
      // case '김프':
      //   socketDatas.sort(
      //     (a, b) => a.acc_trade_price_24h - b.acc_trade_price_24h,
      //   );
      //   break;
      case '전일대비':
        if (tableSortUpDown) {
          socketDatas.sort((a, b) => changesRatio(a) - changesRatio(b));
        } else {
          socketDatas.sort((a, b) => changesRatio(b) - changesRatio(a));
        }
        break;
      case '고가대비(전일)':
        if (tableSortUpDown) {
          socketDatas.sort((a, b) => highRatio(a) - highRatio(b));
        } else {
          socketDatas.sort((a, b) => highRatio(b) - highRatio(a));
        }
        break;
      case '저가대비(전일)':
        if (tableSortUpDown) {
          socketDatas.sort((a, b) => lowRatio(a) - lowRatio(b));
        } else {
          socketDatas.sort((a, b) => lowRatio(b) - lowRatio(a));
        }
        break;
      case '거래액(일)':
        if (tableSortUpDown) {
          socketDatas.sort(
            (a, b) =>
              Number(a[1].acc_trade_value_24H) -
              Number(b[1].acc_trade_value_24H),
          );
        } else {
          socketDatas.sort(
            (a, b) =>
              Number(b[1].acc_trade_value_24H) -
              Number(a[1].acc_trade_value_24H),
          );
        }
        break;
    }
  }, [socketDatas, tableSortValue, tableSortUpDown]);

  return (
    <styled.CoinListWrapper>
      {socketDatas.map((socketData) => {
        const matchingTicker = tickers?.find(
          (ticker) => removeUSDT(ticker.s) === socketData[0],
        );
        return (
          <BithumbTable
            key={socketData[0]}
            socketData={socketData}
            matchingTicker={matchingTicker}
          />
        );
      })}
    </styled.CoinListWrapper>
  );
}
