import React, { useEffect, useState } from 'react';
import "./css/Grid.css";
import { useParams } from '../context/context';
import { BsGeoAlt, BsGeo, BsBricks, BsVirus
        } from "react-icons/bs";
import { getUpdatedGrid } from '../utils/updatingGrid';

const Grid = ({ numRows, numCols }) => {
  const { mode, grid, setGrid } = useParams();
  const [rows, setRows] = useState([]);
  const [gridFlag, setGridFlag] = useState(0);

  useEffect(() => {
  // Generate rows and cells for the grid
  const tempRows = []

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
      tempRows.push(<div key={i} className="grid-row">{cells}</div>);
    }
    setRows(tempRows);
  }, [gridFlag])

  const handleClick = (e) => {
      //Use e.currentTarget to get the grid-cell div and not the logo inside it.
      const id = e.currentTarget.id;
      const dimensions = id.split('-');
      const row = dimensions[0], col = dimensions[1];
      let flags = [false, false, false, false];

      if(mode=="setStart") {
        flags[0]=true;
      }else if(mode=="setTarget") {
        flags[1]=true;
      }else if(mode=="setWall") {
        flags[2]=true;
      }else if(mode=="setVirus") {
        flags[3]=true;
      }

      setGrid(getUpdatedGrid(grid, row, col, flags));
      setGridFlag(1-gridFlag);
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