import React from 'react';
import "../css/Grid.css";
import { useParams } from '../context/context';
import { BsGeoAltFill, BsGeoFill, BsVirus } from "react-icons/bs";
import { getUpdatedGrid } from '../utils/updatingGrid';

const Grid = ({ numRows, numCols }) => {
  const { mode, grid, editing, setEditing } = useParams();

  const handleClick = (row, col) => {
    let flags = [false, false, false, false];

    if (mode === "setStart") flags[0] = true;
    else if (mode === "setTarget") flags[1] = true;
    else if (mode === "setWall") flags[2] = true;
    else if (mode === "setVirus") flags[3] = true;

    getUpdatedGrid(grid, row, col, flags);
    setEditing(prev => !prev);
  };

  return (
    <div
      className="grid-container"
      style={{
        gridTemplateColumns: `repeat(${numCols}, 26px)`,
        gridTemplateRows: `repeat(${numRows}, 26px)`
      }}
    >
      {grid.map((rowArr, i) =>
        rowArr.map((cell, j) => {
          let cellClasses = ['grid-cell'];
          if (cell.isWall) cellClasses.push('cell-wall');
          if (cell.isVisited) cellClasses.push('cell-visited');
          if (cell.isPath) cellClasses.push('cell-path');
          if (cell.isStart) cellClasses.push('cell-start');
          if (cell.isTarget) cellClasses.push('cell-target');

          return (
            <div
              id={`${i}-${j}`}
              key={`${i}-${j}`}
              className={cellClasses.join(' ')}
              onClick={() => handleClick(i, j)}
            >
              {cell.isStart && <BsGeoAltFill className="cell-icon icon-start" />}
              {cell.isTarget && <BsGeoFill className="cell-icon icon-target" />}
              {cell.weight > 1 && !cell.isStart && !cell.isTarget && (
                <BsVirus className="cell-icon icon-weight" />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Grid;