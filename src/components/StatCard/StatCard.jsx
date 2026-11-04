import React from "react";
import "./StatCard.css";
export default function StatCard({
  label,
  value,
  change,
  icon: Icon,
  tone = "teal",
}) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${tone}`}>
        <Icon size={19} />
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {change && <div className="stat-change">↗ {change}</div>}
    </div>
  );
}
