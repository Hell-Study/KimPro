import { useEffect, useState } from 'react';
import useFetchBithumbTicker from './useFetchBithumbticker';
import { useRecoilValue } from 'recoil';
import { bithumbMarketCodesState } from 'recoil/atoms/bithumb';
import {
  IBithumbTicker,
  IBithumbWsTicker,
} from 'components/bithumb/Bithumb.type';
import useBinanceTicker from 'hooks/binance/useBinanceTicker';
import { updateBithumbSocketDataWithBinance } from 'hooks/binance/updateBithumbSocketDataWithBinance';

export default function useBithumbWsTicker() {
  const marketCodes = useRecoilValue(bithumbMarketCodesState);
  const fetchData = useFetchBithumbTicker();
  const [socketDatas, setSocketDatas] = useState<IBithumbTicker[]>([]);
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
          const {
            tickType,
            symbol,
            closePrice,
            lowPrice,
            highPrice,
            prevClosePrice,
            value,
            date,
            time,
          } = data.content;

          setSocketDatas((prevState) => {
            const existingIndex = prevState.findIndex(
              (item) => item.symbol === symbol.replace('_KRW', ''),
            );

            if (existingIndex !== -1) {
              if (tickType === 'MID') {
                prevState[existingIndex] = {
                  ...prevState[existingIndex],
                  closing_price: closePrice,
                  min_price: lowPrice,
                  max_price: highPrice,
                  prev_closing_price: prevClosePrice,
                  date: date,
                  time: time,
                };
                return [...prevState];
              } else {
                prevState[existingIndex] = {
                  ...prevState[existingIndex],
                  acc_trade_value_24H: value,
                };
                return [...prevState];
              }
            }
            return [...prevState];
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
