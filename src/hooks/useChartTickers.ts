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

const useChartTickers = (pairId: string, interval: Interval) => {
  const result: UseQueryResult<ITicker[], Error> = useQuery(
    [pairId, interval],
    async () => {
      const rawData = await getChartWidgetData(pairId, interval);
      return rawData.map((item) => ({
        time: convertToUTCTimestamp(item.time),
        value: item.value,
      }));
    },
  );

  const prevCloseData = result.data?.reduce((closest, current) => {
    const currentDate = new Date();
    const targetDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 1,
      9,
      0,
      0,
    );
    const targetTimeStamp = targetDate.getTime();
    return Math.abs(current.time * 1000 - targetTimeStamp) <
      Math.abs(closest.time * 1000 - targetTimeStamp)
      ? current
      : closest;
  }, result.data[0]);

  return { ...result, prevCloseData };
};

export default useChartTickers;
