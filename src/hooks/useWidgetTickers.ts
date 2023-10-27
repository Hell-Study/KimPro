import { useQuery, UseQueryResult } from 'react-query';
import { Interval } from 'components/Widget/Widget.constants';
import getTickerWidgetData from 'api/getTickerWidgetData';
import { useRecoilState } from 'recoil';
import { prevPriceDataState } from 'recoil/atoms/prevPriceData';
import { IWidgetTicker } from 'components/Widget/Widget.types';

const setRefetchInterval = (interval: Interval): number | false => {
  switch (interval) {
    case 'PT1M':
      return 60 * 1000;
    case 'PT5M':
      return 5 * 60 * 1000;
    case 'P1D':
      return 24 * 60 * 60 * 1000;
    default:
      return false;
  }
};

export const useWidgetTickers = (
  pairId: string,
  interval: Interval,
  type: 'current' | 'previous' = 'current',
): UseQueryResult<IWidgetTicker, Error> => {
  const [prevPriceData, setPrevPriceData] = useRecoilState(prevPriceDataState);
  return useQuery(
    [pairId, interval, type],
    () => getTickerWidgetData(pairId, interval, type),
    {
      refetchInterval: setRefetchInterval(interval),
      onSuccess: (data) => {
        if (type === 'previous') {
          setPrevPriceData(data);
        }
      },
    },
  );
};
