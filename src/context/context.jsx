import { useContext, useEffect, useRef, useState, createContext } from "react";
import { getGrid } from "../utils/startingGrid";

const context = createContext();

export const useParams = () => {
    return useContext(context);
}

export const ParamsProvider = ({children}) => {

    const [mode, setMode] = useState(null);
    const [algo, setAlgo] = useState('');
    const [grid, setGrid] = useState(getGrid(25, 42));
    const [editing, setEditing] = useState(false);
    const [reset, setReset] = useState(false);
    const [play, setPlay] = useState(false);
    const startLocation = useRef({x: 12, y: 21});
    const targetLocation = useRef({x: 8, y: 21});

    useEffect(() => {
        restart();
    }, [reset])

    function restart() {
        setGrid(getGrid(25, 42));
    }

    return (
        <div>
            <context.Provider value={{
                mode, setMode,
                algo, setAlgo,
                grid, setGrid,
                reset, setReset,
                play, setPlay,
                editing, setEditing,
                startLocation,
                targetLocation,
            }}>
                {children}
            </context.Provider>
        </div>
    );
}