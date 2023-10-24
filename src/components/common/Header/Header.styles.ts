import styled from 'styled-components';

interface RateProps {
  $isPositive: boolean;
}

export const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 100px;
  height: 5vh;
  background-color: #bebebe;
`;

export const Rate = styled.span<RateProps>`
  color: ${(props) => (props.$isPositive ? 'red' : 'green')};
`;
