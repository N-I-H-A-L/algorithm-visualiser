import React, { useState } from "react";
import "./css/Navbar.css";
import { useParams } from "../context/context";
import { BsGeoAlt, BsGeo, BsBricks, 
         BsVirus, BsArrowCounterclockwise, 
         BsCaretRight 
       } from "react-icons/bs";

const Navbar = () => {
    const { algo, setAlgo, setMode } = useParams();

    const handleSelectChange = (e) => {
        setAlgo(e.target.value);
    }

    const handleModeChange = (e) => {
        //Use currentTarget to get "button" element else it will retrieve the SVG element.
        setMode("set" + e.currentTarget.title);
    }

    return (
        <>
            <nav className="nav-container">
                <ul className="nav-item-container">
                    <li className="nav-item">
                        <button className="nav-item-btn" title="Start" onClick={handleModeChange}><BsGeoAlt size={"20px"}/></button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-item-btn" title="Destination" onClick={handleModeChange}><BsGeo size={"20px"}/></button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-item-btn" title="Wall" onClick={handleModeChange}><BsBricks size={"20px"}/></button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-item-btn" title="Virus" onClick={handleModeChange}><BsVirus size={"20px"}/></button>
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