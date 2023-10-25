import * as styled from './Table.styles';
import { useRecoilState, useRecoilValue } from 'recoil';
import { baseExchangeState } from 'recoil/atoms/common';
import UpbitTable from './UpbitTable';
import { Bithumb } from 'components/bithumb';
import { upbitMarketCodesState } from 'recoil/atoms/upbit';
import { bithumbMarketCodesState } from 'recoil/atoms/bithumb';

export const Table: React.FC = () => {
  const [baseExchange, setBaseExchange] = useRecoilState(baseExchangeState);
  const changeBaseExchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBaseExchange(e.target.value);
  };

  const upbitMarketCodes = useRecoilValue(upbitMarketCodesState);
  const bithumbMarketCodes = useRecoilValue(bithumbMarketCodesState);

  return (
    <styled.CoinListBox>
      <styled.CoinBoxNav>
        <div>
          기준 거래소
          <select onChange={changeBaseExchange}>
            <option value="upbit">업비트</option>
            <option value="bithumb">빗썸</option>
          </select>
          -
          <select>
            <option value="binance">바이낸스 USDT 마켓</option>
          </select>
          해외 거래소
        </div>
        <div>
          암호화폐 총
          {baseExchange === 'upbit'
            ? upbitMarketCodes.length
            : bithumbMarketCodes.length}
          개
          <input type="text" name="검색어" placeholder="검색어를 입력하세요" />
        </div>
      </styled.CoinBoxNav>
      <styled.CoinBoxHeader>
        <div>코인</div>
        <div>현재가</div>
        <div>김프</div>
        <div>전일대비</div>
        <div>고가대비{baseExchange === 'upbit' ? '(52주)' : '(전일)'}</div>
        <div>저가대비{baseExchange === 'upbit' ? '(52주)' : '(전일)'}</div>
        <div>거래대금</div>
      </styled.CoinBoxHeader>
      {baseExchange === 'upbit' ? <UpbitTable /> : <Bithumb />}
    </styled.CoinListBox>
  );
};
