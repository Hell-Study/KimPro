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
          <>
            <TickerWidget pairId={id} />
          </>
          <ChartWidget pairId={id} interval={'PT30M'} />
        </styled.Card>
      ))}
    </styled.Container>
  );
};
