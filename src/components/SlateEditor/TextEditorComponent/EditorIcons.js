import React from "react";
import { cx, css } from "@emotion/css";

const EditorIcon = React.forwardRef(({ className, ...props }, ref) => (
  <span
    {...props}
    ref={ref}
    className={cx(
      'material-icons',
      className,
      css`
        font-size: 18px;
        vertical-align: text-bottom;
        color:  ;
      `
    )}
  />
));

export default EditorIcon;


