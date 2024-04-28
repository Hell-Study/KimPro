import type { ICoingeckoCoinList } from '../@types/coingecko.types';

export function matchCoingecko(
  coingeckoCoinData: ICoingeckoCoinList[],
  symbol: string,
) {
  const target = coingeckoCoinData.filter(
    (coin) => coin.symbol === symbol.toLowerCase(),
  );
  if (target.length > 0) {
    const coinName = target[0].name;
    const thumb = target[0].image;
    return { coinName, thumb };
  } else {
    const coinName = symbol;
    const thumb = `https://cdn.vectorstock.com/i/500p/82/99/no-image-available-like-missing-picture-vector-43938299.jpg`;
    return { coinName, thumb };
  }
}
