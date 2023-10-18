import { getMarketCode } from 'api/bithumb/getMarketCode';
import { useEffect, useState } from 'react';
import BithumbTable from './BithumbTable';
import useBithumbTicker from 'api/bithumb/useBithumbTicker';

export function Bithumb() {
  const [marketCodes, setMarketCodes] = useState<string[]>([]);
  useEffect(() => {
    getMarketCode().then((res) => {
      setMarketCodes(res);
    });
  }, []);

  const socketDatas = useBithumbTicker(marketCodes, ['MID', '24H']);

  return (
    <>
      {socketDatas.map((socketData) => (
        <BithumbTable key={socketData.symbol} socketData={socketData} />
      ))}
    </>
  );
}
