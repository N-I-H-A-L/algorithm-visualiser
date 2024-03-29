import React, { useState } from 'react';
import "./css/Grid.css";
import { useParams } from '../context/context';

const Grid = ({ numRows, numCols }) => {
  const { mode, grid, setGrid } = useParams();

  // Generate rows and cells for the grid
  const rows = [];
  for(let i = 0; i < grid.length; i++){
    const cells = [];
    for(let j = 0; j < grid[i].length; j++){
      cells.push(
        <div id={`${i}-${j}`} key={`${i}-${j}`} className="grid-cell" onClick={(e) => handleClick(e)}>
          {grid[i][j].isStart ? <i className="bi bi-geo-alt-fill"></i> : null}
          {grid[i][j].isTarget ? <i className="bi bi-geo-fill"></i> : null}
          {grid[i][j].isWall ? <i className="bi bi-bricks"></i> : null}
          {grid[i][j].weight>1 ? <i className="bi bi-virus"></i> : null}
        </div>
      );
    }
    rows.push(<div key={i} className="grid-row">{cells}</div>);
  }

  const [forceUpdateFlag, setForceUpdateFlag] = useState(false);

  function manuallyTriggerUpdate() {
    setForceUpdateFlag(!forceUpdateFlag);
  }

  const handleClick = (e) => {
    //Use e.currentTarget to get the grid-cell div and not the logo inside it.
    const id = e.currentTarget.id;
    const dimensions = id.split('-');
    const row = dimensions[0], col = dimensions[1];

    if(mode=="setStart"){
      if(grid[row][col].isStart) grid[row][col].isStart = false;
      else{
        //If any other grid cell is marked as Start, unmark it.
        for(let i = 0; i<grid.length; i++){
          for(let j = 0; j<grid[i].length; j++){
            if(grid[i][j].isStart) grid[i][j].isStart = false;
          }
        }
        //Mark the current row, col.
        grid[row][col].isStart = true;
      }
      //Manually re-render the component for updating grid
    }
    
    manuallyTriggerUpdate();

  }
  console.log(useParams());

  return (
    <>
        <div style={{ '--rows': numRows, '--cols': numCols }} className="grid-container">
            {rows}
        </div>
    </>
  );
};

export default Grid;