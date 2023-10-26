import React, { useRef, useState, useEffect } from 'react';
import { useWidgetTickers } from 'hooks/useWidgetTickers';
import { PAIR_DATA, Interval } from 'components/Widget/Widget.constants';
import getFormattedValues from 'utils/getFormattedValues';
import { IWidgetTicker } from './Widget.types';
import * as styled from './Widget.styles';

interface TickerWidgetProps {
  pairId: string;
}

export const TickerWidget: React.FC<TickerWidgetProps> = ({ pairId }) => {
  const validInterval =
    Object.values(PAIR_DATA).find((p) => p.id === pairId)?.intervals || [];
  const currentInterval: Interval = validInterval.includes('PT1M')
    ? 'PT1M'
    : 'PT5M';
  const { data: currentData } = useWidgetTickers(pairId, currentInterval);
  const {
    data: prevPriceData,
    error,
    isLoading,
  } = useWidgetTickers(pairId, 'P1D');

  const prevData = useRef<IWidgetTicker | null>(currentData!);

  useEffect(() => {
    if (currentData) {
      prevData.current = currentData;
    }
  }, [currentData]);

  const getChangeRate = (
    currentData?: IWidgetTicker | null,
    prevData?: IWidgetTicker | null,
  ): 'increase' | 'decrease' | '' => {
    if (!currentData || !prevData) return '';
    if (currentData.value > prevData.value) return 'increase';
    if (currentData.value < prevData.value) return 'decrease';
    console.log('currentData.value:', currentData.value);
    console.log('prevData.value:', prevData.value);
    return '';
  };

  const changeRateCurrent = getChangeRate(currentData, prevData.current);
  const changeRatePrev = getChangeRate(currentData, prevPriceData);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!currentData || !prevPriceData) return null;

  const { diff, percent } = getFormattedValues(
    currentData.value,
    prevPriceData.value,
  );

  return (
    <div>
      <styled.Nowprice
        isIncrease={changeRateCurrent === 'increase'}
        isDecrease={changeRateCurrent === 'decrease'}
      >
        {currentData.value.toFixed(2)}
      </styled.Nowprice>
      <styled.Difference
        isIncrease={changeRatePrev === 'increase'}
        isDecrease={changeRatePrev === 'decrease'}
      >
        {changeRatePrev === 'increase' ? '▲' : '▼'} {percent}% {diff}
      </styled.Difference>
    </div>
  );
};
