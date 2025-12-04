import React from "react";

export interface PromptVarProps {
  children: string;
}

export const PromptVar = ({ children }: PromptVarProps) => {
  return (
    <code
      style={{
        backgroundColor: "rgba(255, 152, 0, 0.1)",
        color: "#ff9800",
        padding: "2px 6px",
        borderRadius: "4px",
        fontFamily: "monospace",
        fontSize: "0.9em",
        border: "1px solid rgba(255, 152, 0, 0.3)",
      }}
    >
      {"{{?"}
      {children}
      {"}}"}
    </code>
  );
};

