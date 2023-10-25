import { useEffect } from 'react';
import useBithumbWsTicker from 'hooks/bithumb/useBithumbWsTicker';
import BithumbTable from '../Table/BithumbTable';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { bithumbTickerState } from 'recoil/atoms/bithumb';
import { coingeckoCoinDataState } from 'recoil/atoms/coingecko';
import { getCoingeckoData } from 'api/coingecko/getCoingeckoData';
import useFetchBithumbTicker from 'hooks/bithumb/useFetchBithumbticker';

export function Bithumb() {
  useFetchBithumbTicker();
  useBithumbWsTicker();

  const socketDatas = useRecoilValue(bithumbTickerState);

  const setCoingeckoData = useSetRecoilState(coingeckoCoinDataState);
  useEffect(() => {
    getCoingeckoData().then((res) => {
      setCoingeckoData(res.coins);
    });
  }, []);

  return (
    <>
      {socketDatas.map((socketData) => {
        return <BithumbTable key={socketData[0]} socketData={socketData} />;
      })}
    </>
  );
}
