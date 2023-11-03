import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
`;

export const TableBox = styled.div`
  padding: 0 0.9375rem 1.375rem 0.9375rem;
  background-color: ${({ theme }) => theme.colors.bg_element4};
  border-radius: 15px;
  box-shadow: 0px 0px 25px 0px rgba(48, 73, 191, 0.07);
`;
