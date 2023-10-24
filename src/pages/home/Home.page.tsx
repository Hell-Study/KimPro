import * as styled from './Home.styles';
import { Table } from 'components/Table';
import { ChartRight } from 'components/ChartRight';
import { ChartLeft } from 'components/ChartLeft';
import { ChatBox } from 'components/ChatBox';
import { modalIsOpenState } from 'recoil/atoms/upbit';
import { useRecoilState } from 'recoil';
import { Header } from 'components/common/Header';
import { Test } from 'components/Test';

export const Home: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useRecoilState(modalIsOpenState);

  const openModal = () => {
    setModalIsOpen(true);
  };

  return (
    <>
      <Header />
      <styled.DisplayBoard>
        <styled.ChartsWrapper>
          <ChartLeft />
          <ChartRight />
        </styled.ChartsWrapper>
        <Table />
        <ChatBox />
      </styled.DisplayBoard>
      <styled.ChatButton onClick={openModal}>CHAT</styled.ChatButton>
      <Test />
    </>
  );
};
