import type { IBinanceTicker } from '../../@types/binance.types';
import { useState, useEffect } from 'react';

export const useBinanceTicker = () => {
  const [binanceTickers, setBinanceTickers] = useState<IBinanceTicker[] | null>(
    null,
  );
  const SOCKET_URL = `wss://stream.binance.com:9443/ws/!ticker@arr`;
  // const limit = 30;

  useEffect(() => {
    const ws = new WebSocket(SOCKET_URL);

    ws.onmessage = (e) => {
      try {
        const data: IBinanceTicker[] = JSON.parse(e.data);
        const filteredData = data.filter((ticker: IBinanceTicker) =>
          ticker.s.endsWith('USDT'),
        );
        // setBinanceTickers(filteredData.slice(0, limit));
        setBinanceTickers(filteredData);
      } catch (e) {
        console.error('파싱 에러:', e);
      }
    };

    ws.onerror = (err) => {
      console.error('WebSocket Error', err);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  return { binanceTickers };
};
