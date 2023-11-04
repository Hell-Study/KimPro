import styled from 'styled-components';
import { FaSortUp } from '@react-icons/all-files/fa/FaSortUp';
import { FaSortDown } from '@react-icons/all-files/fa/FaSortDown';

export const TableHeaderItemContainer = styled.button<{ $value?: string }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $value }) => $value !== '코인' && 'flex-end'};
  gap: 0.125rem;

  color: ${({ theme }) => theme.colors.heading2};
  font-family: DM Sans;
  font-size: 0.8125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  background-color: inherit;
  border: 0;

  cursor: pointer;

  &.active {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.heading1};
  }
`;

export const SortIconWrapper = styled.span`
  display: flex;
  flex-direction: column;
`;

export const SortUpIcon = styled(FaSortUp)`
  color: ${({ theme }) => theme.colors.heading2};
  &.active {
    color: ${({ theme }) => theme.colors.heading1};
  }
`;

export const SortDownIcon = styled(FaSortDown)`
  color: ${({ theme }) => theme.colors.heading2};
  &.active {
    color: ${({ theme }) => theme.colors.heading1};
  }
`;
