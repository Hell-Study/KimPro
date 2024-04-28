import { ICoingeckoMarketData } from '../@types/coingecko.types';
import { getCoingeckoMarketData } from 'api/coingecko/getCoingeckoMarketData';

export const getAllcoingeckoMarketData = async () => {
  const allCoingeckoMarketData: ICoingeckoMarketData[] = [];

  for (let page = 1; page <= 3; page++) {
    const fetchData = await getCoingeckoMarketData(page);
    if (fetchData) {
      allCoingeckoMarketData.push(...fetchData);
    }
  }

  return allCoingeckoMarketData;
};
