import { useQuery, UseQueryResult } from 'react-query';
import { Interval } from 'components/Widget/Widget.constants';
import getChartWidgetData from 'api/getChartWidgetData';
import { UTCTimestamp } from 'lightweight-charts';
import { IWidgetTicker } from 'components/Widget/Widget.types';

// const convertToUTCTimestamp = (millisTimestamp: number): UTCTimestamp => {
//   return (millisTimestamp / 1000) as UTCTimestamp;
// };

const useChartTickers = (pairId: string, interval: Interval) => {
  return useQuery([pairId, interval], async () => {
    const data = await getChartWidgetData(pairId, interval);
    return data;
  });
};

export default useChartTickers;
