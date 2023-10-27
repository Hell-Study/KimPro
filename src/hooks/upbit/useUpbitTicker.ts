import { useRef, useState, useEffect } from 'react';
import useBinanceTicker from 'hooks/binance/useBinanceTicker';
import { updateUpbitListWithBinance } from 'hooks/binance/updateUpbitListWithBinance';
// import { throttle } from 'lodash';

export interface IUpbitTicker {
  code: string;
  change: string;
  trade_price: number;
  signed_change_rate: number;
  signed_change_price: number;
  highest_52_week_price: number;
  lowest_52_week_price: number;
  acc_trade_price_24h: number;
  acc_trade_volume_24h: number;
  binancePrice: string;
}

export interface IUpbitMarketCode {
  market: string;
  korean_name: string;
  english_name: string;
}

const createWebSocketRequest = (
  ticket: string,
  type: string,
  codes: string[],
  format = 'DEFAULT',
) => {
  const request = [{ ticket }, { type, codes }, { format }];
  return JSON.stringify(request);
};

function useUpbitTicker(marketCodes: IUpbitMarketCode[]) {
  const SOCKET_URL = 'wss://api.upbit.com/websocket/v1';
  const socket = useRef<WebSocket | null>(null);
  const [list, setList] = useState<IUpbitTicker[]>([]);
  const { binanceTickers } = useBinanceTicker();

  useEffect(() => {
    socket.current = new WebSocket(SOCKET_URL);

    const socketOpenHandler = () => {
      if (socket.current?.readyState == 1) {
        const ticket = 'seungjun2';
        const type = 'ticker';
        const codes = marketCodes.map((code) => code.market);
        const wsRequest = createWebSocketRequest(ticket, type, codes);
        socket.current.send(wsRequest);
      }
    };

    const socketMessageHandler = (evt: any) => {
      if (evt.data instanceof Blob) {
        const reader = new FileReader();

        reader.onload = function () {
          const blobData = reader.result;
          try {
            const parsedData = JSON.parse(blobData as string);

            setList((prevList) => {
              const existingIndex = prevList.findIndex(
                (item) => item.code === parsedData?.code,
              );
              if (existingIndex !== -1) {
                prevList[existingIndex] = {
                  ...prevList[existingIndex],
                  ...parsedData,
                };
                return [...prevList]; // 중복이 아닐 경우, 새로운 배열을 반환하여 상태 업데이트
              } else {
                return [...prevList, parsedData]; // 중복일 경우, 새로운 데이터를 추가한 새 배열을 반환
              }
            });
          } catch (error) {
            console.error('Error parsing JSON data:', error);
          }
        };
        reader.readAsText(evt.data);
      }
    };

    socket.current.onopen = socketOpenHandler;
    socket.current.onmessage = socketMessageHandler;
  }, [marketCodes]);

  useEffect(() => {
    if (binanceTickers) {
      const newList = updateUpbitListWithBinance(list, binanceTickers);
      setList(newList);
    }
  }, [binanceTickers]);

  return { socketDatas: list };
}

export default useUpbitTicker;
