import React, { useEffect, useState } from 'react';
import "../css/SortVisualiser.css";
import { useParams } from "../context/context";

const SortVisualiser = () => {
  const { bars } = useParams();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const shouldShowLabel = () => {
    if (screenWidth < 768) return bars.length <= 15;
    if (screenWidth < 1200) return bars.length <= 30;
    return bars.length <= 45;
  };

  const getBarClass = (bar) => {
    let classes = ['sort-bar'];
    if (bar.underEvaluation) classes.push('bar-evaluating');
    if (bar.completed) classes.push('bar-completed');
    if (bar.special) classes.push('bar-special');
    if (bar.smaller) classes.push('bar-smaller');
    return classes.join(' ');
  };

  return (
    <div className="sort-stage-wrapper">
      <div className="sort-canvas-container">
        {bars && bars.map((bar, idx) => (
          <div
            key={idx}
            id={`bar-${idx}`}
            className={getBarClass(bar)}
            style={{
              height: `${Math.max((bar.element / 1000) * 100, 4)}%`
            }}
          >
            {shouldShowLabel() && (
              <span className="bar-label">{bar.element}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortVisualiser;