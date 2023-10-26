import * as styled from './TableHeader.styles';
import { useRecoilValue } from 'recoil';
import { baseExchangeState } from 'recoil/atoms/common';

export const TableHeader = () => {
  const baseExchange = useRecoilValue(baseExchangeState);

  return (
    <styled.TableHeaderContainer>
      <styled.TableHeaderLeft></styled.TableHeaderLeft>
      <styled.TableHeaderLeft>코인</styled.TableHeaderLeft>
      <styled.TableHeaderRight>현재가</styled.TableHeaderRight>
      <styled.TableHeaderRight>김프</styled.TableHeaderRight>
      <styled.TableHeaderRight>전일대비</styled.TableHeaderRight>
      <styled.TableHeaderRight>
        고가대비{baseExchange === 'upbit' ? '(52주)' : '(전일)'}
      </styled.TableHeaderRight>
      <styled.TableHeaderRight>
        저가대비{baseExchange === 'upbit' ? '(52주)' : '(전일)'}
      </styled.TableHeaderRight>
      <styled.TableHeaderRight>거래대금</styled.TableHeaderRight>
    </styled.TableHeaderContainer>
  );
};
