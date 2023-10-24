import styled from 'styled-components';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { CgCheck } from 'react-icons/cg';

export const SelectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 8px;
  border-radius: 12px;
  background-color: #ffffff;
  align-self: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;

  img {
    margin-right: 8px;
  }
`;

interface SelectOptionsProps {
  $show: boolean;
}

export const SelectOptions = styled.ul<SelectOptionsProps>`
  position: absolute;
  list-style: none;
  top: 25px;
  left: 0;
  width: 250px;
  overflow: hidden;
  height: 90px;
  max-height: ${(props) => (props.$show ? 'none' : '0')};
  padding: 0;
  border-radius: 8px;
  background-color: #222222;
  color: #fefefe;
  z-index: 9999;
`;

export const Option = styled.li`
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 6px 8px;
  transition: background-color 0.2s ease-in;

  img {
    margin-right: 8px;
    vertical-align: middle;
  }

  span {
    margin-left: 8px;
  }

  &:hover {
    background-color: #595959;
  }
`;

export const DropdownIcon = styled(MdKeyboardArrowDown)`
  margin-left: auto;
  color: #49c181;
  font-size: 20px;
`;

export const Check = styled(CgCheck)<{ $isChecked: number }>`
  opacity: ${(props) => props.$isChecked};
  margin-left: auto;
  font-size: 20px;
`;
