import styled from 'styled-components';

interface FontColorProps {
  $isPositive: string;
}

export const ChartContainer = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 15px;

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  div {
    border: 1px solid white;
  }
`;

export const CoinInfoContainer = styled.div`
  height: 50px;
  display: flex;
  padding: 5px 10px 0 10px;
`;

export const CoinImgWrapper = styled.div``;

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
  font-weight: bold;
  font-size: 1rem;
`;

export const CoinSymbol = styled.div`
  color: gray;
  font-size: 0.8rem;
`;

export const CoinPrice = styled.div<FontColorProps>`
  flex: 1;
  color: ${(props) => (props.$isPositive ? 'red' : 'blue')};
  span {
    font-size: 0.9rem;
  }
`;

export const CoinChangeWrapper = styled.div<FontColorProps>`
  display: flex;
  margin-left: auto;
  margin-right: 50px;
  color: gray;
  font-size: 0.8rem;
  color: ${(props) => (props.$isPositive ? 'red' : 'blue')};
`;

export const CoinChangeRate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  span {
    color: gray;
    margin-right: 3px;
  }
`;

export const CoinChangePrice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
export const ChartRefDiv = styled.div`
  border-radius: 15px;
`;
