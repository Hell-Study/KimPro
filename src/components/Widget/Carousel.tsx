import React, { useState } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import * as styled from './Widget.styles';

interface CarouselProps {
  children: React.ReactNode[];
  slidesToShow: number;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  slidesToShow,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 슬라이드 인덱스
  const totalSlides = React.Children.count(children); // 전체 슬라이드의 개수
  const maxIndex = totalSlides - slidesToShow - 1;

  const handlePrevClick = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextClick = () => {
    if (currentIndex < maxIndex)
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex)); // 현재 슬라이드 인덱스 2씩 증가
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
          transform: `translateX(-${(100 / slidesToShow) * currentIndex}%)`,
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
