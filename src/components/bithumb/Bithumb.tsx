import { useEffect } from 'react';
import { getBithumbMarketCode } from 'api/bithumb/getMarketCode';
import useBithumbTicker from 'hooks/bithumb/useBithumbTicker';
import BithumbTable from '../Table/BithumbTable';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { bithumbMarketCodesState } from 'recoil/atoms/bithumb';
import { coingeckoCoinsListState } from 'recoil/atoms/coingecko';
import { getCoingeckoCoinList } from 'api/coingecko/getCoingeckoCoinList';

export function Bithumb() {
  const [bithumbMarketCodes, setBithumbMarketCodes] = useRecoilState(
    bithumbMarketCodesState,
  );

  useEffect(() => {
    getBithumbMarketCode().then((res) => {
      setBithumbMarketCodes(res);
    });
  }, []);

  const socketDatas = useBithumbTicker(bithumbMarketCodes);

  const setCoingeckoCoinsList = useSetRecoilState(coingeckoCoinsListState);

  useEffect(() => {
    getCoingeckoCoinList().then((res) => {
      setCoingeckoCoinsList(res);
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
