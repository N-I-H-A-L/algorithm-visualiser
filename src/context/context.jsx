import { useContext, useEffect, useState, createContext } from "react";
import { getGrid } from "../utils/startingGrid";

const context = createContext();

export const useParams = () => {
    return useContext(context);
}

export const ParamsProvider = ({children}) => {

    // For Graph Algorithms
    const [mode, setMode] = useState(null);
    const [algo, setAlgo] = useState('');
    const [editing, setEditing] = useState(0);
    const [reset, setReset] = useState(false);
    const [play, setPlay] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [rows, setRows] = useState(25);
    const [cols, setCols] = useState(42);
    const [grid, setGrid] = useState(getGrid(rows, cols));
    const [cost, setCost] = useState(0);
    let startLocation = {x: Math.floor(rows/2), y: Math.floor(cols/2)};
    let targetLocation = {x: Math.floor(rows/2 - 4), y: Math.floor(cols/2)};

    useEffect(() => {
        restart();
    }, [reset])

    useEffect(() => {
        setGrid(getGrid(rows, cols));
        startLocation = {x: Math.floor(rows/2), y: Math.floor(cols/2)};
        targetLocation = {x: Math.floor(rows/2 - 4), y: Math.floor(cols/2)};
    }, [rows, cols]);

    function restart() {
        setGrid(getGrid(rows, cols));
        setCost(0);
    }

    // For Sorting Algorithms
    const [arraySize, setArraySize] = useState(6);
    const [array, setArray] = useState([]);
    const [sortingAlgo, setSortingAlgo] = useState("none");
    const [playSorting, setPlaySorting] = useState(false);

    return (
        <div>
            <context.Provider value={{
                mode, setMode,
                algo, setAlgo,
                grid, setGrid,
                editing, setEditing,
                reset, setReset,
                play, setPlay,
                windowWidth, setWindowWidth,
                rows, setRows,
                cols, setCols,
                cost, setCost,
                startLocation,
                targetLocation,

                arraySize, setArraySize,
                array, setArray,
                sortingAlgo, setSortingAlgo,
                playSorting, setPlaySorting,
            }}>
                {children}
            </context.Provider>
        </div>
    );
}