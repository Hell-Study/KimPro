import React from 'react';
import TradingViewWidget from './TradingViewWidget';
import { CustomSelect } from '../CustomSelect';
import { SELECT_OPTION } from './ChartLeft.constant';
import * as styled from './ChartLeft.styles';

export const ChartLeft = () => {
  return (
    <styled.ChartContainer>
      <styled.SelectWrapper>
        <styled.ChartInfo>차트정보</styled.ChartInfo>
        <CustomSelect optionData={SELECT_OPTION} />
      </styled.SelectWrapper>
      <TradingViewWidget />
    </styled.ChartContainer>
  );
};
