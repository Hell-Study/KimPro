import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Table } from 'components/Table';
import { useFetchMarketCode } from 'use-upbit-api';
import { marketCodesState } from 'recoil/atoms/upbit';
import { DisplayBoard } from './Home.styles';

export const Home: React.FC = () => {
  const { isLoading, marketCodes: fetchedMC } = useFetchMarketCode();
  const [marketCodes, setMarketCodes] = useRecoilState(marketCodesState);

  useEffect(() => {
    const MarketCodes_KRW = fetchedMC.filter((code) =>
      code.market.includes('KRW'),
    );
    setMarketCodes(MarketCodes_KRW);
  }, [fetchedMC]);

  return (
    <DisplayBoard>
      <Table />
    </DisplayBoard>
  );
};
