import React from 'react';
import { useWidgetTickers } from 'hooks/useWidgetTickers';
import { PAIR_DATA } from './Widget.constants';
import * as styled from './Widget.styles';
import { ChartWidget } from './ChartWidget';
import { TickerWidget } from './TickerWidget';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

export const Widget: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const totalSlides = Object.entries(PAIR_DATA).length;
  const slidesToShow = 5;
  const maxIndex = totalSlides - slidesToShow;

  const handlePrevClick = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleNextClick = () => {
    if (currentIndex < maxIndex) setCurrentIndex((prev) => prev + 1);
  };

  return (
    <styled.Container>
      <styled.PrevButton onClick={handlePrevClick} $visible={currentIndex > 0}>
        <styled.Icon>
          <FiChevronLeft />
        </styled.Icon>
      </styled.PrevButton>
      <styled.LeftShade $visible={currentIndex > 0} />
      <styled.SliderContainer
        style={{
          transform: `translateX(-${currentIndex * (100 / totalSlides)}%)`,
        }}
      >
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
      </styled.SliderContainer>
      <styled.RightShade $visible={currentIndex < maxIndex} />
      <styled.NextButton
        onClick={handleNextClick}
        $visible={currentIndex < maxIndex}
      >
        <styled.Icon>
          <FiChevronRight />
        </styled.Icon>
      </styled.NextButton>
    </styled.Container>
  );
};
