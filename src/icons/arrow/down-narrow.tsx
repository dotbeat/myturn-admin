import { Box } from "@mui/material";
import { SvgIconCommonProps } from "@/types/icon";

export const ArrowDownNarrowIcon = ({
  size,
  className = "",
}: SvgIconCommonProps) => {
  return (
    <Box
      className={`flex items-center justify-center ${className}`}
      sx={{ width: `${size}px`, height: `${size}px` }}
    >
      <svg
        width={size}
        height={Math.ceil((size * 8) / 14)}
        viewBox="0 0 14 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.28898 7.15694L0.631985 1.49994L2.04598 0.0859375L6.99599 5.03594L11.946 0.0859375L13.36 1.49994L7.70299 7.15694C7.51546 7.34441 7.26115 7.44972 6.99599 7.44972C6.73082 7.44972 6.47651 7.34441 6.28898 7.15694Z"
          fill="currentColor"
        />
      </svg>
    </Box>
  );
};
