import { useContext, useEffect, useState, createContext } from "react";
import { getGrid } from "../utils/startingGrid";

const context = createContext();

export const useParams = () => {
    return useContext(context);
}

export const ParamsProvider = ({children}) => {

    const [mode, setMode] = useState(null);
    const [algo, setAlgo] = useState('');
    const [editing, setEditing] = useState(0);
    const [reset, setReset] = useState(false);
    const [play, setPlay] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [rows, setRows] = useState(25);
    const [cols, setCols] = useState(42);
    const [grid, setGrid] = useState(getGrid(rows, cols));
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
    }

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
                startLocation,
                targetLocation,
            }}>
                {children}
            </context.Provider>
        </div>
    );
}

//List of Modes
//setStart, setDestination, setWall, setVirus

//List of Algos
//bfs, dfs, dijkstra