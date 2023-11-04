import * as styled from './TableHeader.styles';
import { useRecoilValue } from 'recoil';
import { baseExchangeState } from 'recoil/atoms/commonAtoms';
import { TableHeaderItem } from './TableHeaderItem/TableHeaderItem';

export const TableHeader = () => {
  const baseExchange = useRecoilValue(baseExchangeState);

  return (
    <styled.TableHeaderContainer>
      <div></div>
      <TableHeaderItem value="코인" />
      <TableHeaderItem value="현재가" />
      <TableHeaderItem value="김프" />
      <TableHeaderItem value="전일대비" />
      <TableHeaderItem
        value={`고가대비${baseExchange === 'upbit' ? '(52주)' : '(전일)'}`}
      />
      <TableHeaderItem
        value={`저가대비${baseExchange === 'upbit' ? '(52주)' : '(전일)'}`}
      />
      <TableHeaderItem value="거래액(일)" />
    </styled.TableHeaderContainer>
  );
};
