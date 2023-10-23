import { useEffect } from 'react';
import { getBithumbMarketCode } from 'api/bithumb/getMarketCode';
import useBithumbWsTicker from 'hooks/bithumb/useBithumbWsTicker';
import BithumbTable from '../Table/BithumbTable';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { bithumbMarketCodesState } from 'recoil/atoms/bithumb';
import { coingeckoCoinDataState } from 'recoil/atoms/coingecko';
import { getCoingeckoData } from 'api/coingecko/getCoingeckoData';

export function Bithumb() {
  const [bithumbMarketCodes, setBithumbMarketCodes] = useRecoilState(
    bithumbMarketCodesState,
  );

  useEffect(() => {
    getBithumbMarketCode().then((res) => {
      setBithumbMarketCodes(res);
    });
  }, []);

  const socketDatas = useBithumbWsTicker(bithumbMarketCodes);

  const setCoingeckoData = useSetRecoilState(coingeckoCoinDataState);
  useEffect(() => {
    getCoingeckoData().then((res) => {
      setCoingeckoData(res.coins);
    });
  }, []);

  return (
    <>
      {socketDatas.map((socketData) => (
        <BithumbTable key={socketData.symbol} socketData={socketData} />
      ))}
    </>
  );
}
