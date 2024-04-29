import type { CandlestickData } from 'lightweight-charts';
import type { IBithumbFetchCandlestick } from '../@types/bithumb.types';
import { convertDate } from 'utils';

export const preprocessBithumbCandlestick = (
  fetchedBithumbCandlestick: IBithumbFetchCandlestick[],
) => {
  const processedData: CandlestickData[] = fetchedBithumbCandlestick.map(
    (data: IBithumbFetchCandlestick) => {
      return {
        time: convertDate(data[0]),
        open: Number(data[1]),
        close: Number(data[2]),
        high: Number(data[3]),
        low: Number(data[4]),
      };
    },
  );

  return processedData;
};
