import React from "react";

/**
 * Оценка звонка.
 */
export enum Grade {
  /**
   * Отлично.
   */
  Great,

  /**
   * Хорошо.
   */
  Good,

  /**
   * Плохо.
   */
  Bad,
}

const grades: Record<
  Grade,
  {
    text: string;
    backgroundColor: string;
    borderColor: string;
    textColor?: string;
  }
> = {
  [Grade.Great]: {
    text: "Отлично",
    backgroundColor: "#DBF8EF",
    borderColor: "#28A879",
    textColor: "#00A775",
  },
  [Grade.Good]: {
    text: "Хорошо",
    backgroundColor: "#D8E4FB",
    borderColor: "#ADBFDF",
    textColor: "#122945",
  },
  [Grade.Bad]: {
    text: "Плохо",
    backgroundColor: "#FEE9EF",
    borderColor: "#EA1A4F",
  },
};

/**
 * Компонент, отображающий оценку сущности.
 */
export const GradeStatus: React.FC<{
  grade: Grade;
}> = ({ grade }) => {
  const gradeInfo = grades[grade];

  return (
    <div
      style={{
        paddingTop: "6px",
        paddingBottom: "6px",
        paddingRight: "8px",
        paddingLeft: "8px",
        border: `1px solid ${gradeInfo.borderColor}`,
        borderRadius: "4px",
        backgroundColor: gradeInfo.backgroundColor,
        color: gradeInfo.textColor ?? gradeInfo.borderColor,
      }}
    >
      {gradeInfo.text}
    </div>
  );
};
