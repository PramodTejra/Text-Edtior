import React from "react";
import { cx, css } from "@emotion/css";
import { useTheme } from "@mui/material/styles";

const EditorButton = React.forwardRef(({ className, active, reversed, ...props }, ref) => {
  const theme = useTheme();
  return (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed
            ? active
              ? theme.palette.common.white
              : theme.palette.grey[500]
            : active
            ? theme.palette.common.black
            : theme.palette.grey[300]};
        `
      )}
    />
  );
});

export default EditorButton;
