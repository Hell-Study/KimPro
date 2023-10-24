import React, { useState, useEffect } from 'react';
import useBinanceTicker from '../../hooks/binance/useBinanceTicker';
import useFetchExchangeRate from '../../hooks/binance/useFetchExchangeRate';

export const Test = () => {
  const { exchangeRate } = useFetchExchangeRate();
  const { tickers } = useBinanceTicker();
  const removeUSDT = (symbol: string) => {
    return symbol.replace('USDT', '');
  };

  return (
    <>
      <ul>
        {tickers && exchangeRate
          ? tickers.map((ticker) => {
              return (
                <li key={ticker.s}>
                  {removeUSDT(ticker.s)}: ₩
                  {(parseFloat(ticker.c) * exchangeRate).toFixed(2)}
                </li>
              );
            })
          : 'Loading…'}
      </ul>
    </>
  );
};
