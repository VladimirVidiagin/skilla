import React from "react";

interface Props {
  color?: string;
}

export const CrossIconSmall: React.FC<Props> = ({ color = "#ADBFDF" }) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_517)">
        <path
          d="M12.75 3.88125L11.8688 3L8.375 6.49375L4.88125 3L4 3.88125L7.49375 7.375L4 10.8688L4.88125 11.75L8.375 8.25625L11.8688 11.75L12.75 10.8688L9.25625 7.375L12.75 3.88125Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1_517">
          <rect width="15" height="15" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
