import styled from 'styled-components';

interface FontColorProps {
  $isPositive: string;
}

export const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.bg_element4};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.colors.alpha1} 0px 2px 10px 0px;
  padding: 1rem 1.1rem;
  gap: 0.5rem;
`;

export const CoinInfoContainer = styled.div`
  display: flex;
  padding: 0 0.5rem;
  gap: 0.4rem;
`;

export const CoinImgWrapper = styled.div``;

export const CoinImg = styled.img`
  width: 45px;
  height: 45px;
`;

export const CoinInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  padding: 3px 0;
`;

export const CoinIdentity = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

export const CoinName = styled.div`
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.5px;
  color: ${({ theme }) => theme.colors.heading1};
`;

export const CoinSymbol = styled.div`
  font-size: 0.8rem;
  font-weight: 300;
  margin-left: 5px;
  color: ${({ theme }) => theme.colors.heading2};
`;

export const CoinPrice = styled.div<FontColorProps>`
  flex: 1;
  color: ${(props) =>
    props.$isPositive ? props.theme.colors.red : props.theme.colors.blue};
  span {
    font-size: 0.9rem;
  }
`;

export const CoinChangeWrapper = styled.div<FontColorProps>`
  display: flex;
  margin-left: auto;
  font-size: 0.8rem;
  margin-bottom: 8px;
  color: ${(props) =>
    props.$isPositive ? props.theme.colors.red : props.theme.colors.blue};
`;

export const CoinChangeRate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-right: 8px;
  color: inherit;

  span {
    color: ${({ theme }) => theme.colors.text2};
    margin-right: 3px;
  }
`;

export const CoinChangePrice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: inherit;
`;

export const ChartRefDiv = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border1};
  border-radius: 3px;
  flex: 1;
`;
