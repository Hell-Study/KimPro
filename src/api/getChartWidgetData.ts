import axios from 'axios';
import { Interval } from 'components/Widget/Widget.constants';

interface ITicker {
  time: number;
  value: number;
}

export default async function getChartWidgetData(
  pairId: string,
  interval: Interval,
): Promise<ITicker[]> {
  try {
    const response = await axios.get(
      `https://api.investing.com/api/financialdata/${pairId}/historical/chart/?interval=${interval}&pointscount=60`,
    );

    const data: ITicker[] = response.data.data
      .map((item: any) => ({
        time: item[0],
        value: item[4], // 종가
      }))
      .slice(-20);

    return data;
  } catch (error) {
    console.error('An error occurred while fetching the data:', error);
    throw error;
  }
}
