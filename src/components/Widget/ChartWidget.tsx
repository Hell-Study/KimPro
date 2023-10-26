import React from 'react';
import { useWidgetTickers } from 'hooks/useWidgetTickers';
import { PAIR_DATA, Interval } from 'components/Widget/Widget.constants';

interface TickerWidgetProps {
  pairId: string;
  interval: Interval;
}

export const ChartWidget: React.FC<TickerWidgetProps> = ({
  pairId,
  interval,
}) => {
  const { data, error, isLoading } = useWidgetTickers(pairId, interval);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h2>
        Data for {pairId} with interval {interval}
      </h2>
      <ul>
        <li>
          Time: {new Date(data.timestamp).toLocaleString()} - Value:{' '}
          {data.value}
        </li>
      </ul>
    </div>
  );
};
