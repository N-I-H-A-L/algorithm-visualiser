import React from "react";
import "../css/CostBox.css";

const CostBox = ({ cost }) => {
  return (
    <div className="cost-hud-badge">
      <span className="cost-indicator" />
      <span className="cost-label">Path Cost:</span>
      <span className="cost-value">{cost}</span>
    </div>
  );
};

export default CostBox;