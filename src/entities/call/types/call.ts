/**
 * Тип данных для звонка.
 */
export interface Call {
  /**
   * Указывает, что этот звонок является исходящим.
   */
  is_out: boolean;

  /**
   * Дата в формате `2020-01-01 12:00:00`.
   */
  date: string;

  /**
   * ID сотрудника.
   */
  person_id: number;

  /**
   * Имя сотрудника.
   */
  person_name: string;

  /**
   * Фамилия сотрудника.
   */
  person_surname: string;

  /**
   * URL на `.jpg`-изображение аватара сотрудника.
   */
  person_avatar_url: string;

  /**
   * Номер телефона, с которого был совершён звонок.
   */
  number: string;

  /**
   * Источник звонка.
   */
  source: string | null;

  /**
   * Длительность звонка (в секундах).
   */
  duration: number;

  /**
   * Статус звонка. true, если удалось дозвониться.
   */
  status: boolean;

  /**
   * id записи звонка.
   */
  record: string;

  /**
   *  id партнера.
   */
  partnership_id: string;
}
