import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AppDispatch, RootState } from "../../../../app/store/store";
import { fetchCalls } from "../../api/fetch-calls";
import { DateRangeSelect } from "../../../../shared/atoms/date-range-select/date-range-select";
import { callsColumns } from "../call-table/calls-columns";
import { CallsTable } from "../call-table/calls-table";
import { CallTypeSelector } from "../call-type-selector/call-type-selector";

export const CallsList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { calls, loading, error, totalRows } = useSelector(
    (state: RootState) => state.calls
  );
  const [offset, setOffset] = useState(0);
  const [dateStart, setDateStart] = useState<string>("");
  const [dateEnd, setDateEnd] = useState<string>("");
  const [sortBy, setSortBy] = useState<"date" | "duration">("date");
  const [order, setOrder] = useState<"ASC" | "DESC">("DESC");

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (!loading && calls.length < totalRows) {
      const newOffset = offset + 50;
      setOffset(newOffset);

      dispatch(
        fetchCalls({
          date_start: dateStart,
          date_end: dateEnd,
          in_out: undefined,
          limit: 50,
          offset: newOffset,
          sort_by: sortBy,
          order: order,
        })
      );
    }
  }, [
    dispatch,
    loading,
    calls.length,
    totalRows,
    offset,
    dateStart,
    dateEnd,
    sortBy,
    order,
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMore]);

  const handleDateRangeChange = useCallback(
    (range: string) => {
      let startDate = new Date();
      let endDate = new Date();

      switch (range) {
        case "3 дня":
          startDate.setDate(startDate.getDate() - 3);
          break;
        case "Неделя":
          startDate.setDate(startDate.getDate() - 7);
          break;
        case "Месяц":
          startDate.setMonth(startDate.getMonth() - 1);
          break;
        case "Год":
          startDate.setFullYear(startDate.getFullYear() - 1);
          break;
        default:
          break;
      }

      const formatDate = (date: Date) => date.toISOString().split("T")[0];

      const newDateStart = formatDate(startDate);
      const newDateEnd = formatDate(endDate);

      setDateStart(newDateStart);
      setDateEnd(newDateEnd);
      setOffset(0);

      dispatch(
        fetchCalls({
          date_start: newDateStart,
          date_end: newDateEnd,
          in_out: undefined,
          limit: 50,
          offset: 0,
          sort_by: sortBy,
          order: order,
        })
      );
    },
    [dispatch, sortBy, order]
  );

  const handleCallTypeChange = useCallback(
    (type: "all" | "in" | "out") => {
      setOffset(0);

      dispatch(
        fetchCalls({
          date_start: dateStart,
          date_end: dateEnd,
          in_out: type === "all" ? undefined : type === "in" ? 1 : 0,
          limit: 50,
          offset: 0,
          sort_by: sortBy,
          order: order,
        })
      );
    },
    [dispatch, dateStart, dateEnd, sortBy, order]
  );

  const handleSortChange = useCallback(
    (newSortBy: "date" | "duration") => {
      const newOrder = sortBy === newSortBy && order === "ASC" ? "DESC" : "ASC";
      setSortBy(newSortBy);
      setOrder(newOrder);

      dispatch(
        fetchCalls({
          date_start: dateStart,
          date_end: dateEnd,
          in_out: undefined,
          limit: 50,
          offset: 0,
          sort_by: newSortBy,
          order: newOrder,
        })
      );
    },
    [dispatch, dateStart, dateEnd, sortBy, order]
  );

  useEffect(() => {
    handleDateRangeChange("3 дня");
  }, []);

  return (
    <div
      style={{
        width: "1440px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <FiltersContainer>
        <CallTypeSelector onChange={handleCallTypeChange} />
        <DateRangeSelect onChange={handleDateRangeChange} />
      </FiltersContainer>
      <CallsTable
        data={calls}
        columns={callsColumns}
        loading={loading}
        error={error}
        sortBy={sortBy}
        order={order}
        onSortChange={handleSortChange}
      />
      <div ref={loadMoreRef} style={{ height: "1px", visibility: "hidden" }} />
    </div>
  );
};

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
