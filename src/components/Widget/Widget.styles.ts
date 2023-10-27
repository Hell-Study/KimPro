import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: ${({ theme }) => theme.sizes.lg};
  overflow-x: auto;
  scroll-behavior: smooth;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem 0.3rem;
  font-family: 'Pretendard', sans-serif;
`;

interface ButtonProps {
  $visible: boolean;
}

const Button = styled.button<ButtonProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%) scale(${(props) => (props.$visible ? 1 : 0.7)});
  transition:
    opacity 0.5s cubic-bezier(0.5, -0.75, 0.7, 2),
    transform 0.6s cubic-bezier(0.5, -0.75, 0.7, 2);
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  cursor: pointer;
  border: none;
  border-radius: 50%;
  padding: 0px;
  min-width: 0px;
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.primary1};
  z-index: 9;
`;

export const PrevButton = styled(Button)`
  left: 8px;
`;

export const NextButton = styled(Button)`
  left: auto;
  right: 8px;
`;

export const Icon = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;
  line-height: 0.5;
`;

export const SliderContainer = styled.div`
  display: flex;
  transition: transform 0.4s cubic-bezier(0.51, 0.92, 0.24, 1.15);
  gap: 0.6rem;
`;

const Shade = styled.div<ButtonProps>`
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 140px;
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  z-index: 1;
`;

export const LeftShade = styled(Shade)`
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  left: 0px;
  background-image: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.bg_page} 10%,
    transparent
  );
`;

export const RightShade = styled(Shade)`
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  right: 0px;
  background-image: linear-gradient(
    270deg,
    ${({ theme }) => theme.colors.bg_page} 10%,
    transparent
  );
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.bg_element4};
  display: flex;
  padding: 1rem 1.1rem;
  gap: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border1};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.colors.alpha1} 0px 5px 20px 0px;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.alpha1};
  }
`;

export const TickerRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.7rem;
`;

export const ChartRow = styled(TickerRow)`
  flex: auto;
`;

export const Ticker = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.heading2};
`;

export const Price = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

type PriceChangeProps = {
  $isIncrease?: boolean;
  $isDecrease?: boolean;
  $highlight?: 'increase' | 'decrease' | null;
};

export const Nowprice = styled.span<PriceChangeProps>`
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-size: 1.1rem;
  font-weight: 600;
  background-color: ${(props) =>
    props.$highlight === 'increase'
      ? props.theme.colors.alpha_red
      : props.$highlight === 'decrease'
      ? props.theme.colors.alpha_blue
      : 'transparent'};
`;

export const DiffPrice = styled.span<PriceChangeProps>`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  color: ${(props) =>
    props.$isIncrease
      ? props.theme.colors.red
      : props.$isDecrease
      ? props.theme.colors.blue
      : props.theme.colors.heading1};
`;

export const Perc = styled.span`
  gap: 0.1rem;
  display: flex;
`;

export const Change = styled.span`
  font-size: 0.65rem;
`;
