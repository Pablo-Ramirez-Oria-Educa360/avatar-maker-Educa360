import React from "react";

export function Toolbar({ children, className = "" }) {
  return (
    <div className={`toolbar${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}
