import { useEffect, useState } from 'react';
import useBithumbWsTicker from 'hooks/bithumb/useBithumbWsTicker';
import BithumbTable from '../Table/BithumbTable';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  ICoingeckoCoinData,
  coingeckoCoinDataState,
} from 'recoil/atoms/coingecko';
import { tableSortUpDownState, tableSortValueState } from 'recoil/atoms/table';
import { getCoingeckoData } from 'api/coingecko/getCoingeckoData';
import { changesRatio, highRatio, lowRatio } from 'utils/priceCalc';
import { searchCoinState } from 'recoil/atoms/common';

export function Bithumb() {
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
    <>
      {filteredSocketDatas.map((socketData) => {
        return <BithumbTable key={socketData.symbol} socketData={socketData} />;
      })}
    </>
  );
}
