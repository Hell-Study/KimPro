import styled from 'styled-components';

export const TableHeaderContainer = styled.div`
  height: 3rem;
  display: grid;
  grid-template-columns: 0.5fr 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;

export const TableHeaderLeft = styled.div`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.heading1};
  font-family: DM Sans;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.0075rem;
`;

export const TableHeaderRight = styled(TableHeaderLeft)`
  justify-content: flex-end;
`;
