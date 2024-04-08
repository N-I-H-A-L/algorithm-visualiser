import React from 'react';
import "../css/SortVisualiser.css";
import { useParams } from "../context/context";

const SortVisualiser = () => {
  const { bars } = useParams();

  const displayBars = () => {
    const tempBars = [];
    const n = bars.length;

    for (let i = 0; i < n; i++) {
      tempBars.push(
        <div
          key={i}
          id={`bar-${i}`}
          className={bars[i].props.join(" ")}
          style={{
            height: `calc((70vh / 1000) * ${bars[i].element})`,
            width: `calc(80vw / ${n})`
          }}
        >{n < 40 ? bars[i].element : ''}</div>
      )
    }
    return tempBars;
  }

  return (
    <>
      <div className="sort-visualiser-main">
        <div className="bar-container">
          {displayBars()}
        </div>
      </div>
    </>
  )
}

export default SortVisualiser
