import { useEffect, useState } from 'react';
import useFetchBithumbTicker from './useFetchBithumbticker';
import { useRecoilValue } from 'recoil';
import { bithumbMarketCodesState } from 'recoil/atoms/bithumb';
import {
  IBithumbFetchTicker,
  IBithumbWsTicker,
} from 'components/bithumb/Bithumb.type';
import useBinanceTicker from 'hooks/binance/useBinanceTicker';
import { updateBithumbSocketDataWithBinance } from 'hooks/binance/updateBithumbSocketDataWithBinance';

export default function useBithumbWsTicker() {
  const marketCodes = useRecoilValue(bithumbMarketCodesState);
  const fetchData = useFetchBithumbTicker();
  const [socketDatas, setSocketDatas] = useState<IBithumbFetchTicker[]>([]);
  const { binanceTickers } = useBinanceTicker();

  useEffect(() => {
    if (marketCodes.length > 0 && fetchData.length > 0) {
      setSocketDatas(fetchData);
      const ws = new WebSocket('wss://pubwss.bithumb.com/pub/ws');

      ws.onopen = () => {
        if (ws.readyState === 1) {
          ws.send(
            JSON.stringify({
              type: 'ticker',
              symbols: marketCodes.map((x: string) => {
                return x + '_KRW';
              }),
              tickTypes: ['MID', '24H'],
            }),
          );
        }
      };

      ws.onmessage = async (e) => {
        const data: { type: string; content: IBithumbWsTicker } =
          await JSON.parse(e.data);

        if (data.type === 'ticker') {
          const { closePrice, lowPrice, highPrice, prevClosePrice, value } =
            data.content;

          setSocketDatas((prevState) => {
            const existingIndex = prevState.findIndex(
              (item) => item[0] === data.content.symbol.replace('_KRW', ''),
            );

            if (existingIndex !== -1) {
              if (data.content.tickType === 'MID') {
                const updatedItem = {
                  ...prevState[existingIndex][1],
                  closing_price: closePrice,
                  min_price: lowPrice,
                  max_price: highPrice,
                  prev_closing_price: prevClosePrice,
                };
                const updatedState = [...prevState];
                updatedState[existingIndex] = [
                  prevState[existingIndex][0],
                  updatedItem,
                ];
                return updatedState;
              } else {
                const updatedItem = {
                  ...prevState[existingIndex][1],
                  acc_trade_value_24H: value,
                };
                const updatedState = [...prevState];
                updatedState[existingIndex] = [
                  prevState[existingIndex][0],
                  updatedItem,
                ];
                return updatedState;
              }
            }
            return prevState;
          });
        }
      };

      return () => {
        if (ws.readyState !== 0) {
          ws.close();
        }
      };
    }
  }, [marketCodes, fetchData]);

  useEffect(() => {
    if (binanceTickers) {
      const newList = updateBithumbSocketDataWithBinance(
        socketDatas,
        binanceTickers,
      );
      setSocketDatas(newList);
    }
  }, [binanceTickers]);

  return socketDatas;
}
