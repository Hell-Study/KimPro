import { IUpbitTicker } from 'api/upbit/useUpbitTicker';
import { IBinanceTicker } from './useBinanceTicker';
export function updateListWithBinanceData(
  list: IUpbitTicker[],
  binanceTickers: IBinanceTicker[],
  removeUSDT: (symbol: string) => string,
): IUpbitTicker[] {
  return list.map((item) => {
    const binanceTicker = binanceTickers?.find(
      (ticker) => removeUSDT(ticker.s) === item.code?.split('-')[1],
    );
    if (binanceTicker) {
      return {
        ...item,
        binancePrice: binanceTicker.c,
      };
    }
    return item;
  });
}
