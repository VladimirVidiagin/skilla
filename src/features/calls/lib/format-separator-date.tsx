import styled from "styled-components";

const DateText = styled.span`
  font-size: 15px;
  color: #122945;
`;

export const formatSeparatorDate = (date: string) => {
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayFormatted = yesterday.toISOString().split("T")[0];

  let formattedDate;
  if (date === today) {
    formattedDate = "Сегодня";
  } else if (date === yesterdayFormatted) {
    formattedDate = "Вчера";
  } else {
    formattedDate = new Date(date).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
    });
  }

  return <DateText>{formattedDate}</DateText>;
};
