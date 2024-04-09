import React, { useState, useEffect, useRef } from "react";
import { useParams } from "../context/context";
import "../css/NavbarS.css";
import { GrVolume } from "react-icons/gr";
import { getBars } from "../utils/generateBars";

const NavbarS = () => {
    const { arraySize, setArraySize, sortingAlgo, setSortingAlgo, sortingSpeed, setSortingSpeed, 
            playSorting, setPlaySorting, bars, setBars } = useParams();
    const delay = useRef(1000);
    const [editing, setEditing] = useState(0);

    useEffect(() => {
        delay.current = 500-sortingSpeed;
    }, [sortingSpeed]);

    useEffect(()=> {
        setBars(getBars([], arraySize));
    }, [arraySize]);

    async function timeDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleAlgorithmChange = (e) =>{
        setSortingAlgo(e.target.value);
    }
    
    const handleVisualise = () => {
        if(sortingAlgo=="none") alert("Please choose an algorithm");
        else if(sortingAlgo=='bsort'){
            bubbleSort(arraySize);
        }
        else if(sortingAlgo=="isort"){
            insertionSort();
        }
    }

    const bubbleSort = async (n) => {
        setPlaySorting(true);

        const bubbleArr = [];
        let i, j;

        for (i = 0; i < n; i++)
            bubbleArr[i] = bars[i].element;

        for (i = 0; i < n-1; i++) {
          for (j = 0; j < n - i - 1; j++) {
            const evaluate = bars.map((item, idx) => {
                if (idx === j || idx === j+1) {
                  return { ...item, underEvaluation: true };
                }
                return item;
            });
            setBars(evaluate);
            var tempBars = bars;

            await timeDelay(delay.current);
            if (bubbleArr[j] > bubbleArr[j + 1]) {
                let temp = bubbleArr[j];
                bubbleArr[j] = bubbleArr[j+1];
                bubbleArr[j+1] = temp;
            }

            tempBars[j].element = bubbleArr[j];
            tempBars[j+1].element = bubbleArr[j+1];
            setBars(tempBars);
            setEditing(1-editing);
          }
          setBars(prev=> {
            prev[n-i].completed = true;
            return prev;
          });
          setEditing(1-editing);
        }
        setBars(prev=> {
            prev[0].completed = true;
            return prev;
        });

        setPlaySorting(false);
    }

    const insertionSort = async () => {
        setPlaySorting(true);
        const A = [], n = arraySize;
        let i, j, key;

        for(i = 0; i<n; i++)
            A[i] = bars[i].element;

        for(i = 1; i<n; i++) {
            key = A[i];
            var tempBars = bars;

            // For loop for animation
            for(j = i-1; j>=0; j--) {
                const evaluate = bars.map((item, idx) => {
                    if (idx == j) {
                      return { ...item, underEvaluation: true };
                    }
                    return item;
                });
                setBars(evaluate);
                tempBars = bars;

                await timeDelay(delay.current);
            }
            
            // For loop for sorting
            for(j = i-1; j>=0 && A[j]>key; j--) {
                A[j+1] = A[j];

                if(A[j]>key) {
                    tempBars[j+1].element = A[j+1];
                    setBars(tempBars);
                    setEditing(1-editing);
                }
            }

            A[j+1] = key;

            tempBars[j+1].element = A[j+1];
            setBars(tempBars);
            setEditing(1-editing);

        }
        
        console.log(A);
        setPlaySorting(false);
    }

    return (
        <>
            <div className="sorting-nav">
                <div className="sorting-nav-items">
                    <ul>
                        <li className="sorting-nav-btns">
                            <button className="new-array-btn" id="newArrBtn" onClick={()=> setBars(getBars([], arraySize))} disabled={playSorting}>New Array</button>
                        </li>
                        <li className="sorting-nav-btns" id="size-controller">
                            <label htmlFor="size">Size</label>
                            <input type="range" min="10" max="100" value={arraySize} id="size" onChange={(e) => setArraySize(e.target.value)} disabled={playSorting}/>
                        </li>
                        <li className="sorting-nav-btns" id="speed-controller">
                            <label htmlFor="speed">Speed</label>
                            <input type="range" min="5" max="500" value={sortingSpeed} id="speed" onChange={(e) => setSortingSpeed(e.target.value)} disabled={playSorting}/>
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
                            <button className="visualize-btn" id="visualizeBtn" onClick={()=> handleVisualise()} disabled={playSorting}>Visualize!</button>
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