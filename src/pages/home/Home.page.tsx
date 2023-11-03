import { useEffect } from 'react';
import * as styled from './Home.styles';
import { Header } from 'components/common/Header';
import { Widget } from 'components/Widget';
import { ChartLeft } from 'components/ChartLeft';
import { ChartRight } from 'components/ChartRight';
import { Table } from 'components/Table';
import { ChatBox } from 'components/ChatBox';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalIsOpenState } from 'recoil/atoms/commonAtoms';
import { useFetchExchangeRate } from 'hooks/binance';
import { exchangeRateState } from 'recoil/atoms/exchangeAtoms';

export const Home: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useRecoilState(modalIsOpenState);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const { exchangeRate } = useFetchExchangeRate();
  const setExchangeRate = useSetRecoilState(exchangeRateState);
  useEffect(() => {
    setExchangeRate(exchangeRate);
  }, [exchangeRate]);

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
      <styled.ChatButton onClick={openModal} $isOpen={modalIsOpen}>
        <styled.Icon />
      </styled.ChatButton>
    </>
  );
};
