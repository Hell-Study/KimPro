import { useState, useEffect } from 'react';

interface ITicker {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  c: string; //  Last price
  Q: string; //  Last quantity
}

const useBinanceTicker = () => {
  const [tickers, setTickers] = useState<ITicker[] | null>(null);
  const SOCKET_URL = `wss://stream.binance.com:9443/ws/!ticker@arr`;
  // const limit = 30;

  useEffect(() => {
    const ws = new WebSocket(SOCKET_URL);

    ws.onmessage = (e) => {
      try {
        const data: ITicker[] = JSON.parse(e.data);
        const filteredData = data.filter((ticker: ITicker) =>
          ticker.s.endsWith('USDT'),
        );
        // setTickers(filteredData.slice(0, limit));
        setTickers(filteredData);
      } catch (e) {
        console.log('파싱 에러:', e);
      }
    };

    ws.onerror = (err) => {
      console.log('WebSocket Error', err);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  return { tickers };
};

export default useBinanceTicker;
