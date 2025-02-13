import { Call } from "../../../../entities/call/types/call";
import {
  Grade,
  GradeStatus,
} from "../../../../shared/atoms/grade-status/grade-status";
import { IncomingCallIcon } from "../../../../shared/icons/incoming-call-icon";
import { OutcomingCallIcon } from "../../../../shared/icons/outcoming-call-icon";

import { secondsToString } from "../../../../shared/utils/seconds-to-string";

/**
 * Тип данных для колонки таблицы.
 */
export interface Column {
  /**
   * Название колонки.
   */
  title: string;

  /**
   * Название поля в данных.
   */
  data_field: string;

  /**
   * Ширина колонки в пикселях.
   */
  width: number;

  /**
   * Выравнивание контента в колонке справа, нежели слева.
   */
  right_align?: boolean;

  /**
   * Функция для отображения данных в колонке.
   */
  render?: (value: any, index: number, record: Call) => React.ReactNode;

  /**
   * Возможность сортировки по колонке.
   */
  sorter?: boolean;

  /**
   * Возможность замены значения на иконку при наведении.
   */
  replace_on_hover?: boolean;
}

/**
 * Стандартные колонки для таблицы со списком звонков.
 */
export const callsColumns: Column[] = [
  {
    title: "Тип",
    data_field: "is_out",
    width: 54,
    render: (is_out: boolean, _, record: Call) => {
      if (is_out) {
        return (
          <OutcomingCallIcon color={record?.status ? "#28A879" : "#EA1A4F"} />
        );
      }
      return (
        <IncomingCallIcon color={record?.status ? "#002CFB" : "#EA1A4F"} />
      );
    },
  },
  {
    title: "Время",
    data_field: "date",
    width: 88,
    render: (value: string) => new Date(value).toLocaleTimeString(),
    sorter: true,
  },
  {
    title: "Сотрудник",
    data_field: "person_avatar_url",
    width: 129,
    render: (value: string) => (
      <img
        src={value}
        alt="Аватар"
        style={{ width: "24px", height: "24px", borderRadius: "50%" }}
      />
    ),
  },
  {
    title: "Звонок",
    data_field: "number",
    width: 325,
    render: (value: string) => value,
  },
  {
    title: "Источник",
    data_field: "source",
    width: 214,
    render: () => {
      // source в ответе всегда пустая строка
      return (
        <div style={{ color: "#5E7793", fontSize: "15px" }}>Rabota.ru</div>
      );
    },
  },
  {
    title: "Оценка",
    data_field: "no_field",
    width: 229,
    render: (_, index: number) => {
      if (index % 2 !== 0) return null;

      return <GradeStatus grade={index % (Grade.Bad + 1)} />;
    },
  },
  {
    title: "Длительность",
    data_field: "duration",
    width: 352,
    right_align: true,
    render: (duration: number) => secondsToString(duration),
    replace_on_hover: true,
    sorter: true,
  },
];
