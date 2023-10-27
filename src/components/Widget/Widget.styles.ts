import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
  font-family: 'Pretendard', sans-serif;
  padding: 1rem 0;
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.bg_element4};
  display: flex;
  padding: 0.8rem 0.9rem;
  gap: 1.2rem;
  border: 1px solid ${({ theme }) => theme.colors.border1};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.colors.alpha1} 0px 5px 20px 0px;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

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
  $isIncrease: boolean;
  $isDecrease: boolean;
};

export const Nowprice = styled.span<PriceChangeProps>`
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-size: 1.1rem;
  font-weight: 600;
  background-color: ${(props) =>
    props.$isIncrease
      ? props.theme.colors.alpha_red
      : props.$isDecrease
      ? props.theme.colors.alpha_green
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
      ? props.theme.colors.green
      : props.theme.colors.heading1};
`;

export const Perc = styled.span`
  gap: 0.1rem;
  display: flex;
`;

export const Diff = styled.span`
  font-size: 0.65rem;
`;
