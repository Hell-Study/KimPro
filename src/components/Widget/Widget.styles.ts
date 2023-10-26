import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.bg_element4};
`;

type PriceChangeProps = {
  isIncrease: boolean;
  isDecrease: boolean;
};

export const Nowprice = styled.span<PriceChangeProps>`
  transition: background-color 0.3s;
  background-color: ${(props) =>
    props.isIncrease
      ? props.theme.colors.alpha_green
      : props.isDecrease
      ? props.theme.colors.alpha_red
      : 'transparent'};
`;

export const Difference = styled.span<PriceChangeProps>`
  color: ${(props) =>
    props.isIncrease
      ? props.theme.colors.green
      : props.isDecrease
      ? props.theme.colors.red
      : props.theme.colors.heading1};
`;
