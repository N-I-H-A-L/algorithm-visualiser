import React, { useEffect } from 'react';
import SharedNavbar from '../components/SharedNavbar';
import NavbarG from '../components/NavbarG';
import Grid from '../components/Grid';
import CostBox from '../components/Costbox';
import { useParams } from '../context/context';
import '../css/GraphsPage.css';

function Graphs() {
  const { windowWidth, setWindowWidth, rows, setRows, cols, setCols, algo, cost } = useParams();

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setWindowWidth]);

  useEffect(() => {
    if (windowWidth < 800) {
      setRows(18);
      setCols(15);
    } else if (windowWidth < 1200) {
      setRows(22);
      setCols(30);
    } else {
      setRows(22);
      setCols(44);
    }
  }, [windowWidth, setRows, setCols]);

  return (
    <div className="graphs-page-layout">
      {/* Universal Top Nav */}
      <SharedNavbar />

      {/* Pathfinding Controls & Tool Selection */}
      <NavbarG />

      {/* Grid Canvas & Interactive Panel */}
      <main className="graphs-content">
        <div className="grid-meta-bar">
          <div className="guide-pill">
            <span className="dot pulse" />
            <span>Select a tool above, then click cells to place <strong>Start</strong>, <strong>Target</strong>, <strong>Walls</strong>, or <strong>Weights</strong>.</span>
          </div>

          {algo === 'dijkstra' && cost > -1 && (
            <CostBox cost={cost} />
          )}
        </div>

        <div className="grid-outer-frame">
          <Grid numRows={rows} numCols={cols} />
        </div>

        {/* Status Legend */}
        <div className="graph-legend">
          <div className="legend-entry">
            <span className="legend-swatch start-swatch" />
            <span>Start</span>
          </div>
          <div className="legend-entry">
            <span className="legend-swatch target-swatch" />
            <span>Target</span>
          </div>
          <div className="legend-entry">
            <span className="legend-swatch wall-swatch" />
            <span>Wall</span>
          </div>
          <div className="legend-entry">
            <span className="legend-swatch weight-swatch" />
            <span>Weight (Virus)</span>
          </div>
          <div className="legend-entry">
            <span className="legend-swatch visited-swatch" />
            <span>Visited</span>
          </div>
          <div className="legend-entry">
            <span className="legend-swatch path-swatch" />
            <span>Shortest Path</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Graphs;