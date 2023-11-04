import * as styled from './Home.styles';
import { Header } from 'components/common/Header';
import { Widget } from 'components/Widget';
import { ChartLeft } from 'components/ChartLeft';
import { ChartRight } from 'components/ChartRight';
import { Table } from 'components/Table';
import { ChatBox } from 'components/ChatBox';
import { ChatBtn } from 'components/ChatBtn';
import { useFetchExchangeRate } from 'hooks/binance';

export const Home: React.FC = () => {
  useFetchExchangeRate();

  return (
    <>
      <Header />
      <styled.DisplayBoard>
        <Widget />
        <styled.ChartsWrapper>
          <ChartLeft />
          <ChartRight />
        </styled.ChartsWrapper>
        <Table />
        <ChatBox />
      </styled.DisplayBoard>
      <ChatBtn />
    </>
  );
};
