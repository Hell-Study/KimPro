import { useState, useEffect } from 'react';

interface IExchangeRate {
  value: number;
}

const useFetchExchangeRate = () => {
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const SSE_URL = process.env.REACT_APP_FX_IDC_API_URL;

  useEffect(() => {
    const eventSource = new EventSource(SSE_URL!);

    eventSource.onmessage = (event) => {
      const json: IExchangeRate = JSON.parse(event.data);

      if (json.value) {
        const rate = json.value;
        setExchangeRate(rate);
      }
    };

    eventSource.onerror = (err) => {
      console.error('Server-Sent Events Error:', err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return { exchangeRate };
};

export default useFetchExchangeRate;
