import React from 'react';
import { useQuery } from 'react-query';
import useBinanceTicker from '../../hooks/useBinanceTicker';
import fetchExchangeRate from '../../api/binance/fetchExchangeRate';

export const Test: React.FC = () => {
  const { tickers, error: TickerError } = useBinanceTicker(
    'wss://stream.binance.com:9443/ws/!ticker@arr',
    30,
  );

  const { data: exchangeRate, isError } = useQuery(
    'exchangeRate',
    fetchExchangeRate,
    {
      refetchInterval: 1000 * 60 * 60, // (임의) 1시간마다 호출
    },
  );

  return (
    <>
      {TickerError || isError ? (
        <p>Error: {TickerError}</p>
      ) : (
        <>
          <p>바이낸스 기준 현재가(1-30):</p>
          <p>현재 환율(USD/KRW): {exchangeRate || null}</p>
          <ul>
            {tickers && exchangeRate ? (
              tickers.map((ticker) => (
                <li key={ticker.s}>
                  {ticker.s}: ₩
                  {(parseFloat(ticker.c) * exchangeRate).toFixed(2)}
                </li>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </ul>
        </>
      )}
    </>
  );
};
