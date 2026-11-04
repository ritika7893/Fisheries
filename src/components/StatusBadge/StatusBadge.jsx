import React from "react";
import "./StatusBadge.css";
export default function StatusBadge({ status }) {
  const s = String(status || "");
  let c =
    s === "Paid" ||
    s === "Delivered" ||
    s === "Received by farmer" ||
    s === "Farmer accepted" ||
    s === "In transit" ||
    s === "Picked up"
      ? "green"
      : s.toLowerCase().includes("alert") ||
          s.toLowerCase().includes("near") ||
          s === "Negotiation" ||
          s === "Payment pending" ||
          s === "Out for delivery"
        ? "amber"
        : s.toLowerCase().includes("expired") ||
            s.toLowerCase().includes("reject")
          ? "red"
          : "blue";
  return (
    <span className={`status-badge ${c}`}>
      <i />
      {s}
    </span>
  );
}
