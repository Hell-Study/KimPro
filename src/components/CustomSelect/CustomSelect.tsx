import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectState } from '../../recoil/atoms/selectState';
import { useDropdown } from '../../hooks/useDropdown';
import {
  SelectBox,
  Label,
  SelectOptions,
  Option,
  DropdownIcon,
  Check,
} from './CustomSelect.styles';

interface IOptionData {
  key: string;
  value: string;
  symbol: string;
}
interface CustomSelectProps {
  optionData: IOptionData[];
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ optionData }) => {
  const [selectedOption, setSelectedOption] = useRecoilState(selectState);
  const [currentValue, setCurrentValue] = useState(optionData[0].value);
  const { ref, isOpen, setIsOpen } = useDropdown();

  const handleOnChangeSelectValue = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    const targetValue = e.currentTarget.getAttribute('value') || '';
    setCurrentValue(targetValue);
    const selectedKey =
      optionData.find((opt) => opt.value === targetValue)?.key ||
      optionData[0].key;
    setSelectedOption(selectedKey);
    setIsOpen(false);
  };

  return (
    <SelectBox ref={ref} onClick={() => setIsOpen((prev: boolean) => !prev)}>
      <Label>
        <img
          src={optionData.find((opt) => opt.value === currentValue)?.symbol}
          alt={currentValue}
          width="20"
          height="20"
        />
        {currentValue}
      </Label>
      <DropdownIcon />
      <SelectOptions $show={isOpen}>
        {optionData.map((data) => (
          <Option
            key={data.key}
            value={data.value}
            onClick={handleOnChangeSelectValue}
          >
            <img src={data.symbol} alt={data.value} width="20" height="20" />
            {data.value}
            <Check $isChecked={data.value === currentValue ? 1 : 0} />
          </Option>
        ))}
      </SelectOptions>
    </SelectBox>
  );
};
