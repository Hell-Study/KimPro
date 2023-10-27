import axios from 'axios';
import { Interval } from 'components/Widget/Widget.constants';

interface ITicker {
  time: number;
  value: number;
}

export default async function getTickerWidgetData(
  pairId: string,
  interval: Interval,
  type: 'current' | 'previous' = 'current',
): Promise<ITicker> {
  try {
    const response = await axios.get(
      `https://api.investing.com/api/financialdata/${pairId}/historical/chart/?interval=${interval}&pointscount=60`,
    );

    const dataIndex =
      type === 'current'
        ? response.data.data.length - 1
        : response.data.data.length - 2;
    const targetItem = response.data.data[dataIndex];
    return {
      time: targetItem[0],
      value: targetItem[4],
    };
  } catch (error) {
    console.error('An error occurred while fetching the data:', error);
    throw error;
  }
}
