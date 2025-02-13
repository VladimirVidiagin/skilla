import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCalls } from "../api/fetch-calls";
import { CallsState } from "../types/calls";
import { Call } from "../../../entities/call/types/call";

const initialState: CallsState = {
  calls: [],
  loading: false,
  error: null,
  totalRows: 0,
};

const callsSlice = createSlice({
  name: "calls",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCalls.fulfilled,
        (
          state,
          action: PayloadAction<{ results: Call[]; total_rows: number }>
        ) => {
          state.loading = false;
          state.calls =
            // @ts-ignore
            action.meta.arg.offset === 0
              ? action.payload.results
              : [...state.calls, ...action.payload.results];
          state.totalRows = action.payload.total_rows;
        }
      )
      .addCase(fetchCalls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка при загрузке звонков";
      });
  },
});

export default callsSlice.reducer;
