import {
  IBithumbFetchTicker,
  IBithumbTickerData,
} from 'components/bithumb/Bithumb.type';
import { IBinanceTicker } from './useBinanceTicker';
export function updateBithumbSocketDataWithBinance(
  socketData: IBithumbFetchTicker[],
  binanceTickers: IBinanceTicker[],
): IBithumbFetchTicker[] {
  const removeUSDT = (symbol: string) => {
    return symbol.replace('USDT', '');
  };

  return socketData.map((item) => {
    const binanceTicker = binanceTickers?.find(
      (ticker) => removeUSDT(ticker.s) === item[0],
    );
    if (binanceTicker) {
      const updatedItem: IBithumbTickerData = {
        ...item[1],
        binancePrice: binanceTicker.c,
      };
      const updatedState: IBithumbFetchTicker = [...item];
      updatedState[1] = updatedItem;
      return updatedState;
    }
    return item;
  });
}
