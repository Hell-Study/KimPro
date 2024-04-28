import type { ICoingeckoMarketData } from '../@types/coingecko.types';

export const matchCoingeckoMarketData = (
  coingeckoMarketData: ICoingeckoMarketData[],
  symbol: string,
) => {
  const target = coingeckoMarketData.filter(
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
};
