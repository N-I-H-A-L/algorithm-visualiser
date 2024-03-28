import React from 'react';
import "./css/Grid.css";

const Grid = ({ numRows, numCols }) => {
  // Generate rows and cells for the grid
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    const cells = [];
    for (let j = 0; j < numCols; j++) {
      cells.push(<div id={`${i}-${j}`} className="grid-cell"></div>);
    }
    rows.push(<div key={i} className="grid-row">{cells}</div>);
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

//Logos
//Start: <i class="bi bi-geo-alt-fill"></i>
//Destination: <i class="bi bi-geo-fill"></i>
//Wall: <i class="bi bi-bricks"></i>
//Mine: <i class="bi bi-virus"></i>