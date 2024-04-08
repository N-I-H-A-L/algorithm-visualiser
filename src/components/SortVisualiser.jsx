import React from 'react';
import "../css/SortVisualiser.css";
import { useParams } from "../context/context";

const SortVisualiser = () => {
  const { bars } = useParams();

  const generateClasses = (bar) => {
    let classes = "bar ";
    if(bar.underEvaluation){
      classes += "under-evaluation ";
    }
    else if(bar.completed){
      classes += "completed";
    }

    return classes;
  }

  return (
    <>
      <div className="sort-visualiser-main">
        <div className="bar-container">
          {bars.map((bar, idx)=> {
            return <div
                    key={idx}
                    id={`bar-${idx}`}
                    className={generateClasses(bar)}
                    style={{
                      height: `calc((70vh / 1000) * ${bar.element})`,
                      width: `calc(80vw / ${bars.length})`
                    }}
                  >{bars.length < 40 ? bar.element : ''}</div>
          })}
        </div>
      </div>
    </>
  )
}

export default SortVisualiser
