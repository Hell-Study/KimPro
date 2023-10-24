import styled from 'styled-components';

interface RateProps {
  $isPositive: boolean;
}

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 2;
`;

export const Topbar = styled.div`
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

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 100px;
  height: 8vh;
  background-color: ${({ theme }) => theme.colors.bg_element4};
`;

export const SwitchButton = styled.button<{ $isDarkMode: boolean }>`
  font-size: 1.25rem;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.icon};
  font-size: ${({ $isDarkMode }) => ($isDarkMode ? '1.2rem' : '1.4rem')};
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: none;
  }
`;
