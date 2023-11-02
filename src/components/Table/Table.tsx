import * as styled from './Table.styles';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { exchangeRateState } from 'recoil/atoms/exchangeAtoms';
import { baseExchangeState } from 'recoil/atoms/commonAtoms';
import useFetchExchangeRate from 'hooks/binance/useFetchExchangeRate';
import { TableNav } from './TableNav';
import { TableHeader } from './TableHeader';
import UpbitTable from './UpbitTable';
import { Bithumb } from './Bithumb';

export const Table = () => {
  const baseExchange = useRecoilValue(baseExchangeState);

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
        {baseExchange === 'upbit' ? <UpbitTable /> : <Bithumb />}
      </styled.TableBox>
    </styled.TableContainer>
  );
};
