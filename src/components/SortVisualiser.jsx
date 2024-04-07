import React from 'react';
import "../css/SortVisualiser.css";
import { useParams } from "../context/context";

const SortVisualiser = () => {
  const { array, arraySize } = useParams();
  const bars = [];

  for (let i = 0; i < arraySize; i++) {
    bars.push(
      <div
        key={i}
        id={`bar-${i}`}
        className='bar'
        style={{
          height: `calc((70vh / 1000) * ${array[i]})`,
          width: `calc(80vw / ${arraySize})`
        }}
      >{arraySize < 40 ? array[i] : ''}</div>
    )
  }

  return (
    <>
      <div className="sort-visualiser-main">
        <div className="bar-container">
          {bars}
        </div>
      </div>
    </>
  )
}

export default SortVisualiser
