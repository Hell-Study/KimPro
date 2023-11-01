import { IBithumbTicker } from 'components/bithumb/Bithumb.type';
import { IBinanceTicker } from './useBinanceTicker';
export function updateBithumbSocketDataWithBinance(
  socketData: IBithumbTicker[],
  binanceTickers: IBinanceTicker[],
): IBithumbTicker[] {
  const removeUSDT = (symbol: string) => {
    return symbol.replace('USDT', '');
  };

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
