import React from 'react';
import { useWidgetTickers } from 'hooks/useWidgetTickers';
import { PAIR_DATA } from './Widget.constants';
import { ChartWidget } from './ChartWidget';
import { TickerWidget } from './TickerWidget';
import { Carousel } from './Carousel';
import * as styled from './Widget.styles';

export const Widget: React.FC = () => {
  return (
    <Carousel slidesToShow={4}>
      {Object.entries(PAIR_DATA).map(([key, { id }]) => {
        const { data: baseData } = useWidgetTickers(id, 'P1D', 'previous');
        if (!baseData) return null;
        return (
          <styled.Card key={key}>
            <styled.TickerRow>
              <styled.Ticker>{key}</styled.Ticker>
              <TickerWidget pairId={id} baseData={baseData} />
            </styled.TickerRow>
            <styled.ChartRow>
              <ChartWidget pairId={id} baseData={baseData} />
            </styled.ChartRow>
          </styled.Card>
        );
      })}
    </Carousel>
  );
};
