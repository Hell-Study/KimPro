import * as styled from './Home.styles';
import { Table } from 'components/Table';
import { ChartRight } from 'components/ChartRight';
import { ChartLeft } from 'components/ChartLeft';
import { ChatBox } from 'components/ChatBox';
import { Widget } from 'components/Widget';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Header } from 'components/common/Header';
import BithumbRealTimeChart from 'components/ChartRight/BithumbRealTimeChart';
import { baseExchangeState, modalIsOpenState } from 'recoil/atoms/commonAtoms';

export const Home: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useRecoilState(modalIsOpenState);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const baseExchange = useRecoilValue(baseExchangeState);

  return (
    <>
      <Header />
      <styled.DisplayBoard>
        <Widget />
        <styled.ChartsWrapper>
          <ChartLeft />
          {baseExchange === 'upbit' ? <ChartRight /> : <BithumbRealTimeChart />}
        </styled.ChartsWrapper>
        <Table />
        <ChatBox />
      </styled.DisplayBoard>
      <styled.ChatButton onClick={openModal} $isOpen={modalIsOpen}>
        <styled.Icon />
      </styled.ChatButton>
    </>
  );
};
