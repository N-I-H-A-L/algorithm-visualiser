import React from 'react';
import SharedNavbar from '../components/SharedNavbar';
import NavbarS from '../components/NavbarS';
import SortVisualiser from '../components/SortVisualiser';
import '../css/SortingPage.css';

const Sorting = () => {
  return (
    <div className="sorting-page-layout">
      {/* Universal top header */}
      <SharedNavbar />

      {/* Control Toolbar */}
      <NavbarS />

      {/* Canvas & Legend Area */}
      <main className="sorting-content">
        <SortVisualiser />

        {/* Dynamic visual legend */}
        <div className="visualizer-legend">
          <div className="legend-item">
            <span className="legend-box default-box"></span>
            <span>Unsorted</span>
          </div>
          <div className="legend-item">
            <span className="legend-box eval-box"></span>
            <span>Comparing / Active</span>
          </div>
          <div className="legend-item">
            <span className="legend-box special-box"></span>
            <span>Pivot / Minimum</span>
          </div>
          <div className="legend-item">
            <span className="legend-box smaller-box"></span>
            <span>Swapping</span>
          </div>
          <div className="legend-item">
            <span className="legend-box completed-box"></span>
            <span>Sorted</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Sorting;