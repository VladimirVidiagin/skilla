import { Call } from "../../../entities/call/types/call";

export interface CallsState {
  calls: Call[];
  loading: boolean;
  error: string | null;
  totalRows: number;
}
