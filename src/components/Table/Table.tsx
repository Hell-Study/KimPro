import * as styled from './Table.styles';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { baseExchangeState, searchCoinState } from 'recoil/atoms/common';
import UpbitTable from './UpbitTable';
import { Bithumb } from 'components/bithumb';
import { upbitMarketCodesState } from 'recoil/atoms/upbit';
import { bithumbMarketCodesState } from 'recoil/atoms/bithumb';
import { TableHeader } from './TableHeader';
import { exchangeRateState } from 'recoil/atoms/exchange';
import useFetchExchangeRate from 'hooks/binance/useFetchExchangeRate';
import { CustomSelect } from 'components/CustomSelect';
import { SELECT_OPTION, SELECT_SINGLE_OPTION } from './Table.constant';
import { BsArrowLeftRight } from 'react-icons/bs';

export const Table: React.FC = () => {
  const [baseExchange, setBaseExchange] = useRecoilState(baseExchangeState);
  const upbitMarketCodes = useRecoilValue(upbitMarketCodesState);
  const bithumbMarketCodes = useRecoilValue(bithumbMarketCodesState);
  const [searchCoin, setSearchCoin] = useRecoilState(searchCoinState);
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCoin(e.target.value);
  };

  const { exchangeRate } = useFetchExchangeRate();
  const [myExchangeRate, mySetExchangeRate] = useRecoilState(exchangeRateState);
  useEffect(() => {
    mySetExchangeRate(exchangeRate);
  }, [exchangeRate]);

  return (
    <styled.TableContainer>
      <styled.TableNav>
        <styled.SelectWrapper>
          기준 거래소
          <CustomSelect
            optionData={SELECT_OPTION}
            onChange={(value) => {
              setBaseExchange(value);
            }}
          />
          <BsArrowLeftRight />
          <CustomSelect optionData={SELECT_SINGLE_OPTION} disabled={true} />
          해외 거래소
        </styled.SelectWrapper>
        <styled.SearchWrapper>
          <styled.CoinCount>
            암호화폐 총{' '}
            {baseExchange === 'upbit'
              ? upbitMarketCodes.length
              : bithumbMarketCodes.length}
            개
          </styled.CoinCount>

          <styled.SearchForm>
            <styled.SearchIcon />
            <styled.SearchInput
              placeholder="암호 화폐 검색"
              value={searchCoin}
              onChange={handleSearchInputChange}
            />
          </styled.SearchForm>
        </styled.SearchWrapper>
      </styled.TableNav>

      <styled.TableBox>
        <TableHeader />
        {baseExchange === 'upbit' ? <UpbitTable /> : <Bithumb />}
      </styled.TableBox>
    </styled.TableContainer>
  );
};
