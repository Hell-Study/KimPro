import * as styled from './TableHeaderItem.styles';
import { useRecoilState } from 'recoil';
import {
  tableSortUpDownState,
  tableSortValueState,
} from 'recoil/atoms/tableAtoms';

interface IProps {
  value: string;
}

export const TableHeaderItem = ({ value }: IProps) => {
  const processedValue = value.slice(0, 4);
  const isSortHighLowValue =
    processedValue === '고가대비' || processedValue === '저가대비';

  const [tableSortValue, setTableSortValue] =
    useRecoilState(tableSortValueState);
  const [tableSortUpDown, setTableSortUpDown] =
    useRecoilState(tableSortUpDownState);

  const isSameValue = () => {
    if (isSortHighLowValue) {
      return tableSortValue === processedValue;
    } else {
      return tableSortValue === value;
    }
  };
  const sortValue = isSameValue();

  const changeSortVlaue = () => {
    if (sortValue) {
      setTableSortUpDown(!tableSortUpDown);
    } else {
      if (isSortHighLowValue) {
        setTableSortValue(processedValue);
      } else {
        setTableSortValue(value);
      }
    }
  };

  return (
    <styled.TableHeaderItemContainer
      $value={value}
      onClick={changeSortVlaue}
      className={sortValue ? 'active' : ''}
    >
      {value}
      <styled.SortIconWrapper>
        <styled.SortUpIcon
          className={sortValue ? (tableSortUpDown ? 'active' : '') : ''}
          viewBox="0 -250 320 512"
        />
        <styled.SortDownIcon
          className={sortValue ? (tableSortUpDown ? '' : 'active') : ''}
          viewBox="0 250 320 512"
        />
      </styled.SortIconWrapper>
    </styled.TableHeaderItemContainer>
  );
};
