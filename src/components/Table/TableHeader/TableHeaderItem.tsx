import * as styled from './TableHeaderItem.styles';
import { useRecoilState } from 'recoil';
import { tableSortUpDownState, tableSortValueState } from 'recoil/atoms/table';

interface IProps {
  value: string;
}

export const TableHeaderItem = ({ value }: IProps) => {
  const [tableSortValue, setTableSortValue] =
    useRecoilState(tableSortValueState);
  const [tableSortUpDown, setTableSortUpDown] =
    useRecoilState(tableSortUpDownState);
  const isSameValue = tableSortValue === value;

  const changeSortVlaue = () => {
    if (isSameValue) {
      setTableSortUpDown(!tableSortUpDown);
    } else {
      setTableSortValue(value);
    }
  };

  return (
    <styled.TableHeaderItemContainer
      $value={value}
      onClick={changeSortVlaue}
      className={isSameValue ? 'active' : ''}
    >
      {value}
      <styled.SortIconWrapper>
        <styled.SortUpIcon
          className={isSameValue ? (tableSortUpDown ? 'active' : '') : ''}
        />
        <styled.SortDownIcon
          className={isSameValue ? (tableSortUpDown ? '' : 'active') : ''}
        />
      </styled.SortIconWrapper>
    </styled.TableHeaderItemContainer>
  );
};
