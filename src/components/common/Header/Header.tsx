import React, { useState, useEffect } from 'react';
import * as styled from './Header.styles';
import getGlobalCoinData from 'api/getGlobalCoinData';
import { useRecoilState } from 'recoil';
import { globalCoinState } from 'recoil/atoms/globalCoin';

function Header() {
  const [globalCoin, setGlobalCoin] = useRecoilState(globalCoinState);

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

  const renderLoading = (label: string, value: number) => {
    let displayedValue: string = value ? value.toString() : '로딩 중...';

    if (label === '시가총액' || label === '24시간 거래량') {
      displayedValue = `$${displayedValue}`;
    } else if (label === 'BTC 점유율') {
      displayedValue = `${displayedValue}%`;
    }

    return (
      <div>
        {label} : {displayedValue}
      </div>
    );
  };

  return (
    <styled.HeaderContainer>
      <div>김프사이트</div>
      <div>환율 : xx</div>
      {globalCoin && (
        <>
          {renderLoading('암호화폐', globalCoin[0]?.coins_count)}
          {renderLoading('거래소', globalCoin[0]?.active_markets)}
          {renderLoading('시가총액', globalCoin[0]?.total_mcap)}
          {renderLoading('24시간 거래량', globalCoin[0]?.total_volume)}
          {renderLoading('BTC 점유율', globalCoin[0]?.btc_d)}
        </>
      )}
    </styled.HeaderContainer>
  );
}

export default Header;
