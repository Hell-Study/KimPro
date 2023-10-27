import { useQuery, UseQueryResult } from 'react-query';
import { Interval } from 'components/Widget/Widget.constants';
import getChartWidgetData from 'api/getChartWidgetData';
import { UTCTimestamp } from 'lightweight-charts';

interface ITicker {
  time: number;
  value: number;
}

const convertToUTCTimestamp = (millisTimestamp: number): UTCTimestamp => {
  return (millisTimestamp / 1000) as UTCTimestamp;
};

const useChartTickers = (
  pairId: string,
  interval: Interval,
): UseQueryResult<ITicker[], Error> => {
  return useQuery([pairId, interval], async () => {
    const rawData = await getChartWidgetData(pairId, interval);
    return rawData.map((item) => ({
      time: convertToUTCTimestamp(item.time),
      value: item.value,
    }));
  });
};

export default useChartTickers;
