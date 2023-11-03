import * as styled from './TableNav.styles';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { baseExchangeState, marketCodesState } from 'recoil/atoms/commonAtoms';
import { searchCoinState, selectedCoinState } from 'recoil/atoms/tableAtoms';
import { CustomSelect } from 'components/CustomSelect';
import { SELECT_OPTION, SELECT_SINGLE_OPTION } from '../Table.constant';
import { BsArrowLeftRight } from 'react-icons/bs';

export const TableNav = () => {
  const setBaseExchange = useSetRecoilState(baseExchangeState);
  const setSelectedCoin = useSetRecoilState(selectedCoinState);
  const marketCodes = useRecoilValue(marketCodesState);

  const [searchCoin, setSearchCoin] = useRecoilState(searchCoinState);
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCoin(e.target.value);
  };

  return (
    <styled.TableNav>
      <styled.SelectWrapper>
        기준 거래소
        <CustomSelect
          optionData={SELECT_OPTION}
          onChange={(value) => {
            setBaseExchange(value);
            setSelectedCoin('BTC');
          }}
        />
        <BsArrowLeftRight />
        <CustomSelect optionData={SELECT_SINGLE_OPTION} disabled={true} />
        해외 거래소
      </styled.SelectWrapper>
      <styled.SearchWrapper>
        <styled.CoinCount>암호화폐 총 {marketCodes.length}개</styled.CoinCount>

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
  );
};
