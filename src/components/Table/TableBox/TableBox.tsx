import { memo, useEffect, useState } from 'react';
import * as styled from './TableBox.styles';
import useGetTicker from 'hooks/useGetTicker';
import { useRecoilValue } from 'recoil';
import { searchCoinState } from 'recoil/atoms/commonAtoms';
import {
  tableSortUpDownState,
  tableSortValueState,
} from 'recoil/atoms/tableAtoms';
import { exchangeRateState } from 'recoil/atoms/exchangeAtoms';
import { kimchiPremiumRatio } from 'utils';
import { CoinList } from './CoinList';

export const TableBox = () => {
  const socketDatas = useGetTicker();

  const searchCoin = useRecoilValue(searchCoinState);
  const [filteredSocketDatas, setFilteredSocketDatas] = useState(socketDatas);

  useEffect(() => {
    const filteredSocketDatas = socketDatas.filter((socketData) =>
      socketData.coinName.toLowerCase().includes(searchCoin.toLowerCase()),
    );
    setFilteredSocketDatas(filteredSocketDatas);
  }, [searchCoin, socketDatas]);

  const myExchangeRate = useRecoilValue(exchangeRateState);

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
          socketDatas.sort((a, b) => a.tradePrice - b.tradePrice);
        } else {
          socketDatas.sort((a, b) => b.tradePrice - a.tradePrice);
        }
        break;
      case '김프':
        if (tableSortUpDown) {
          socketDatas.sort((a, b) => {
            if (a.binancePrice && b.binancePrice) {
              return (
                kimchiPremiumRatio(
                  a.tradePrice,
                  a.binancePrice,
                  myExchangeRate,
                ) -
                kimchiPremiumRatio(b.tradePrice, b.binancePrice, myExchangeRate)
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
                  b.tradePrice,
                  b.binancePrice,
                  myExchangeRate,
                ) -
                kimchiPremiumRatio(a.tradePrice, a.binancePrice, myExchangeRate)
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
          socketDatas.sort((a, b) => a.changeRatio - b.changeRatio);
        } else {
          socketDatas.sort((a, b) => b.changeRatio - a.changeRatio);
        }
        break;
      case '고가대비(52주)' || '고가대비(전일)':
        if (tableSortUpDown) {
          socketDatas.sort((a, b) => a.highestRatio - b.highestRatio);
        } else {
          socketDatas.sort((a, b) => b.highestRatio - a.highestRatio);
        }
        break;
      case '저가대비(52주)' || '저가대비(전일)':
        if (tableSortUpDown) {
          socketDatas.sort((a, b) => a.lowestRatio - b.lowestRatio);
        } else {
          socketDatas.sort((a, b) => b.lowestRatio - a.lowestRatio);
        }
        break;
      case '거래액(일)':
        if (tableSortUpDown) {
          socketDatas.sort((a, b) => a.tradeValue_24H - b.tradeValue_24H);
        } else {
          socketDatas.sort((a, b) => b.tradeValue_24H - a.tradeValue_24H);
        }
        break;
    }
  }, [socketDatas, tableSortValue, tableSortUpDown]);

  return (
    <styled.CoinListWrapper>
      {filteredSocketDatas.map((socketData) => (
        <CoinList key={socketData.symbol} socketData={socketData} />
      ))}
    </styled.CoinListWrapper>
  );
};

export default memo(TableBox);
