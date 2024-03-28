import React from 'react';
import "./css/Grid.css";

const Grid = ({ numRows, numCols }) => {
  // Generate rows and cells for the grid
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    const cells = [];
    for (let j = 0; j < numCols; j++) {
      cells.push(<div id={`${i}-${j}`} className="cell"></div>);
    }
    rows.push(<div key={i} className="row">{cells}</div>);
  }

  return (
    <>
        <div style={{ '--rows': numRows, '--cols': numCols }} className="grid-container">
            {rows}
        </div>
    </>
  );
};

export default Grid;
