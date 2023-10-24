import React, { useEffect } from 'react';
import * as styled from './Header.styles';
import getGlobalCoinData from 'api/getGlobalCoinData';
import { useRecoilState } from 'recoil';
import { globalCoinState } from 'recoil/atoms/globalCoin';
import { themeState } from 'recoil/atoms/theme';
import { HiSun, HiMoon } from 'react-icons/hi2';
import { SwitchButton } from './Header.styles';

function Header() {
  const [globalCoin, setGlobalCoin] = useRecoilState(globalCoinState);
  const [theme, setTheme] = useRecoilState(themeState);

  const isDarkMode = theme === 'dark';
  const handleToggle = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

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

  return (
    <styled.HeaderContainer>
      <styled.Topbar>
        <div>김프사이트</div>
        <div>환율 : xx</div>
        {globalCoin && (
          <>
            <div>
              암호화폐 :
              {globalCoin[0]?.coins_count
                ? globalCoin[0].coins_count.toString()
                : '로딩 중...'}
            </div>
            <div>
              거래소 :
              {globalCoin[0]?.active_markets
                ? globalCoin[0].active_markets.toString()
                : '로딩 중...'}
            </div>
            <div>
              시가총액 :
              {globalCoin[0]?.total_mcap
                ? `$${globalCoin[0].total_mcap.toString()}`
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
              24시간 거래량 :
              {globalCoin[0]?.total_volume
                ? `$${globalCoin[0].total_volume.toString()}`
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
              BTC 점유율 :
              {globalCoin[0]?.btc_d ? `${globalCoin[0].btc_d}%` : '로딩 중...'}
            </div>
          </>
        )}
      </styled.Topbar>
      <styled.HeaderWrapper>
        <h1>로고</h1>
        <SwitchButton $isDarkMode={isDarkMode} onClick={handleToggle}>
          {isDarkMode ? <HiMoon /> : <HiSun />}
        </SwitchButton>
      </styled.HeaderWrapper>
    </styled.HeaderContainer>
  );
}

export default Header;
