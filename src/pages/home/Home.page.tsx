import * as style from './Home.styles';
import { Table } from 'components/Table';
import { ChartRight } from 'components/ChartRight';
import { ChartLeft } from 'components/ChartLeft';

export const Home: React.FC = () => {
  return (
    <style.DisplayBoard>
      <style.ChartsWrapper>
        <ChartLeft />
        <ChartRight />
      </style.ChartsWrapper>
      <Table />
    </style.DisplayBoard>
  );
};
