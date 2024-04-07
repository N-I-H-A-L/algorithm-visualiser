import React, { useState, useEffect } from "react";
import { useParams } from "../context/context";
import "../css/NavbarS.css";
import { GrVolume } from "react-icons/gr";
import { generateRandomArray } from "../utils/randomArray";

const NavbarS = () => {
    const { arraySize, setArraySize, sortingAlgo, setSortingAlgo, array, setArray, sortingSpeed, setSortingSpeed, playSorting, setPlaySorting } = useParams();
    const [delay, setDelay] = useState(1000);

    useEffect(() => {
        setDelay(1000-sortingSpeed);
    }, [sortingSpeed])

    useEffect(() => {
        if(playSorting) {
            document.getElementById("newArrBtn").disabled = true;
            document.getElementById("visualizeBtn").disabled = true;
            document.getElementById("size").disabled = true;
            document.getElementById("speed").disabled = true;
        } else {
            document.getElementById("newArrBtn").disabled = false;
            document.getElementById("visualizeBtn").disabled = false;
            document.getElementById("size").disabled = false;
            document.getElementById("speed").disabled = false;
        }
    }, [playSorting])

    async function timeDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleAlgorithmChange = (e) =>{
        setSortingAlgo(e.target.value);
    }

    const generateNewArray = () => {
        setArray(generateRandomArray(arraySize));        
        const n = arraySize;
        let i;

        for (i = 0; i < n; i++) {
            document.getElementById(`bar-${i}`).classList.remove('completed');
        }
    }

    const handleSizeChange = (e) => {
        for(let i = 0; i<arraySize; i++){
            let element = document.getElementById(`bar-${i}`);
            if (element.classList.contains("completed")) {
                element.classList.remove("completed");
            }
        }
        setArraySize(e.target.value);
    }
    
    const handleVisualise = () => {
        if(sortingAlgo=="none") alert("Please choose an algorithm");
        if(sortingAlgo=='bsort'){
            for(let i = 0; i<arraySize; i++){
                let element = document.getElementById(`bar-${i}`);
                if (element.classList.contains("completed")) {
                    element.classList.remove("completed");
                }
            }
            setArray(prev=> prev);
            bubbleSort(arraySize);
        }
    }

    const bubbleSort = async (n) => {
        setPlaySorting(true);

        let tempArray = array;
        let i, j, k;
        for (i = 0; i < n - 1; i++) {
          for (j = 0; j < n - i - 1; j++) {
            document.getElementById(`bar-${j}`).classList.add('under-evaluation');
            document.getElementById(`bar-${j+1}`).classList.add('under-evaluation');
            await timeDelay(delay);

            if (tempArray[j] > tempArray[j + 1]) {
                const temp = tempArray[j];
                tempArray[j] = tempArray[j + 1];
                tempArray[j + 1] = temp;
                setArray(prevArray => {
                    const newArray = [...tempArray];
                    return newArray;
                });
                await timeDelay(delay);
            }
            document.getElementById(`bar-${j}`).classList.remove('under-evaluation');
            document.getElementById(`bar-${j+1}`).classList.remove('under-evaluation');
          }

          document.getElementById(`bar-${n-i-1}`).classList.add('completed');
        }
        document.getElementById(`bar-0`).classList.add('completed');
        setArray(tempArray);

        setPlaySorting(false);
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
                            <button className="new-array-btn" id="newArrBtn" onClick={()=> generateNewArray()}>New Array</button>
                        </li>
                        <li className="sorting-nav-btns" id="size-controller">
                            <label htmlFor="size">Size</label>
                            <input type="range" min="10" max="100" value={arraySize} id="size" onChange={(e) => handleSizeChange(e)} />
                        </li>
                        <li className="sorting-nav-btns" id="speed-controller">
                            <label htmlFor="speed">Speed</label>
                            <input type="range" min="10" max="1000" value={sortingSpeed} id="speed" onChange={(e) => setSortingSpeed(e.target.value)} />
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
                            <button className="visualize-btn" id="visualizeBtn" onClick={()=> handleVisualise()}>Visualize!</button>
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