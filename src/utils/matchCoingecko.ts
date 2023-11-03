import type { ICoingeckoCoinData } from 'recoil/atoms/coingeckoAtoms';

export function matchCoingecko(
  coingeckoCoinData: ICoingeckoCoinData[],
  symbol: string,
) {
  const target = coingeckoCoinData.filter((coin) => coin.symbol === symbol);
  if (target.length > 0) {
    const coinName = target[0].name;
    const thumb = target[0].large;
    return { coinName, thumb };
  } else {
    const coinName = symbol;
    const thumb = `${symbol} 썸네일`;
    return { coinName, thumb };
  }
}
