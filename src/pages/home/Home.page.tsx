import { Table } from 'components/Table';
import { ChartRight } from 'components/ChartRight';
import { ChartLeft } from 'components/ChartLeft';
import { DisplayBoard, ChartsWrapper } from './Home.styles';

export const Home: React.FC = () => {
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
