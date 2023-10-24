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

  return (
    <styled.HeaderContainer>
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
    </styled.HeaderContainer>
  );
}

export default Header;
