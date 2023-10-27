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
          <styled.Row>
            <styled.Ticker>{key}</styled.Ticker>
            <TickerWidget pairId={id} />
          </styled.Row>
          <styled.Row>
            <ChartWidget pairId={id} />
          </styled.Row>
        </styled.Card>
      ))}
    </styled.Container>
  );
};
