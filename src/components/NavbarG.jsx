import React, { useState, useRef, useEffect } from "react";
import "../css/NavbarG.css";
import { useParams } from "../context/context";
import { 
  BsGeoAltFill, 
  BsGeoFill, 
  BsBricks, 
  BsVirus, 
  BsArrowCounterclockwise, 
  BsPlayFill,
  BsStopFill
} from "react-icons/bs";
import { PriorityQueue } from '@datastructures-js/priority-queue';

const NavbarG = () => {
  const { algo, setAlgo, mode, setMode, reset, setReset, grid, setEditing, setCost } = useParams();
  const [delay, setDelay] = useState(25);
  const [playState, setPlayState] = useState(false);

  // Cancellation token to immediately abort ongoing graph algorithms
  const currentRunId = useRef(0);

  // FIX: Ensure 'bfs' is set by default in context on initial mount
  useEffect(() => {
    if (!algo || algo === "none" || algo === "") {
      setAlgo("bfs");
    }
  }, [algo, setAlgo]);

  const handleSelectChange = (e) => {
    setAlgo(e.target.value);
  };

  const handleModeChange = (selectedMode) => {
    if (mode === selectedMode) setMode(null);
    else setMode(selectedMode);
  };

  const getStartAndTarget = () => {
    let start = null, target = null;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j].isStart) start = { row: i, col: j };
        else if (grid[i][j].isTarget) target = { row: i, col: j };
      }
    }
    return [start, target];
  };

  // Cancellable delay helper
  async function timeDelay(ms, runId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (runId !== currentRunId.current) {
          reject(new Error("GRAPH_CANCELLED"));
        } else {
          resolve();
        }
      }, ms);
    });
  }

  // Single unified Stop & Reset handler
  const handleStopAndReset = () => {
    currentRunId.current += 1; // Aborts active async traversal immediately
    setPlayState(false);
    setMode(null);
    if (setCost) setCost(-1);
    setReset(!reset); // Triggers clean grid rebuild in context
  };

  const initializePi = () => {
    const pi = [];
    const [numRows, numCols] = [grid.length, grid[0].length];
    for (let i = 0; i < numRows; i++) {
      const cols = [];
      for (let j = 0; j < numCols; j++) {
        cols.push(null);
      }
      pi.push(cols);
    }
    return pi;
  };

  const tracePath = async (path, runId) => {
    if (path.length < 2) {
      alert("No valid path exists between Start and Target!");
      handleStopAndReset();
      return;
    }

    let calculatedCost = -1;
    for (let i = path.length - 1; i >= 0; i--) {
      if (runId !== currentRunId.current) throw new Error("GRAPH_CANCELLED");

      const { row, col } = path[i];
      grid[row][col].isVisited = false;
      grid[row][col].isPath = true;
      calculatedCost += grid[row][col].weight || 1;
      setEditing(prev => !prev);
      await timeDelay(delay * 1.5, runId);
    }
    if (setCost) setCost(calculatedCost);
  };

  const getPath = (pi, start, target) => {
    const path = [];
    let curr = target;
    while (curr && (curr.row !== start.row || curr.col !== start.col)) {
      path.push(curr);
      curr = pi[curr.row][curr.col];
      if (!curr) break;
    }
    if (curr) path.push(start);
    return path;
  };

  const getPathMap = (hashMap, target) => {
    const path = [];
    path.push(target);
    let descendant = hashMap.get(JSON.stringify(target));
    if (!descendant) return path;
    let parsed = JSON.parse(descendant);
    while (parsed.row !== -1 && parsed.col !== -1) {
      path.push(parsed);
      descendant = hashMap.get(JSON.stringify(parsed));
      if (!descendant) break;
      parsed = JSON.parse(descendant);
    }
    return path;
  };

  const bfs = async (start, target, runId) => {
    let queue = [[start, 0]];
    const pi = initializePi();
    let level = 0;

    while (queue.length) {
      if (runId !== currentRunId.current) throw new Error("GRAPH_CANCELLED");

      let front = queue.shift();
      const { row, col } = front[0];
      let currLevel = front[1];

      if (grid[row][col].isVisited || grid[row][col].isWall) continue;
      grid[row][col].isVisited = true;

      if (level !== currLevel) {
        setEditing(prev => !prev);
        await timeDelay(delay, runId);
        level = currLevel + 1;
      }

      if (row === target.row && col === target.col) break;

      const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
      for (const [dr, dc] of directions) {
        const nr = row + dr, nc = col + dc;
        if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && !grid[nr][nc].isVisited && !grid[nr][nc].isWall) {
          queue.push([{ row: nr, col: nc }, currLevel + 1]);
          if (!pi[nr][nc]) pi[nr][nc] = front[0];
        }
      }
    }
    setEditing(prev => !prev);
    const path = getPath(pi, start, target);
    await tracePath(path, runId);
  };

  const dfs = async (start, target, runId) => {
    const stk = [start];
    const pi = initializePi();

    while (stk.length) {
      if (runId !== currentRunId.current) throw new Error("GRAPH_CANCELLED");

      let top = stk.pop();
      const { row, col } = top;

      if (!grid[row][col].isVisited && !grid[row][col].isWall) {
        grid[row][col].isVisited = true;
        setEditing(prev => !prev);
        await timeDelay(delay, runId);

        if (row === target.row && col === target.col) break;

        const directions = [[-1, 0], [0, -1], [1, 0], [0, 1]];
        for (const [dr, dc] of directions) {
          const nr = row + dr, nc = col + dc;
          if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && !grid[nr][nc].isVisited && !grid[nr][nc].isWall) {
            stk.push({ row: nr, col: nc });
            pi[nr][nc] = top;
          }
        }
      }
    }
    const path = getPath(pi, start, target);
    await tracePath(path, runId);
  };

  const dijkstra = async (start, target, runId) => {
    const rows = grid.length, cols = grid[0].length;
    const distance = new Array(rows * cols).fill(1e9);
    const pq = new PriorityQueue((a, b) => (a[0] < b[0] ? -1 : 1));
    const hashMap = new Map();

    pq.enqueue([0, start, { row: -1, col: -1 }]);

    while (!pq.isEmpty()) {
      if (runId !== currentRunId.current) throw new Error("GRAPH_CANCELLED");

      const minElement = pq.dequeue();
      const currDist = minElement[0];
      const { row, col } = minElement[1];
      const parent = minElement[2];
      const cell = row * cols + col;

      if (distance[cell] <= currDist || grid[row][col].isWall) continue;
      distance[cell] = currDist;

      grid[row][col].isVisited = true;
      setEditing(prev => !prev);
      await timeDelay(delay, runId);

      hashMap.set(JSON.stringify(minElement[1]), JSON.stringify(parent));
      if (row === target.row && col === target.col) break;

      const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
      for (const [dr, dc] of directions) {
        const nr = row + dr, nc = col + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !grid[nr][nc].isWall) {
          const weight = grid[nr][nc].weight || 1;
          pq.enqueue([currDist + weight, { row: nr, col: nc }, { row, col }]);
        }
      }
    }
    const path = getPathMap(hashMap, target);
    await tracePath(path, runId);
  };

  const handlePlay = async () => {
    if (playState) return;

    // Default to 'bfs' if user hasn't touched the select dropdown
    const selectedAlgo = algo && algo !== "none" ? algo : "bfs";
    if (algo !== selectedAlgo) {
      setAlgo("bfs");
    }

    const [start, target] = getStartAndTarget();
    if (!start || !target) {
      alert("Please place both a Start and Target node on the grid.");
      return;
    }

    const runId = ++currentRunId.current;
    setPlayState(true);
    setMode(null);

    try {
      if (selectedAlgo === "bfs") await bfs(start, target, runId);
      else if (selectedAlgo === "dfs") await dfs(start, target, runId);
      else if (selectedAlgo === "dijkstra") await dijkstra(start, target, runId);
    } catch (err) {
      if (err.message !== "GRAPH_CANCELLED") console.error(err);
    } finally {
      if (runId === currentRunId.current) {
        setPlayState(false);
      }
    }
  };

  return (
    <div className="graph-toolbar">
      {/* Placement Tools */}
      <div className="toolbar-section">
        <span className="section-title">Tools</span>
        <div className="mode-btn-group">
          <button
            className={`tool-btn start-tool ${mode === 'setStart' ? 'active' : ''}`}
            title="Place Start Node"
            onClick={() => handleModeChange('setStart')}
            disabled={playState}
          >
            <BsGeoAltFill />
            <span>Start</span>
          </button>

          <button
            className={`tool-btn target-tool ${mode === 'setTarget' ? 'active' : ''}`}
            title="Place Target Node"
            onClick={() => handleModeChange('setTarget')}
            disabled={playState}
          >
            <BsGeoFill />
            <span>Target</span>
          </button>

          <button
            className={`tool-btn wall-tool ${mode === 'setWall' ? 'active' : ''}`}
            title="Draw Walls"
            onClick={() => handleModeChange('setWall')}
            disabled={playState}
          >
            <BsBricks />
            <span>Wall</span>
          </button>

          {(algo === "dijkstra") && (
            <button
              className={`tool-btn weight-tool ${mode === 'setVirus' ? 'active' : ''}`}
              title="Add Node Weight"
              onClick={() => handleModeChange('setVirus')}
              disabled={playState}
            >
              <BsVirus />
              <span>Weight</span>
            </button>
          )}
        </div>
      </div>

      {/* Algorithm Config & Controls */}
      <div className="toolbar-section execution-section">
        <div className="algo-select-wrapper">
          <select
            id="algoSelect"
            value={algo && algo !== "none" ? algo : "bfs"}
            onChange={handleSelectChange}
            disabled={playState}
            className="modern-select"
          >
            <option value="bfs">Breadth-First Search (Shortest, Unweighted)</option>
            <option value="dfs">Depth-First Search (Exploratory)</option>
            <option value="dijkstra">Dijkstra's Algorithm (Weighted)</option>
          </select>
        </div>

        {/* Speed Slider */}
        <div className="speed-slider-unit">
          <label>Delay ({delay}ms)</label>
          <input
            type="range"
            min="5"
            max="120"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
          />
        </div>

        {/* Play / Stop Primary Button */}
        {playState ? (
          <button
            className="btn-play-run btn-stop-graph"
            onClick={handleStopAndReset}
            title="Stop current execution & reset"
          >
            <BsStopFill size="18px" /> Stop
          </button>
        ) : (
          <button
            className="btn-play-run"
            onClick={handlePlay}
          >
            <BsPlayFill size="20px" /> Visualize Path
          </button>
        )}

        {/* Single Clean Reset Button */}
        <button
          className="btn-icon reset-btn"
          title="Reset Grid"
          onClick={handleStopAndReset}
        >
          <BsArrowCounterclockwise size="18px" />
        </button>
      </div>
    </div>
  );
};

export default NavbarG;