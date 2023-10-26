import * as styled from './Table.styles';
import { useEffect } from 'react';
import useBithumbWsTicker from 'hooks/bithumb/useBithumbWsTicker';
import BithumbTable from './BithumbTable';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { bithumbTickerState } from 'recoil/atoms/bithumb';
import { coingeckoCoinDataState } from 'recoil/atoms/coingecko';
import { getCoingeckoData } from 'api/coingecko/getCoingeckoData';
import useFetchBithumbTicker from 'hooks/bithumb/useFetchBithumbticker';
import useBinanceTicker from 'hooks/binance/useBinanceTicker';

export function Bithumb() {
  useFetchBithumbTicker();
  useBithumbWsTicker();

  const socketDatas = useRecoilValue(bithumbTickerState);

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
