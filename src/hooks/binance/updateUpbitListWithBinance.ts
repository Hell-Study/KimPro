import { IUpbitTicker } from 'hooks/upbit/useUpbitTicker';
import { IBinanceTicker } from './useBinanceTicker';
import { removeUSDT } from 'utils';
export function updateUpbitListWithBinance(
  list: IUpbitTicker[],
  binanceTickers: IBinanceTicker[],
): IUpbitTicker[] {
  const updatedList = list.map((item) => {
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

  return updatedList;
}
