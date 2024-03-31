import React from "react";
import "./css/Navbar.css";
import { useParams } from "../context/context";
import { BsGeoAlt, BsGeo, BsBricks, 
         BsVirus, BsArrowCounterclockwise, 
         BsCaretRight 
       } from "react-icons/bs";

const Navbar = () => {
    const { algo, setAlgo, mode, setMode, setReset, setPlay } = useParams();

    const handleSelectChange = (e) => {
        setAlgo(e.target.value);
    }

    const handleModeChange = (e) => {
        //Use currentTarget to get "button" element else it will retrieve the SVG element.
        const modeVal = "set" + e.currentTarget.title;
        if(mode == null) {
            setMode(modeVal);
        } else {
            if (mode == modeVal)  setMode(null);
            else {setMode(modeVal)}
        }
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
                        <button className="nav-item-btn" onClick={() => {setReset(true)}}><BsArrowCounterclockwise title="Restart" size={"20px"} /></button>
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