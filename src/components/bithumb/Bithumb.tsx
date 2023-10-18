import { useEffect, useState } from 'react';
import { getMarketCode } from 'api/bithumb/getMarketCode';
import useBithumbTicker from 'hooks/bithumb/useBithumbTicker';
import BithumbTable from './BithumbTable';

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
