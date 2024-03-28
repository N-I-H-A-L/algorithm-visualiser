import React from "react";
import "./css/Navbar.css";

import { BsGeoAlt, BsGeo, BsBricks, 
         BsVirus, BsArrowCounterclockwise, 
         BsCaretRight 
        } from "react-icons/bs";


const Navbar = () => {

    return (
        <>
            <nav className="nav-container">
                <ul className="nav-item-container">
                    <li className="nav-item">
                        <button className="nav-item-btn"><BsGeoAlt title="Start" size={"20px"} /></button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-item-btn"><BsGeo title="Destination" size={"20px"} /></button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-item-btn"><BsBricks title="Wall" size={"20px"} /></button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-item-btn"><BsVirus title="Virus" size={"20px"} /></button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-item-btn"><BsArrowCounterclockwise title="Restart" size={"20px"} /></button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-item-btn"><BsCaretRight title="Play" size={"20px"} /></button>
                    </li>
                    <li className="nav-item">
                        <select name="algoSelect" id="algoSelect">
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