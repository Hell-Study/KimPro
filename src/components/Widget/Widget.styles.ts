import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
  font-family: 'Pretendard', sans-serif;
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.bg_element4};
  display: flex;
  padding: 1rem;
`;

export const Row = styled.div``;

export const Ticker = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.heading2};
`;

export const Price = styled.div`
  display: flex;
  flex-direction: column;
`;

type PriceChangeProps = {
  $isIncrease: boolean;
  $isDecrease: boolean;
};

export const Nowprice = styled.span<PriceChangeProps>`
  transition: background-color 0.3s;
  background-color: ${(props) =>
    props.$isIncrease
      ? props.theme.colors.alpha_green
      : props.$isDecrease
      ? props.theme.colors.alpha_red
      : 'transparent'};
`;

export const Difference = styled.span<PriceChangeProps>`
  font-weight: 600;
  transition: background-color 0.3s;
  color: ${(props) =>
    props.$isIncrease
      ? props.theme.colors.green
      : props.$isDecrease
      ? props.theme.colors.red
      : props.theme.colors.heading1};
`;
