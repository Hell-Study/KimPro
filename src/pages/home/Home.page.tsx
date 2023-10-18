import React, { useEffect } from 'react';
import { Table } from 'components/Table';
import { ChartRight } from 'components/ChartRight';
import { ChartLeft } from 'components/ChartLeft';
import { DisplayBoard, ChartsWrapper } from './Home.styles';
import useFetchMarketCode from 'api/upbit/useFetchMarketCode';

export const Home: React.FC = () => {
  const { isLoading, marketCodes: fetchedMC } = useFetchMarketCode();

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
