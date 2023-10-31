import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { selectState } from 'recoil/atoms/selectState';
import { useDropdown } from 'hooks/useDropdown';
import { CustomSelectProps } from './CustomSelect.types';
import * as styled from './CustomSelect.styles';

export const CustomSelect: React.FC<CustomSelectProps> = ({
  optionData,
  onChange,
  disabled,
}) => {
  const setSelectedOption = useSetRecoilState(selectState);
  const [currentValue, setCurrentValue] = useState(optionData[0].value);
  const [currentTitle, setCurrentTitle] = useState(optionData[0].title);
  const { ref, isOpen, setIsOpen } = useDropdown();

  const handleOnChangeSelectValue = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    const targetTitle = e.currentTarget.getAttribute('value') || '';
    const selectedData = optionData.find((opt) => opt.title === targetTitle);

    if (selectedData) {
      setCurrentValue(selectedData.value);
      setCurrentTitle(selectedData.title);
      setSelectedOption(selectedData.key);
    }

    setIsOpen(false);
    if (onChange && selectedData) {
      onChange(selectedData.value);
    }
  };

  return (
    <styled.SelectBox
      ref={ref}
      onClick={() => {
        if (!disabled) {
          setIsOpen((prev: boolean) => !prev);
        }
      }}
      $disabled={disabled}
    >
      <styled.Label>
        <styled.Symbol
          src={optionData.find((opt) => opt.value === currentValue)?.symbol}
          alt={currentValue}
        />
        {currentTitle}
      </styled.Label>
      <styled.DropdownIcon />
      <styled.SelectOptions $show={isOpen}>
        {optionData.map((data) => (
          <styled.Option
            key={data.key}
            value={data.title}
            onClick={handleOnChangeSelectValue}
          >
            <styled.Symbol src={data.symbol} alt={data.value} />
            {data.title}
            <styled.Check $isChecked={data.value === currentValue} />
          </styled.Option>
        ))}
      </styled.SelectOptions>
    </styled.SelectBox>
  );
};
