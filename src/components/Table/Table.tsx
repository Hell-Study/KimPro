import * as styled from './Table.styles';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { exchangeRateState } from 'recoil/atoms/exchangeAtoms';
import useFetchExchangeRate from 'hooks/binance/useFetchExchangeRate';
import { TableNav } from './TableNav';
import { TableHeader } from './TableHeader';
import { TableBox } from './TableBox';

export const Table = () => {
  const { exchangeRate } = useFetchExchangeRate();
  const mySetExchangeRate = useSetRecoilState(exchangeRateState);
  useEffect(() => {
    mySetExchangeRate(exchangeRate);
  }, [exchangeRate]);

  return (
    <styled.TableContainer>
      <TableNav />
      <styled.TableBox>
        <TableHeader />
        <TableBox />
      </styled.TableBox>
    </styled.TableContainer>
  );
};
