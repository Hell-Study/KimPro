import { useState, useEffect } from 'react';

interface ITicker {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  c: string; //  Last price
  Q: string; //  Last quantity
}

const useBinanceTicker = (url: string, limit: number) => {
  const [tickers, setTickers] = useState<ITicker[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('웹소켓 연결');
    };

    ws.onmessage = (e) => {
      try {
        const data: ITicker[] = JSON.parse(e.data);
        const filteredData = data.filter((ticker: ITicker) =>
          ticker.s.endsWith('USDT'),
        );
        setTickers(filteredData.slice(0, limit));
      } catch (e) {
        console.log('파싱 에러:', e);
      }
    };

    ws.onerror = (err) => {
      setError('웹소켓 에러');
      console.log(err);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [url, limit]);

  return { tickers, error };
};

export default useBinanceTicker;
