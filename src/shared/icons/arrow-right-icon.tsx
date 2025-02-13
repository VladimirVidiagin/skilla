import React from "react";

interface Props {
  color?: string;
}

export const ArrowRightIcon: React.FC<Props> = ({ color = "#ADBFDF" }) => {
  return (
    <svg
      width="17"
      height="24"
      viewBox="0 0 17 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_8646_766)">
        <path
          d="M9.58984 15.825L13.4065 12L9.58984 8.175L10.7648 7L15.7648 12L10.7648 17L9.58984 15.825Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_8646_766">
          <rect width="17" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
