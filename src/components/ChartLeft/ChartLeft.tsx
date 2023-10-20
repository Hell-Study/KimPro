import React from 'react';
import TradingViewWidget from './TradingViewWidget';
import { CustomSelect } from '../CustomSelect';
import { SELECT_OPTION } from './ChartLeft.constant';
import * as styled from './ChartLeft.styles';

export const ChartLeft = () => {
  return (
    <styled.ChartContainer>
      <CustomSelect optionData={SELECT_OPTION} />
      <TradingViewWidget />
    </styled.ChartContainer>
  );
};
