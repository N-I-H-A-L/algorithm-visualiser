import React, { useState, useEffect } from "react";
import { useParams } from "../context/context";
import "../css/NavbarS.css";
import { GrVolume } from "react-icons/gr";
import { generateRandomArray } from "../utils/randomArray";

const NavbarS = () => {
    const { arraySize, setArraySize, sortingAlgo, setSortingAlgo, array, setArray } = useParams();
    const [speed, setSpeed] = useState(0);

    async function timeDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleAlgorithmChange = (e) =>{
        setSortingAlgo(e.target.value);
    }

    const generateNewArray = () => {
        setArray(generateRandomArray(arraySize));
    }
    

    const handleVisualise = () => {
        if(sortingAlgo=='bsort') bubbleSort(arraySize);
    }

    const bubbleSort = async (n) => {
        let tempArray = array;
        let i, j, k;
        for (i = 0; i < n - 1; i++) {
          for (j = 0; j < n - i - 1; j++) {
            document.getElementById(`bar-${j}`).classList.add('under-evaluation');
            document.getElementById(`bar-${j+1}`).classList.add('under-evaluation');
            await timeDelay(500);

            if (tempArray[j] > tempArray[j + 1]) {
                const temp = tempArray[j];
                tempArray[j] = tempArray[j + 1];
                tempArray[j + 1] = temp;
                setArray(prevArray => {
                    const newArray = [...tempArray]; 
                    return newArray;
                });
                await timeDelay(500);
            }
            document.getElementById(`bar-${j}`).classList.remove('under-evaluation');
            document.getElementById(`bar-${j+1}`).classList.remove('under-evaluation');
          }

          document.getElementById(`bar-${n-i-1}`).classList.add('completed');
        }
        document.getElementById(`bar-0`).classList.add('completed');
        setArray(tempArray);
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
                            <button className="new-array-btn" onClick={()=> generateNewArray()}>New Array</button>
                        </li>
                        <li className="sorting-nav-btns" id="size-controller">
                            <label htmlFor="size">Size</label>
                            <input type="range" min="10" max="100" value={arraySize} id="size" onChange={(e) => setArraySize(e.target.value)} />
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
                            <button className="visualize-btn" onClick={()=> handleVisualise()}>Visualize!</button>
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