import { createAsyncThunk } from "@reduxjs/toolkit";
import { Call } from "../../../entities/call/types/call";
import { API_TOKEN } from "../../../app/consts";

/**
 * Асинхронный thunk для загрузки звонков.
 */
export const fetchCalls = createAsyncThunk<
  { results: Call[]; total_rows: number },
  {
    date_start: string;
    date_end: string;
    in_out?: number;
    limit?: number;
    offset?: number;
    sort_by?: string;
    order?: "ASC" | "DESC";
  }
>(
  "calls/fetchCalls",
  async ({
    date_start,
    date_end,
    in_out,
    limit = 50,
    offset = 0,
    sort_by,
    order,
  }) => {
    const url = new URL("https://api.skilla.ru/mango/getList");
    url.searchParams.append("date_start", date_start);
    url.searchParams.append("date_end", date_end);
    if (in_out !== undefined)
      url.searchParams.append("in_out", in_out.toString());
    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("offset", offset.toString());
    if (sort_by) url.searchParams.append("sort_by", sort_by);
    if (order) url.searchParams.append("order", order);

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return {
      results: data?.results?.map((call: any) => ({
        is_out: call.in_out == 0,
        date: call.date,
        person_id: call.person_id,
        person_name: call.person_name,
        person_surname: call.person_surname,
        person_avatar_url: call.person_avatar,
        number: call.from_number,
        source: call.source?.length == 0 ? null : call.source,
        duration: call.time,
        status: call.status == "Дозвонился",
        record: call.record,
        partnership_id: call.partnership_id,
      })) as Call[],
      total_rows: data.total_rows,
    };
  }
);
