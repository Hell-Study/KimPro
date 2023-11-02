import styled, { DefaultTheme } from 'styled-components';
import { CiSearch } from 'react-icons/ci';

export const TableContainer = styled.div`
  width: 100%;
`;

export const TableNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 1.625rem 0;
`;

export const TableBox = styled.div`
  padding: 0 0.9375rem 1.375rem 0.9375rem;
  background-color: ${({ theme }) => theme.colors.bg_element4};
  border-radius: 15px;
  box-shadow: 0px 0px 25px 0px rgba(48, 73, 191, 0.07);
`;

export const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9375rem;

  color: ${({ theme }) => theme.colors.text1};
  font-family: Uni Neue-Trial;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CoinCount = styled.div`
  color: ${({ theme }) => theme.colors.text1};
  font-family: Uni Neue-Trial;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  margin-right: 1.25rem;
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  padding: 0.5625rem 1rem;

  width: 232px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border1};
  background: ${({ theme }) => theme.colors.bg_element4};
  box-shadow: 0px 0px 40px 0px ${({ theme }) => theme.colors.border1};

  &:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.blue};
  }
`;

export const SearchIcon = styled(CiSearch)`
  width: 18px;
  height: 18px;
  margin-right: 0.625rem;
`;

export const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;

  color: ${({ theme }) => theme.colors.text3};
  font-family: Pretendard;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const CoinListWrapper = styled.div`
  overflow: overlay;
  height: 24.75rem;
`;

export const CoinBox = styled.div<{ $selected: boolean }>`
  height: 4rem;
  display: grid;
  grid-template-columns: 0.5fr 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr;
  padding: 0.625rem 0.9375rem;
  border-radius: 15px;

  cursor: pointer;

  background-color: ${({ $selected }) => {
    return $selected
      ? ({ theme }: DefaultTheme) => theme.colors.alpha2
      : 'inherit';
  }};

  &:hover {
    background-color: ${({ theme }) => theme.colors.alpha2};
  }
`;

export const CoinIconWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CoinIcon = styled.img`
  width: 1.6875rem;
  height: 1.6875rem;
`;

export const CoinLeftWrap = styled(CoinIconWrap)`
  flex-direction: column;
  align-items: flex-start;
`;

export const CoinName = styled.div`
  color: ${({ theme }) => theme.colors.heading1};
  font-family: Pretendard;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const CoinSubText = styled.div`
  color: ${({ theme }) => theme.colors.text3};
  font-family: Pretendard;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const CoinRightWrap = styled(CoinLeftWrap)`
  align-items: flex-end;
`;

export const CoinKoreanPrice = styled(CoinName)``;

export const CoinKimpRatio = styled(CoinName)<{ $isPositive: string }>`
  color: ${({ $isPositive }) => {
    switch ($isPositive) {
      case 'true':
        return ({ theme }: DefaultTheme) => theme.colors.red;
      case 'false':
        return ({ theme }: DefaultTheme) => theme.colors.blue;
      case 'none':
        return ({ theme }: DefaultTheme) => theme.colors.heading1;
    }
  }};
`;

export const CoinChangeRatio = styled(CoinName)<{ $changeType: string }>`
  color: ${({ $changeType }) => {
    switch ($changeType) {
      case 'RISE':
        return ({ theme }: DefaultTheme) => theme.colors.red;
      case 'EVEN':
        return ({ theme }: DefaultTheme) => theme.colors.heading1;
      case 'FALL':
        return ({ theme }: DefaultTheme) => theme.colors.blue;
    }
  }};
`;

export const CoinHighestRatio = styled(CoinName)`
  color: ${({ theme }: DefaultTheme) => theme.colors.blue};
`;

export const CoinLowestRatio = styled(CoinName)`
  color: ${({ theme }: DefaultTheme) => theme.colors.red};
`;
