import styled from 'styled-components';

interface RateProps {
  $isPositive: boolean;
}

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 3;
`;

export const Inner = styled.div`
  width: ${({ theme }) => theme.sizes.lg};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
`;

export const InnerSpaceBetween = styled(Inner)`
  justify-content: space-between;
`;

export const Topbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.8vh;
  gap: 0.75rem;
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: -0.3px;
  color: ${({ theme }) => theme.colors.text1};
  background-color: ${({ theme }) => theme.colors.bg_element5};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border1};
  transition: all 0.15s ease-out 0s;
`;

export const Label = styled.span`
  font-weight: 500;
  margin-right: 6px;
  color: ${({ theme }) => theme.colors.text2};
`;

export const Rate = styled.span<RateProps>`
  font-weight: 500;
  font-size: 0.7rem;
  margin-left: 3px;
  color: ${(props) =>
    props.$isPositive ? props.theme.colors.red : props.theme.colors.blue};
`;

export const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7.5vh;
  background-color: ${({ theme }) => theme.colors.alpha3};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: ${({ theme }) => theme.colors.alpha2} 0px 5px 10px 0px;
  transition: all 0.15s ease-out 0s;
`;

export const Logo = styled.a`
  cursor: pointer;
`;

export const BtnGroup = styled.div`
  display: flex;
`;

export const GithubButton = styled.button`
  width: 40px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.icon};
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SwitchButton = styled.button<{ $isDarkMode: boolean }>`
  width: 40px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.icon};
  font-size: ${({ $isDarkMode }) => ($isDarkMode ? '1.1rem' : '1.3rem')};
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: none;
  }
`;
