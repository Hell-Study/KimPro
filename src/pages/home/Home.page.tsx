import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Table } from 'components/Table';
import { ChartRight } from 'components/ChartRight';
import { ChartLeft } from 'components/ChartLeft';
import { useFetchMarketCode } from 'use-upbit-api';
import { marketCodesState } from 'recoil/atoms/upbit';
import { DisplayBoard } from './Home.styles';
import styled from 'styled-components';

const ChartsWrapper = styled.div`
  background-color: whitesmoke;
  padding: 5px;
  display: grid;
  gap: 5px;
  grid-template-columns: 1fr 1fr;
`;

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
      <ChartsWrapper>
        <ChartLeft />
        <ChartRight />
      </ChartsWrapper>
      <Table />
    </DisplayBoard>
  );
};
