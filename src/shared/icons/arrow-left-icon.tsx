import React from "react";

interface Props {
  color?: string;
}

export const ArrowLeftIcon: React.FC<Props> = ({ color = "#ADBFDF" }) => {
  return (
    <svg
      width="16"
      height="24"
      viewBox="0 0 16 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_8646_760)">
        <path
          d="M6.175 15.825L2.35833 12L6.175 8.175L5 7L0 12L5 17L6.175 15.825Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_8646_760">
          <rect width="16" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
