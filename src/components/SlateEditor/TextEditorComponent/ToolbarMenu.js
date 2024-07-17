import React from "react";
import { cx, css } from "@emotion/css";

export const Menu = React.forwardRef(({ className, ...props }, ref) => (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: -20px;
          gap: 13px;
        `
      )}
    />
  ));
  
  const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
    <Menu
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          position: sticky;
                  top: 12px;
                  z-index: 100;
                  background-color: white;
                  ${'' /* border-bottom: 2px solid #eee; */}
                  margin-bottom: 20px;
                  display: flex;
                  flex-wrap: wrap;
                  align-items: center; 
                  justify-content: center;
                  width: fit-content;
                  max-width: 110%;
                  height: 45px;
                  margin: 10px auto;
                  padding: 8px 10px; 
                  border-radius: 4px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
                  transform: translateZ(0);
                  overflow: hidden; 
        `
      )}
    />
  ));

  export default Toolbar;