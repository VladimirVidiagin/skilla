import React, { useState } from "react";
import styled from "styled-components";
import { ArrowUpIcon } from "../../../../shared/icons/arrow-up-icon";
import { ArrowDownIcon } from "../../../../shared/icons/arrow-down-icon";
import { CrossIconSmall } from "../../../../shared/icons/cross-icon-small";

interface CallTypeSelectorProps {
  onChange: (type: "all" | "in" | "out") => void;
}

export const CallTypeSelector: React.FC<CallTypeSelectorProps> = ({
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<"all" | "in" | "out">("all");

  const handleTypeChange = (type: "all" | "in" | "out") => {
    setSelectedType(type);
    setIsOpen(false);
    onChange(type);
  };

  const handleReset = () => {
    setSelectedType("all");
    onChange("all");
  };

  return (
    <Container>
      <SelectorButton onClick={() => setIsOpen(!isOpen)}>
        <SelectorLabel color={selectedType !== "all" ? "#002CFB" : "#5E7793"}>
          {selectedType === "all"
            ? "Все типы"
            : selectedType === "in"
            ? "Входящие"
            : "Исходящие"}
        </SelectorLabel>
        {isOpen ? (
          <ArrowUpIcon color={isOpen ? "#002CFB" : "#ADBFDF"} />
        ) : (
          <ArrowDownIcon color={isOpen ? "#002CFB" : "#ADBFDF"} />
        )}
      </SelectorButton>
      {isOpen && (
        <Dropdown>
          <DropdownItem
            onClick={() => handleTypeChange("all")}
            isSelected={selectedType === "all"}
          >
            Все типы
          </DropdownItem>
          <DropdownItem
            onClick={() => handleTypeChange("in")}
            isSelected={selectedType === "in"}
          >
            Входящие
          </DropdownItem>
          <DropdownItem
            onClick={() => handleTypeChange("out")}
            isSelected={selectedType === "out"}
          >
            Исходящие
          </DropdownItem>
        </Dropdown>
      )}
      {selectedType !== "all" && (
        <ResetButton onClick={handleReset}>
          <ResetText>Сбросить фильтры</ResetText>
          <CrossIconSmall />
        </ResetButton>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SelectorButton = styled.button`
  color: #5e7793;
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    & > span {
      color: #002cfb;
    }
    & > svg > path {
      fill: #002cfb;
    }
  }
`;

const SelectorLabel = styled.span<{ color: string }>`
  font-size: 14px;
  color: ${(props) => props.color};
  transition: color 0.2s;
`;

const Dropdown = styled.div`
  width: 133px;
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 8px;
  z-index: 10;
  margin-top: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const DropdownItem = styled.div<{ isSelected: boolean }>`
  padding: 8px 12px;
  font-size: 14px;
  color: ${(props) => (props.isSelected ? "#002CFB" : "#5E7793")};
  cursor: pointer;
  background-color: white;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #dee4ff;
    color: #122945;
  }

  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

const ResetButton = styled.button`
  color: #5e7793;
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    & > span {
      color: #002cfb;
    }
    & > svg > g > path {
      fill: #002cfb;
    }
  }
`;

const ResetText = styled.span`
  color: #5e7793;
  font-size: 14px;
  transition: color 0.2s;
`;
