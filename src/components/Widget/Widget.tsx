import React from 'react';
import { TickerWidget } from './TickerWidget';
import { ChartWidget } from './ChartWidget';
import { PAIR_DATA } from './Widget.constants';
import * as styled from './Widget.styles';

export const Widget: React.FC = () => {
  return (
    <styled.Container>
      {Object.entries(PAIR_DATA).map(([key, { id }]) => (
        <styled.Card key={key}>
          <styled.TickerRow>
            <styled.Ticker>{key}</styled.Ticker>
            <TickerWidget pairId={id} />
          </styled.TickerRow>
          <styled.ChartRow>
            <ChartWidget pairId={id} />
          </styled.ChartRow>
        </styled.Card>
      ))}
    </styled.Container>
  );
};
