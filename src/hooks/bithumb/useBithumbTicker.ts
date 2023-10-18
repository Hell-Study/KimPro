import { ITicker } from 'components/bithumb/Bithumb.type';
import { useEffect, useState } from 'react';

export default function useBithumbTicker(
  marketCodes: string[],
  tickTypes: string[],
) {
  const [socketData, setSocketData] = useState<ITicker[]>([]);

  useEffect(() => {
    if (marketCodes.length > 0) {
      const ws = new WebSocket('wss://pubwss.bithumb.com/pub/ws');

      ws.onopen = () => {
        if (ws.readyState === 1) {
          ws.send(
            JSON.stringify({
              type: 'ticker',
              symbols: marketCodes,
              tickTypes: tickTypes,
            }),
          );
        }
      };

      ws.onmessage = async (e) => {
        const data = await JSON.parse(e.data);

        if (data.type === 'ticker') {
          setSocketData((prevList) => {
            const existingIndex = prevList.findIndex(
              (item) => item.symbol === data.content.symbol,
            );
            const { value, ...otherData } = data.content;
            if (data.content.tickType === 'MID') {
              if (existingIndex !== -1) {
                prevList[existingIndex] = {
                  ...prevList[existingIndex],
                  ...otherData,
                };
                return [...prevList];
              } else {
                return [...prevList, data.content];
              }
            } else {
              if (existingIndex !== -1) {
                prevList[existingIndex] = {
                  ...prevList[existingIndex],
                  value,
                };
              }
              return [...prevList];
            }
          });
        }
      };

      return () => {
        if (ws.readyState !== 0) {
          ws.close();
        }
      };
    }
  }, [marketCodes]);

  return socketData;
}
