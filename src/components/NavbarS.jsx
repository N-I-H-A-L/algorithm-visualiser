import React, { useState, useEffect } from "react";
import { useParams } from "../context/context";
import "../css/NavbarS.css";
import { GrVolume } from "react-icons/gr";
import { generateRandomArray } from "../utils/randomArray";
import { getBars } from "../utils/generateBars";

const NavbarS = () => {
    const { arraySize, setArraySize, sortingAlgo, setSortingAlgo, 
            array, setArray, sortingSpeed, setSortingSpeed, 
            playSorting, setPlaySorting, bars, setBars } = useParams();
    const [delay, setDelay] = useState(1000);

    useEffect(() => {
        setDelay(1000-sortingSpeed);
    }, [sortingSpeed]);

    async function timeDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleAlgorithmChange = (e) =>{
        setSortingAlgo(e.target.value);
    }

    useEffect(()=> {
        const randomArray = generateRandomArray(arraySize);
        setArray(randomArray);
    }, [arraySize]);

    useEffect(()=> {
        const generateBars = getBars(array, arraySize);
        setBars(generateBars);
    }, [array]);
    
    const handleVisualise = () => {
        if(sortingAlgo=="none") alert("Please choose an algorithm");
        if(sortingAlgo=='bsort'){
            // for(let i = 0; i<arraySize; i++){
            //     let element = document.getElementById(`bar-${i}`);
            //     if (element.classList.contains("completed")) {
            //         element.classList.remove("completed");
            //     }
            // }
            // setArray(prev=> prev);
            // bubbleSort(arraySize);
            bubbleSort(arraySize);
        }
    }

    const bubbleSort = async (n) => {
        setPlaySorting(true);
        const bubbleArr = array;

        let i, j;
        for (i = 0; i < n - 1; i++) {
          for (j = 0; j < n - i - 1; j++) {
            setBars(prev=> {
                prev[j].props.push("under-evaluation");
                prev[j+1].props.push("under-evaluation");
                return prev;
            });

            await timeDelay(delay);
            if (bubbleArr[j] > bubbleArr[j + 1]) {
                let temp = bubbleArr[j];
                bubbleArr[j] = bubbleArr[j+1];
                bubbleArr[j+1] = temp;
                setArray(prev=> {
                    prev = [...bubbleArr];
                    return prev;
                });
            }

            setBars(prev=> {
                prev[j].props.pop();
                prev[j+1].props.pop();
                return prev;
            });
          }
        }

        setPlaySorting(false);
    }

    return (
        <>
            <div className="sorting-nav">
                <div className="sorting-nav-items">
                    <ul>
                        <li className="sorting-nav-btns">
                            <button className="new-array-btn" id="newArrBtn" onClick={()=> generateNewArray()} disabled={playSorting? true: false}>New Array</button>
                        </li>
                        <li className="sorting-nav-btns" id="size-controller">
                            <label htmlFor="size">Size</label>
                            <input type="range" min="10" max="100" value={arraySize} id="size" onChange={(e) => setArraySize(e.target.value)} disabled={playSorting? true: false}/>
                        </li>
                        <li className="sorting-nav-btns" id="speed-controller">
                            <label htmlFor="speed">Speed</label>
                            <input type="range" min="10" max="1000" value={sortingSpeed} id="speed" onChange={(e) => setSortingSpeed(e.target.value)} disabled={playSorting? true: false}/>
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
                            <button className="visualize-btn" id="visualizeBtn" onClick={()=> handleVisualise()} disabled={playSorting? true: false}>Visualize!</button>
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