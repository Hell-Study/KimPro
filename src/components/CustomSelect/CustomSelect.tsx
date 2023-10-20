import React, { useState, useRef, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { selectState } from '../../recoil/atoms/selectState';
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
  const [showOptions, setShowOptions] = useState(false);

  const selectBoxRef = useRef<HTMLDivElement>(null);
  const handleOnChangeSelectValue = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    const targetValue = e.currentTarget.getAttribute('value') || '';
    setCurrentValue(targetValue);
    const selectedKey =
      optionData.find((opt) => opt.value === targetValue)?.key ||
      optionData[0].key;
    setSelectedOption(selectedKey);
    setShowOptions(false);
  };
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        selectBoxRef.current &&
        !selectBoxRef.current.contains(e.target as Node)
      ) {
        setShowOptions(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <SelectBox
      ref={selectBoxRef}
      onClick={() => setShowOptions((prev) => !prev)}
    >
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
      <SelectOptions $show={showOptions}>
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
