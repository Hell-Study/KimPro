import React, { useEffect } from 'react';
import * as styled from './Header.styles';
import getGlobalCoinData from 'api/getGlobalCoinData';
import { useRecoilState } from 'recoil';
import { globalCoinState } from 'recoil/atoms/globalCoinAtoms';
import useFetchExchangeRate from 'hooks/binance/useFetchExchangeRate';
import useTheme from 'hooks/useTheme';
import { HiSun, HiMoon } from 'react-icons/hi2';
import { DiGithubAlt } from 'react-icons/di';
import LogoDark from 'assets/images/Logo-Dark.svg';
import LogoLight from 'assets/images/Logo-Light.svg';

function Header() {
  const { theme, onChangeTheme } = useTheme();
  const [globalCoin, setGlobalCoin] = useRecoilState(globalCoinState);
  const { exchangeRate } = useFetchExchangeRate();

  const isDarkMode = theme === 'dark';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGlobalCoinData();
        setGlobalCoin(data);
      } catch (error) {
        console.error('Error fetching global coin data:', error);
      }
    };

    fetchData();
  }, []);

  const multiplyByExchangeRate = (value: number) => {
    return exchangeRate ? value * exchangeRate : 0;
  };
  const formatCurrency = (value: number) => {
    if (value === null || value === undefined) {
      return '로딩 중...';
    }

    const trillion = Math.floor(value / 1e12);
    const billion = Math.floor((value % 1e12) / 1e8);

    if (trillion > 0) {
      return `${trillion}조 ${billion}억`;
    } else {
      return `${billion}억`;
    }
  };
  return (
    <styled.HeaderContainer>
      <styled.Topbar>
        <styled.Inner>
          <div>환율(USD/KRW): {exchangeRate || null}</div>
          {globalCoin && (
            <>
              <div>
                <styled.Label>암호화폐</styled.Label>
                {globalCoin[0]?.coins_count
                  ? globalCoin[0].coins_count.toString()
                  : '로딩 중...'}
              </div>
              <div>
                <styled.Label>거래소</styled.Label>
                {globalCoin[0]?.active_markets
                  ? globalCoin[0].active_markets.toString()
                  : '로딩 중...'}
              </div>
              <div>
                <styled.Label>시가총액</styled.Label>
                {globalCoin[0]?.total_mcap
                  ? formatCurrency(
                      multiplyByExchangeRate(globalCoin[0].total_mcap),
                    )
                  : '로딩 중...'}
                <styled.Rate $isPositive={globalCoin[0]?.mcap_change >= 0}>
                  {globalCoin[0]?.mcap_change !== undefined
                    ? (globalCoin[0].mcap_change >= 0 ? '+' : '-') +
                      Math.abs(globalCoin[0].mcap_change).toString() +
                      '%'
                    : '로딩 중...'}
                </styled.Rate>
              </div>
              <div>
                <styled.Label>24시간 거래량</styled.Label>
                {globalCoin[0]?.total_volume
                  ? formatCurrency(
                      multiplyByExchangeRate(globalCoin[0].total_volume),
                    )
                  : '로딩 중...'}
                <styled.Rate $isPositive={globalCoin[0]?.volume_change >= 0}>
                  {globalCoin[0]?.volume_change !== undefined
                    ? (globalCoin[0].volume_change >= 0 ? '+' : '-') +
                      Math.abs(globalCoin[0].volume_change).toString() +
                      '%'
                    : '로딩 중...'}
                </styled.Rate>
              </div>
              <div>
                <styled.Label>BTC 점유율</styled.Label>
                {globalCoin[0]?.btc_d
                  ? `${globalCoin[0].btc_d}%`
                  : '로딩 중...'}
              </div>
            </>
          )}
        </styled.Inner>
      </styled.Topbar>
      <styled.HeaderWrapper>
        <styled.InnerSpaceBetween>
          <styled.Logo href="/Final-Project">
            <img
              src={isDarkMode ? LogoDark : LogoLight}
              alt="logo"
              loading="lazy"
            />
          </styled.Logo>
          <styled.BtnGroup>
            <a
              href="https://github.com/Hell-Study/Final-Project"
              target="_blank"
              rel="noopener noreferrer"
            >
              <styled.GithubButton>
                <DiGithubAlt />
              </styled.GithubButton>
            </a>
            <styled.SwitchButton
              $isDarkMode={isDarkMode}
              onClick={onChangeTheme}
            >
              {isDarkMode ? <HiMoon /> : <HiSun />}
            </styled.SwitchButton>
          </styled.BtnGroup>
        </styled.InnerSpaceBetween>
      </styled.HeaderWrapper>
    </styled.HeaderContainer>
  );
}

export default Header;
