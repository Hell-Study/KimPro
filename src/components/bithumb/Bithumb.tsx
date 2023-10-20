import { useEffect, useState } from 'react';
import { getBithumbMarketCode } from 'api/bithumb/getMarketCode';
import useBithumbTicker from 'hooks/bithumb/useBithumbTicker';
import BithumbTable from './BithumbTable';

export function Bithumb() {
  const [marketCodes, setMarketCodes] = useState<string[]>([]);
  useEffect(() => {
    getBithumbMarketCode().then((res) => {
      setMarketCodes(res);
    });
  }, []);

  const socketDatas = useBithumbTicker(marketCodes);

  return (
    <>
      {socketDatas.map((socketData) => (
        <BithumbTable key={socketData.symbol} socketData={socketData} />
      ))}
    </>
  );
}
