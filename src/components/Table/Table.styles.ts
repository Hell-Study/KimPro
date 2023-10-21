import styled from 'styled-components';

interface CoinBoxProps {
  $selected: boolean;
}

interface CoinBoxPriceProps {
  $changeType: string;
}

interface CoinBoxChangeProps {
  $changeType: string;
}

export const CoinListBox = styled.div`
  width: 1240px;
  height: 800px;
  margin: 5px;
  background-color: white;
  overflow: overlay;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
export const CoinBoxNav = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const CoinBoxHeader = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 1px;
  background-color: white;
  opacity: 0.8;
  height: 35px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  border-bottom: 0.5px solid lightgrey;
  font-size: 1rem;
  font-weight: 600;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const CoinBox = styled.div<CoinBoxProps>`
  height: 45px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  border-bottom: 0.5px solid lightgrey;
  font-size: 0.9rem;
  padding-left: 5px;
  padding-right: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.$selected ? 'lightgrey' : 'inherit')};
  &:hover {
    background-color: lightgrey;
  }
  div {
    display: flex;
  }
  div:nth-child(1) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  div:nth-child(2) {
    justify-content: flex-end;
    align-items: center;
  }
  div:nth-child(3) {
    align-items: center;
    justify-content: flex-end;
  }
  div:nth-child(4) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }
  div:nth-child(5) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }
  div:nth-child(6) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }
  div:nth-child(7) {
    justify-content: flex-end;
    align-items: center;
  }
`;

export const CoinBoxName = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
`;

export const CoinBoxNameMarket = styled.div`
  color: gray;
  font-size: 0.8rem;
`;

export const CoinBoxPrice = styled.div<CoinBoxPriceProps>`
  font-weight: 600;
  color: ${(props) => {
    switch (props.$changeType) {
      case 'RISE':
        return '#EF1C1C';
      case 'EVEN':
        return '#000000';
      case 'FALL':
        return '#1261C4';
      default:
        return '#000000';
    }
  }};
`;
export const CoinBoxKimchiPremium = styled.div``;

export const CoinBoxChange = styled.div<CoinBoxChangeProps>`
  font-weight: bold;

  div:nth-child(2) {
    font-weight: normal;
    font-size: 0.8rem;
    color: #4c769d;
  }
  color: ${(props) => {
    switch (props.$changeType) {
      case 'RISE':
        return '#EF1C1C';
      case 'EVEN':
        return '#000000';
      case 'FALL':
        return '#1261C4';
      default:
        return '#000000';
    }
  }};
`;
export const CoinBoxChangeRate = styled.div``;
export const CoinBoxChangePrice = styled.div``;

export const CoinBoxHighestWeek = styled.div`
  font-weight: bold;

  div:nth-child(2) {
    font-weight: normal;
    font-size: 0.8rem;
  }
`;
export const CoinBoxHighestWeekRate = styled.div`
  color: #1261c4;
`;
export const CoinBoxHighestWeekPrice = styled.div``;

export const CoinBoxLowestWeek = styled.div`
  font-weight: bold;

  div:nth-child(2) {
    font-weight: normal;
    font-size: 0.8rem;
  }
`;
export const CoinBoxLowestWeekRate = styled.div`
  color: #ef1c1c;
`;
export const CoinBoxLowestWeekPrice = styled.div``;

export const CoinBoxVolume = styled.div`
  font-size: 0.9rem;
  div:nth-child(2) {
    color: grey;
  }
`;
