import React, { useState } from "react";
import "./css/Navbar.css";
import { useParams } from "../context/context";
import { BsGeoAlt, BsGeo, BsBricks, 
         BsVirus, BsArrowCounterclockwise, 
         BsCaretRight 
       } from "react-icons/bs";

const Navbar = () => {
    const { algo, setAlgo, mode, setMode, reset, setReset, play, setPlay, grid, editing, setEditing } = useParams();
    const [delay, setDelay] = useState(100);

    const handleSelectChange = (e) => {
        setAlgo(e.target.value);
    }

    const handleModeChange = (e) => {
        //Use currentTarget to get "button" element else it will retrieve the SVG element.
        const modeVal = "set" + e.currentTarget.title;
        if(mode == null) setMode(modeVal);
        else {
            if (mode == modeVal)  setMode(null);
            else setMode(modeVal);
        }
    }

    const handleDelayChange = (e) => {
        setDelay(e.target.value);
    }

    const getStartAndTarget = () => {
        let start = null, target = null;
        for(let i = 0; i<grid.length; i++){
            for(let j = 0; j<grid[i].length; j++){
                if(grid[i][j].isStart) start = {row: i, col: j};
                else if(grid[i][j].isTarget) target = {row: i, col: j};
            }
        }

        return [start, target];
    }

    async function timeDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const bfs = async (start, target) => {
        let queue = [];
        queue.push([start, 0]);
        let level = 0;
        const targetRow = target.row, targetCol = target.col;
        while(queue.length){
            let front = queue.shift();
            const {row, col} = front[0];
            let currLevel = front[1];
            
            if(grid[row][col].isVisited || grid[row][col].isWall) continue;
            grid[row][col].isVisited = true;

            if(level!=currLevel){
                //re-render grid
                setEditing(prevEditing => !prevEditing);
                await timeDelay(delay);
                level = currLevel + 1;
            }
            
            if(row===targetRow && col===targetCol) break;
            
            if(row+1<grid.length) queue.push([{row: row+1, col}, currLevel+1]);
            if(row-1>=0) queue.push([{row: row-1, col}, currLevel+1]);
            if(col+1<grid[0].length) queue.push([{row, col: col+1}, currLevel+1]);
            if(col-1>=0) queue.push([{row, col: col-1}, currLevel+1]);
        }
        await timeDelay(delay);
        setEditing(prevEditing => !prevEditing);
    }

    const handlePlay = () => {
        if(play) return;
        setPlay(true);

        //If algorithm is not chosen.
        if(algo=="" || algo=="none") alert("Please choose an algorithm.");
        const [start, target] = getStartAndTarget();

        //If start and target are not set.
        if(start==null || target==null) alert("Please choose a start and target location.");
        else{
            if(algo=="bfs"){
                bfs(start, target);
            }
            else if(algo=="dfs"){

            }
            else if(algo=="dijkstra"){

            }
        }

        //After running algo set play as false.
        setPlay(false);
    }

    return (
        <>
            <nav className="nav-container">
                <ul className="nav-item-container">
                    <li className="nav-item">
                        <button className={["nav-item-btn", mode=="setStart"?"selected":""].join(" ")} title="Start" onClick={handleModeChange}><BsGeoAlt size={"20px"}/></button>
                    </li>
                    <li className="nav-item">
                        <button className={["nav-item-btn", mode=="setTarget"?"selected":""].join(" ")} title="Target" onClick={handleModeChange}><BsGeo size={"20px"}/></button>
                    </li>
                    <li className="nav-item">
                        <button className={["nav-item-btn", mode=="setWall"?"selected":""].join(" ")} title="Wall" onClick={handleModeChange}><BsBricks size={"20px"}/></button>
                    </li>
                    <li className="nav-item">
                        <button className={["nav-item-btn", mode=="setVirus"?"selected":""].join(" ")} title="Virus" onClick={handleModeChange}><BsVirus size={"20px"}/></button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-item-btn" onClick={() => setReset(!reset)}><BsArrowCounterclockwise title="Restart" size={"20px"} /></button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-item-btn" onClick={() => handlePlay()}><BsCaretRight title="Play" size={"20px"} /></button>
                    </li>
                    <li className="nav-item">
                        <select name="algoSelect" id="algoSelect" value={algo} onChange={(e) => handleSelectChange(e)}>
                            <option id="none" value="none">Select an algorithm:</option>
                            <option id="bfs" value="bfs">BFS</option>
                            <option id="dfs" value="dfs">DFS</option>
                            <option id="dijkstra" value="dijkstra">Dijkstra</option>
                            {/* <option value="bds">BDS</option> */}
                        </select>
                    </li>
                    <li>
                        <input type="number" className="delay-input" placeholder="Set delay" onChange={(e) => handleDelayChange(e)}></input>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;