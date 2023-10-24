import React, { useState, useEffect } from 'react';
import useBinanceTicker from '../../hooks/binance/useBinanceTicker';
import useFetchExchangeRate from '../../hooks/binance/useFetchExchangeRate';

export const Test = () => {
  const { exchangeRate } = useFetchExchangeRate();
  const { tickers } = useBinanceTicker();

  return (
    <>
      <p>바이낸스 기준 현재가(1-30):</p>
      <p>현재 환율(USD/KRW): {exchangeRate || null}</p>
      <ul>
        {tickers && exchangeRate
          ? tickers.map((ticker) => {
              return (
                <li key={ticker.s}>
                  {ticker.s}: ₩
                  {(parseFloat(ticker.c) * exchangeRate).toFixed(2)}
                </li>
              );
            })
          : 'Loading…'}
      </ul>
    </>
  );
};
