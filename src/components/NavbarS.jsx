import React, { useState, useEffect } from "react";
import { useParams } from "../context/context";
import "../css/NavbarS.css";
import { GrVolume } from "react-icons/gr";
import { generateRandomArray } from "../utils/randomArray";

const NavbarS = () => {
    const { arraySize, setArraySize, sortingAlgo, setSortingAlgo, array, setArray } = useParams();
    const [speed, setSpeed] = useState(0);

    const handleAlgorithmChange = (e) =>{
        setSortingAlgo(e.target.value);
    }   
    
    useEffect(()=>{
        const randomArray = generateRandomArray(arraySize);
        setArray(randomArray);
    }, [arraySize]);

    return (
        <>
            <div className="sorting-nav">
                <div className="sorting-nav-items">
                    <ul>
                        <li className="sorting-nav-btns">
                            <button className="new-array-btn">New Array</button>
                        </li>
                        <li className="sorting-nav-btns" id="size-controller">
                            <label htmlFor="size">Size</label>
                            <input type="range" min="6" max="130" value={arraySize} id="size" onChange={(e) => setArraySize(e.target.value)} />
                        </li>
                        <li className="sorting-nav-btns" id="speed-controller">
                            <label htmlFor="speed">Speed</label>
                            <input type="range" min="0" max="930" value={speed} id="speed" onChange={(e) => setSpeed(e.target.value)} />
                        </li>
                        <li className="sorting-nav-btns">
                            <select name="algo-select" id="algo-select" onChange={(e)=> handleAlgorithmChange(e)}>
                                <option id="none" value="none">Algorithm:</option>
                                <option id="bsort" value="bsort">Bubble Sort</option>
                                <option id="isort" value="isort">Insertion Sort</option>
                                <option id="ssort" value="ssort">Selection Sort</option>
                                <option id="msort" value="msort">Merge Sort</option>
                                <option id="qsort" value="qsort">Quick Sort</option>
                            </select>
                        </li>
                        <li className="sorting-nav-btns">
                            <button className="visualize-btn">Visualize!</button>
                        </li>
                        <li className="sorting-nav-btns"><GrVolume size={30}/></li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default NavbarS;

// import { GrVolumeMute } from "react-icons/gr";
// <GrVolumeMute />