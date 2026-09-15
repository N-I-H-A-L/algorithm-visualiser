import React, { useEffect, useRef } from "react";
import { useParams } from "../context/context";
import "../css/NavbarS.css";
import { getBars } from "../utils/generateBars";
import { BsArrowCounterclockwise, BsStopFill, BsPlayFill } from "react-icons/bs";

const NavbarS = () => {
  const {
    arraySize,
    setArraySize,
    sortingAlgo,
    setSortingAlgo,
    sortingSpeed,
    setSortingSpeed,
    playSorting,
    setPlaySorting,
    bars,
    setBars
  } = useParams();

  const delay = useRef(1000);
  // Cancellation reference to immediately kill ongoing sorting promises
  const currentRunId = useRef(0);

  useEffect(() => {
    delay.current = 500 - sortingSpeed;
  }, [sortingSpeed]);

  useEffect(() => {
    handleReset();
  }, [arraySize]);

  // Cancellable delay helper
  async function timeDelay(ms, runId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (runId !== currentRunId.current) {
          reject(new Error("SORTING_CANCELLED"));
        } else {
          resolve();
        }
      }, ms);
    });
  }

  // Stop current execution and regenerate array
  const handleReset = () => {
    currentRunId.current += 1; // Invalidate current async run immediately
    setPlaySorting(false);
    setBars(getBars([], arraySize));
  };

  // Full page reload helper
  const handleHardRefresh = () => {
    window.location.reload();
  };

  const handleAlgorithmChange = (e) => {
    setSortingAlgo(e.target.value);
  };

  const handleVisualise = async () => {
    if (sortingAlgo === "none" || !sortingAlgo) {
      alert("Please select a sorting algorithm");
      return;
    }

    // Invalidate any past runs and lock into this run ID
    const runId = ++currentRunId.current;
    setPlaySorting(true);

    const initialBars = bars.map(b => ({
      ...b,
      completed: false,
      underEvaluation: false,
      special: false,
      smaller: false
    }));
    setBars(initialBars);

    try {
      if (sortingAlgo === "bsort") await bubbleSort(arraySize, runId);
      else if (sortingAlgo === "isort") await insertionSort(runId);
      else if (sortingAlgo === "ssort") await selectionSort(runId);
      else if (sortingAlgo === "qsort") await quickSort(0, bars.length - 1, runId);
      else if (sortingAlgo === "msort") await mergeSort(0, bars.length - 1, runId);

      if (runId === currentRunId.current) {
        setBars(prev => prev.map(item => ({ ...item, completed: true, underEvaluation: false })));
      }
    } catch (err) {
      if (err.message !== "SORTING_CANCELLED") console.error(err);
    } finally {
      if (runId === currentRunId.current) {
        setPlaySorting(false);
      }
    }
  };

  // --- Sorting Algorithms with Cancellation Checks ---
  const bubbleSort = async (n, runId) => {
    const bubbleArr = bars.map(b => b.element);

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (runId !== currentRunId.current) throw new Error("SORTING_CANCELLED");

        setBars(prev => prev.map((item, idx) => idx === j || idx === j + 1 ? { ...item, underEvaluation: true } : item));
        await timeDelay(delay.current, runId);

        if (bubbleArr[j] > bubbleArr[j + 1]) {
          let temp = bubbleArr[j];
          bubbleArr[j] = bubbleArr[j + 1];
          bubbleArr[j + 1] = temp;
        }

        setBars(prev => prev.map((item, idx) => {
          if (idx === j) return { ...item, element: bubbleArr[j], underEvaluation: false };
          if (idx === j + 1) return { ...item, element: bubbleArr[j + 1], underEvaluation: false };
          return item;
        }));
      }

      setBars(prev => prev.map((item, idx) => (idx === n - 1 - i ? { ...item, completed: true } : item)));
    }
  };

  const insertionSort = async (runId) => {
    let A = bars.map(b => b.element);
    let n = arraySize;

    for (let i = 1; i < n; i++) {
      let key = A[i];
      let j = i - 1;

      while (j >= 0 && A[j] > key) {
        if (runId !== currentRunId.current) throw new Error("SORTING_CANCELLED");

        A[j + 1] = A[j];
        setBars(prev => prev.map((item, idx) => {
          if (idx === j + 1) return { ...item, element: A[j + 1], underEvaluation: true };
          if (idx === j) return { ...item, underEvaluation: true };
          return item;
        }));
        await timeDelay(delay.current, runId);
        j--;
      }

      A[j + 1] = key;
      setBars(prev => prev.map((item, idx) => {
        if (idx === j + 1) return { ...item, element: key, underEvaluation: false };
        if (idx <= i) return { ...item, completed: true, underEvaluation: false };
        return { ...item, underEvaluation: false };
      }));
      await timeDelay(delay.current, runId);
    }
  };

  const selectionSort = async (runId) => {
    let arr = bars.map(b => b.element);

    for (let i = 0; i < arr.length - 1; i++) {
      let min_idx = i;
      setBars(prev => prev.map((item, idx) => idx === min_idx ? { ...item, special: true } : item));
      await timeDelay(delay.current, runId);

      for (let j = i + 1; j < arr.length; j++) {
        if (runId !== currentRunId.current) throw new Error("SORTING_CANCELLED");

        setBars(prev => prev.map((item, idx) => idx === j ? { ...item, underEvaluation: true } : item));
        await timeDelay(delay.current, runId);

        if (arr[j] < arr[min_idx]) {
          const oldMin = min_idx;
          min_idx = j;
          setBars(prev => prev.map((item, idx) => {
            if (idx === oldMin) return { ...item, special: false };
            if (idx === min_idx) return { ...item, special: true };
            return item;
          }));
        }

        setBars(prev => prev.map((item, idx) => idx === j ? { ...item, underEvaluation: false } : item));
      }

      if (min_idx !== i) {
        let temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
      }

      setBars(prev => prev.map((item, idx) => {
        if (idx === i) return { ...item, element: arr[i], completed: true, special: false };
        if (idx === min_idx) return { ...item, element: arr[min_idx], special: false };
        return item;
      }));
    }
  };

  const partition = async (low, high, runId) => {
    let pivot = bars[high].element;
    setBars(prev => prev.map((item, idx) => idx === high ? { ...item, special: true } : item));
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (runId !== currentRunId.current) throw new Error("SORTING_CANCELLED");

      setBars(prev => prev.map((item, idx) => idx === j ? { ...item, underEvaluation: true } : item));
      await timeDelay(delay.current, runId);

      if (bars[j].element < pivot) {
        i++;
        let temp = bars[i].element;
        bars[i].element = bars[j].element;
        bars[j].element = temp;
        setBars([...bars]);
      }
      setBars(prev => prev.map((item, idx) => idx === j ? { ...item, underEvaluation: false } : item));
    }

    let temp = bars[i + 1].element;
    bars[i + 1].element = bars[high].element;
    bars[high].element = temp;
    bars[high].special = false;
    bars[i + 1].completed = true;
    setBars([...bars]);
    await timeDelay(delay.current, runId);
    return i + 1;
  };

  const quickSort = async (low, high, runId) => {
    if (runId !== currentRunId.current) throw new Error("SORTING_CANCELLED");
    if (low < high) {
      let pivot_idx = await partition(low, high, runId);
      await quickSort(low, pivot_idx - 1, runId);
      await quickSort(pivot_idx + 1, high, runId);
    }
  };

  const merge = async (start, mid, end, runId) => {
    let result = [];
    let i = start, j = mid + 1;

    while (i <= mid && j <= end) {
      if (bars[i].element < bars[j].element) {
        result.push(bars[i].element);
        i++;
      } else {
        result.push(bars[j].element);
        j++;
      }
    }
    while (i <= mid) { result.push(bars[i].element); i++; }
    while (j <= end) { result.push(bars[j].element); j++; }

    for (let k = start; k <= end; k++) {
      if (runId !== currentRunId.current) throw new Error("SORTING_CANCELLED");
      bars[k].element = result[k - start];
      bars[k].underEvaluation = true;
    }
    setBars([...bars]);
    await timeDelay(delay.current, runId);

    for (let k = start; k <= end; k++) {
      bars[k].underEvaluation = false;
      bars[k].completed = true;
    }
    setBars([...bars]);
  };

  const mergeSort = async (start, end, runId) => {
    if (runId !== currentRunId.current) throw new Error("SORTING_CANCELLED");
    if (start < end) {
      const mid = Math.floor((start + end) / 2);
      await mergeSort(start, mid, runId);
      await mergeSort(mid + 1, end, runId);
      await merge(start, mid, end, runId);
    }
  };

  return (
    <div className="sorting-control-panel">
      <div className="controls-group">
        <button
          className="btn-control btn-generate"
          onClick={handleReset}
        >
          <BsArrowCounterclockwise size="15" />
          Reset Array
        </button>

        <div className="slider-control">
          <div className="slider-label-row">
            <span>Size</span>
            <span className="slider-val">{arraySize}</span>
          </div>
          <input
            type="range"
            min="10"
            max="80"
            value={arraySize}
            onChange={(e) => setArraySize(Number(e.target.value))}
            disabled={playSorting}
          />
        </div>

        <div className="slider-control">
          <div className="slider-label-row">
            <span>Speed</span>
            <span className="slider-val">{sortingSpeed}</span>
          </div>
          <input
            type="range"
            min="5"
            max="490"
            value={sortingSpeed}
            onChange={(e) => setSortingSpeed(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="action-group">
        <div className="select-container">
          <select
            value={sortingAlgo}
            onChange={handleAlgorithmChange}
            disabled={playSorting}
            className="algo-dropdown"
          >
            <option value="none" disabled>Choose Algorithm...</option>
            <option value="qsort">⚡ Quick Sort (O(N log N))</option>
            <option value="msort">🌊 Merge Sort (O(N log N))</option>
            <option value="isort">📥 Insertion Sort (O(N²))</option>
            <option value="ssort">🎯 Selection Sort (O(N²))</option>
            <option value="bsort">🫧 Bubble Sort (O(N²))</option>
          </select>
        </div>

        {/* Dynamic Action Button: When running, switches to STOP & RESET */}
        {playSorting ? (
          <button
            className="btn-visualize btn-stop"
            onClick={handleReset}
            title="Stop & Refresh Visualizer"
          >
            <BsStopFill size="18" /> Stop & Reset
          </button>
        ) : (
          <button
            className="btn-visualize"
            onClick={handleVisualise}
          >
            <BsPlayFill size="18" /> Visualize!
          </button>
        )}

        {/* Hard Page Refresh button */}
        <button
          className="btn-icon reload-page-btn"
          onClick={handleHardRefresh}
          title="Full Page Reload"
        >
          <BsArrowCounterclockwise size="18" />
        </button>
      </div>
    </div>
  );
};

export default NavbarS;