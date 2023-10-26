import { IUpbitTicker } from 'api/upbit/useUpbitTicker';
import { IBinanceTicker } from './useBinanceTicker';
export function updateUpbitListWithBinance(
  list: IUpbitTicker[],
  binanceTickers: IBinanceTicker[],
): IUpbitTicker[] {
  const removeUSDT = (symbol: string) => {
    return symbol.replace('USDT', '');
  };

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
