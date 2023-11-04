import React, { Suspense } from 'react';
import { useWidgetTickers } from 'hooks';
import { PAIR_DATA } from './Widget.constants';
import { ChartWidget } from './ChartWidget';
import { TickerWidget } from './TickerWidget';
import { Carousel } from './Carousel';
import * as styled from './Widget.styles';

export const Widget: React.FC = React.memo(() => {
  return (
    <Suspense fallback={<styled.SkeletonCard />}>
      <Carousel slidesToShow={4}>
        {Object.entries(PAIR_DATA).map(([ticker, { id }]) => {
          const { data: baseData } = useWidgetTickers(id, 'P1D', 'previous');
          if (!baseData) return null;
          return (
            <styled.Card key={ticker}>
              <styled.TickerRow>
                <styled.Ticker>{ticker}</styled.Ticker>
                <Suspense fallback={<styled.SkeletonTicker />}>
                  <TickerWidget pairId={id} baseData={baseData} />
                </Suspense>
              </styled.TickerRow>
              <styled.ChartRow>
                <Suspense fallback={<styled.SkeletonChart />}>
                  <ChartWidget pairId={id} baseData={baseData} />
                </Suspense>
              </styled.ChartRow>
            </styled.Card>
          );
        })}
      </Carousel>
    </Suspense>
  );
});
Widget.displayName = 'Widget';
