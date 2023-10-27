import React, { useState } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import * as styled from './Widget.styles';

interface CarouselProps {
  children: React.ReactNode[];
  slidesToShow?: number;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  slidesToShow = 5,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 슬라이드 인덱스
  const totalSlides = React.Children.count(children); // 전체 슬라이드의 개수
  const maxIndex = totalSlides - slidesToShow - 1; // 다음 슬라이드 이동시, 허용되는 최대 인덱스
  console.log(maxIndex);

  const handlePrevClick = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => Math.max(prev - 2, 0)); // 현재 슬라이드 인덱스 2씩 증가
  };

  const handleNextClick = () => {
    if (currentIndex < maxIndex)
      setCurrentIndex((prev) => Math.min(prev + 2, maxIndex));
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
        {children}
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
