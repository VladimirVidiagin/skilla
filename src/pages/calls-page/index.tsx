import React from "react";
import { CallsList } from "../../features/calls/ui/calls-list";

export const CallsPage: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "80px 240px 120px 240px",
        backgroundColor: "#F1F4F9",
      }}
    >
      <CallsList />
    </div>
  );
};
