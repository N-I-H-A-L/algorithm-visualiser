import React, { useState } from 'react';
import "./css/Grid.css";
import { useParams } from '../context/context';
import { BsGeoAlt, BsGeo, BsBricks, BsVirus
        } from "react-icons/bs";

const Grid = ({ numRows, numCols }) => {
  const { mode, grid, setGrid } = useParams();

  // Generate rows and cells for the grid
  const rows = [];
  for(let i = 0; i < grid.length; i++){
    const cells = [];
    for(let j = 0; j < grid[i].length; j++){
      cells.push(
        <div id={`${i}-${j}`} key={`${i}-${j}`} className="grid-cell" onClick={(e) => handleClick(e)}>
          {grid[i][j].isStart ? <BsGeoAlt /> : null}
          {grid[i][j].isTarget ? <BsGeo /> : null}
          {grid[i][j].isWall ? <BsBricks /> : null}
          {grid[i][j].weight>1 ? <BsVirus /> : null}
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
      //If current cell is neither a target, nor a wall nor a virus:
      if(!grid[row][col].isTarget && !grid[row][col].isWall && !(grid[row][col].weight>1)){
        console.log("inside");
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
      }
    }
    else if(mode=="setTarget"){
      //If current cell is neither a start, nor a wall nor a virus:
      if(!grid[row][col].isStart && !grid[row][col].isWall && !(grid[row][col].weight>1)){
        if(grid[row][col].isTarget) grid[row][col].isTarget = false;
        else{
          //If any other grid cell is marked as Start, unmark it.
          for(let i = 0; i<grid.length; i++){
            for(let j = 0; j<grid[i].length; j++){
              if(grid[i][j].isTarget) grid[i][j].isTarget = false;
            }
          }
          //Mark the current row, col.
          grid[row][col].isTarget = true;
        }
      }
    }
    else if(mode=="setWall"){
      //If current cell is neither a start, nor a target nor a virus:
      if(!grid[row][col].isStart && !grid[row][col].isTarget && !(grid[row][col].weight>1)){
        //If current cell is wall
        if(grid[row][col].isWall) grid[row][col].isWall = false;
        //Else
        else grid[row][col].isWall = true;
      }
    }
    else if(mode=="setVirus"){
      //If current cell is neither a start, nor a target nor a wall:
      if(!grid[row][col].isStart && !grid[row][col].isTarget && !grid[row][col].isWall){
        if(grid[row][col].weight>1) grid[row][col].weight = 1;
        else grid[row][col].weight = 5;
      }
    }
    
    //Manually re-render the component for updating grid
    manuallyTriggerUpdate();

  }
  // console.log(useParams());

  return (
    <>
        <div style={{ '--rows': numRows, '--cols': numCols }} className="grid-container">
            {rows}
        </div>
    </>
  );
};

export default Grid;