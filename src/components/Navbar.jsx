import React, { useState } from "react";
import "./css/Navbar.css";
import { useParams } from "../context/context";
import { BsGeoAlt, BsGeo, BsBricks, 
         BsVirus, BsArrowCounterclockwise, 
         BsCaretRight 
       } from "react-icons/bs";

const Navbar = () => {
    const { algo, setAlgo, mode, setMode } = useParams();

    const handleSelectChange = (e) => {
        setAlgo(e.target.value);
    }

    const handleModeChange = (e) => {
        setMode("set" + e.target.title);
    }

    return (
        <>
            <nav className="nav-container">
                <ul className="nav-item-container">
                    <li className="nav-item">
                        <button className="nav-item-btn" title="Start" onClick={(e) => handleModeChange(e)}><BsGeoAlt title="Start" size={"20px"}/></button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-item-btn" title="Destination" onClick={(e) => handleModeChange(e)}><BsGeo title="Destination" size={"20px"}/></button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-item-btn" title="Wall" onClick={(e) => handleModeChange(e)}><BsBricks title="Wall" size={"20px"}/></button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-item-btn" title="Virus" onClick={(e) => handleModeChange(e)}><BsVirus title="Virus" size={"20px"}/></button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-item-btn"><BsArrowCounterclockwise title="Restart" size={"20px"} /></button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-item-btn"><BsCaretRight title="Play" size={"20px"} /></button>
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
                </ul>
            </nav>
        </>
    );
}

export default Navbar;