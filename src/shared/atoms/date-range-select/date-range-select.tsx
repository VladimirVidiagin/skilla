import React, { useState } from "react";
import { CalendarIcon } from "../../icons/calendar-icon";
import { ArrowLeftIcon } from "../../icons/arrow-left-icon";
import { ArrowRightIcon } from "../../icons/arrow-right-icon";
import styled from "styled-components";

const dateOptions = ["3 дня", "Неделя", "Месяц", "Год"];

/**
 * Компонент фильтрующий таблицу по датам.
 */
export const DateRangeSelect: React.FC<{
  onChange: (range: string) => void;
}> = ({ onChange }) => {
  const [selectedRange, setSelectedRange] = useState("3 дня");
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelectedRange(option);
    setIsOptionsVisible(false);
    onChange(option);
  };

  const handleLeftArrowClick = () => {
    const currentIndex = dateOptions.indexOf(selectedRange);
    if (currentIndex > 0) {
      const newRange = dateOptions[currentIndex - 1];
      setSelectedRange(newRange);
      onChange(newRange);
    }
  };

  const handleRightArrowClick = () => {
    const currentIndex = dateOptions.indexOf(selectedRange);
    if (currentIndex < dateOptions.length - 1) {
      const newRange = dateOptions[currentIndex + 1];
      setSelectedRange(newRange);
      onChange(newRange);
    }
  };

  return (
    <Container>
      <ArrowButton onClick={handleLeftArrowClick}>
        <ArrowLeftIcon />
      </ArrowButton>

      <DateRangeContainer
        onClick={() => setIsOptionsVisible(!isOptionsVisible)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CalendarIcon
          color={isHovered || isOptionsVisible ? "#002CFB" : "#ADBFDF"}
        />
        <SelectedRange color="#002CFB">{selectedRange}</SelectedRange>
        {isOptionsVisible && (
          <OptionsList>
            {dateOptions.map((option) => (
              <OptionItem
                key={option}
                onClick={() => handleOptionClick(option)}
                isSelected={option === selectedRange}
              >
                {option}
              </OptionItem>
            ))}
          </OptionsList>
        )}
      </DateRangeContainer>

      <ArrowButton onClick={handleRightArrowClick}>
        <ArrowRightIcon />
      </ArrowButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 115px;
  height: 24px;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  &:hover svg path {
    fill: #002cfb;
  }
`;

const DateRangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  position: relative;
`;

const SelectedRange = styled.span<{ color: string }>`
  font-size: 14px;
  color: ${(props) => props.color};
`;

const OptionsList = styled.div`
  width: 204px;
  position: absolute;
  top: 24px;
  right: 0px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const OptionItem = styled.div<{ isSelected: boolean }>`
  padding: 8px 12px;
  font-size: 14px;
  color: ${(props) => (props.isSelected ? "#002CFB" : "#5E7793")};
  cursor: pointer;
  &:hover {
    background-color: #dee4ff;
    color: #122945;
  }
`;

export default DateRangeSelect;
