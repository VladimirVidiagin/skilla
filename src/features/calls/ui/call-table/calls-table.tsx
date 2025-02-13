import React, { useState } from "react";
import styled from "styled-components";
import { Call } from "../../../../entities/call/types/call";
import { Column } from "./calls-columns";
import { groupCallsByDay } from "../../lib/group-calls-by-day";
import { AudioPlayer } from "../../../../shared/atoms/audio-palyer/audio-player";
import { secondsToString } from "../../../../shared/utils/seconds-to-string";
import { ArrowUpIcon } from "../../../../shared/icons/arrow-up-icon";
import { ArrowDownIcon } from "../../../../shared/icons/arrow-down-icon";
import { formatSeparatorDate } from "../../lib/format-separator-date";

interface CallsTableProps {
  data: Call[];
  columns: Column[];
  loading: boolean;
  error: string | null;
  sortBy: "date" | "duration";
  order: "ASC" | "DESC";
  onSortChange: (sortBy: "date" | "duration") => void;
}

export const CallsTable: React.FC<CallsTableProps> = ({
  data,
  columns,
  loading,
  error,
  sortBy,
  order,
  onSortChange,
}) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const groupedData = groupCallsByDay(data);

  const handleSortClick = (column: Column) => {
    if (column.sorter) {
      const newSortBy = column.data_field === "date" ? "date" : "duration";
      onSortChange(newSortBy);
    }
  };

  if (loading && data.length === 0) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <TableContainer>
      <TableHeader>
        <TableHeaderRow>
          {columns.map((column) => (
            <TableHeaderCell
              key={column.title}
              width={`${column.width}px`}
              right_align={column.right_align ?? false}
            >
              {column.title}
              {column.sorter && (
                <SortButton onClick={() => handleSortClick(column)}>
                  {sortBy === column.data_field && order === "ASC" ? (
                    <ArrowUpIcon />
                  ) : (
                    <ArrowDownIcon />
                  )}
                </SortButton>
              )}
            </TableHeaderCell>
          ))}
        </TableHeaderRow>
      </TableHeader>
      <Border />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        {groupedData.map((item, index) => {
          const isSeparator = "type" in item;
          const nextItem = groupedData[index + 1];

          return isSeparator ? (
            sortBy === "date" && (
              <React.Fragment key={`separator-${index}`}>
                <SeparatorRow>
                  <SeparatorCell colSpan={columns.length}>
                    {formatSeparatorDate(item.date)}
                  </SeparatorCell>
                </SeparatorRow>
                {nextItem && !("type" in nextItem) && <Border />}
              </React.Fragment>
            )
          ) : (
            <React.Fragment key={index}>
              <TableRow
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.title}
                    width={`${column.width}px`}
                    right_align={column.right_align ?? false}
                    isHovered={hoveredRow === index && column.replace_on_hover}
                  >
                    {hoveredRow === index && column.replace_on_hover ? (
                      item.record ? (
                        <AudioPlayer
                          record={item.record}
                          partnership_id={item.partnership_id}
                          duration={item.duration}
                        />
                      ) : (
                        <>{secondsToString(item.duration)}</>
                      )
                    ) : column.render ? (
                      column.render(
                        item[column.data_field as keyof Call],
                        index,
                        item
                      )
                    ) : (
                      item[column.data_field as keyof Call]
                    )}
                  </TableCell>
                ))}
              </TableRow>
              {sortBy === "duration" || (nextItem && !("type" in nextItem)) ? (
                <Border />
              ) : null}
            </React.Fragment>
          );
        })}
        {loading && data.length > 0 && (
          <div style={{ padding: "12px 40px" }}>Загрузка...</div>
        )}
      </div>
    </TableContainer>
  );
};
const TableContainer = styled.div`
  padding: 24px 0;
  border-radius: 8px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0px 4px 5px 0px #e9edf3;
`;

const TableHeader = styled.div`
  padding: 0 40px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const TableHeaderRow = styled.div`
  display: flex;
`;

const TableRow = styled.div`
  display: flex;
  padding: 0 40px;

  &:hover {
    background-color: #d4dff32b;
  }
`;

const TableHeaderCell = styled.div<{ width: string; right_align: boolean }>`
  width: ${(props) => props.width};
  display: flex;
  align-items: center;
  color: #5e7793;
  gap: 4px;
  justify-content: ${(props) =>
    props.right_align ? "flex-end" : "flex-start"};
`;

const TableCell = styled.div<{
  width: string;
  right_align: boolean;
  isHovered?: boolean;
}>`
  width: ${(props) => props.width};
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.right_align ? "flex-end" : "flex-start"};
  position: relative;
  color: #122945;
  font-size: 15px;
`;

const SortButton = styled.span`
  display: flex;
  align-items: center;
  jusify-content: center;
  cursor: pointer;

  &:hover {
    & > svg > path {
      fill: #002cfb;
    }
  }
`;

const SeparatorRow = styled.tr`
  padding: 0 40px;
  height: 65px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 20px;
`;

const SeparatorCell = styled.td`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Border = styled.div`
  height: 1px;
  background-color: #eaf0fa;
  margin-left: 40px;
`;
