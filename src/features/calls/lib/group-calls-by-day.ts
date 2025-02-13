import { Call } from "../../../entities/call/types/call";

export const groupCallsByDay = (calls: Call[]) => {
  const groupedCalls: (Call | { type: "separator"; date: string })[] = [];
  let currentDate: string | null = null;

  calls.forEach((call) => {
    const callDate = call.date.split(" ")[0];

    if (callDate !== currentDate) {
      // Не добавляем разделитель для сегодняшней даты
      if (callDate !== new Date().toISOString().split("T")[0]) {
        groupedCalls.push({ type: "separator", date: callDate });
      }
      currentDate = callDate;
    }

    groupedCalls.push(call);
  });

  return groupedCalls;
};
