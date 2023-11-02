import { IBithumbTicker } from 'components/bithumb/Bithumb.type';
import { IBinanceTicker } from './useBinanceTicker';
import { removeUSDT } from 'utils';

export function updateBithumbSocketDataWithBinance(
  socketData: IBithumbTicker[],
  binanceTickers: IBinanceTicker[],
): IBithumbTicker[] {
  return socketData.map((item) => {
    const binanceTicker = binanceTickers?.find(
      (ticker) => removeUSDT(ticker.s) === item.symbol,
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
