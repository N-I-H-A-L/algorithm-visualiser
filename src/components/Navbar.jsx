import React from "react";
import "./css/Navbar.css";

const Navbar = () => {

    return (
        <>
            <nav>
                <ul>
                    <li><button>Start</button></li>
                    <li><button>Dest.</button></li>
                    <li><button>Wall</button></li>
                    <li><button>Mines</button></li>
                    <li><button>Restart</button></li>
                    <li><button>Play</button></li>
                    <li>
                        <select name="algoSelect" id="algoSelect">
                            <option value="none">Select an algorithm:</option>
                            <option value="bfs">BFS</option>
                            <option value="dijkstra">Dijkstra</option>
                            <option value="bds">BDS</option>
                        </select>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;