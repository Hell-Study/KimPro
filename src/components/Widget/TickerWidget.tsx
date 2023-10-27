import React, { useState, useRef, useEffect } from 'react';
import { useWidgetTickers } from 'hooks/useWidgetTickers';
import { PAIR_DATA, Interval } from 'components/Widget/Widget.constants';
import getFormattedValues from 'utils/getFormattedValues';
import formatNumber from 'utils/formatNumber';
import { IWidgetTicker } from './Widget.types';
import * as styled from './Widget.styles';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';

interface IWidgetTickerProps {
  pairId: string;
  baseData?: IWidgetTicker;
}

export const TickerWidget: React.FC<IWidgetTickerProps> = ({
  pairId,
  baseData,
}) => {
  const validInterval =
    Object.values(PAIR_DATA).find((p) => p.id === pairId)?.intervals || [];
  const currentInterval: Interval = validInterval.includes('PT1M')
    ? 'PT1M'
    : 'PT5M';
  const {
    data: currentData,
    isLoading,
    error,
  } = useWidgetTickers(pairId, currentInterval, 'current');

  const prevData = useRef<IWidgetTicker | null>(currentData!);

  const [highlight, setHighlight] = useState<'increase' | 'decrease' | null>(
    null,
  );

  useEffect(() => {
    if (currentData) {
      prevData.current = currentData;
    }
  }, [currentData]);

  useEffect(() => {
    if (changeRateCurrent === 'increase' || changeRateCurrent === 'decrease') {
      setHighlight(changeRateCurrent);
      const timer = setTimeout(() => {
        setHighlight(null);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [currentData]);

  const getChangeRate = (
    currentData?: IWidgetTicker | null,
    prevData?: IWidgetTicker | null,
  ): 'increase' | 'decrease' | '' => {
    if (!currentData || !prevData) return '';
    if (currentData.value > prevData.value) return 'increase';
    if (currentData.value < prevData.value) return 'decrease';
    // console.log('currentData.value:', currentData.value);
    // console.log('prevData.value:', prevData.value);
    return '';
  };

  const changeRateCurrent = getChangeRate(currentData, prevData.current);
  const changeRatePrev = getChangeRate(currentData, baseData);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!currentData || !baseData) return null;

  const { diff, percent } = getFormattedValues(
    currentData.value,
    baseData.value,
  );

  return (
    <styled.Price>
      <styled.Nowprice $highlight={highlight}>
        {formatNumber(parseFloat(currentData.value.toFixed(2)))}
      </styled.Nowprice>
      <styled.DiffPrice
        $isIncrease={changeRatePrev === 'increase'}
        $isDecrease={changeRatePrev === 'decrease'}
      >
        <styled.Perc>
          {changeRatePrev === 'increase' ? <FaCaretUp /> : <FaCaretDown />}{' '}
          {percent}%{' '}
        </styled.Perc>
        <styled.Change>{diff}</styled.Change>
      </styled.DiffPrice>
    </styled.Price>
  );
};
