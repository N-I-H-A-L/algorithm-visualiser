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
        else{
            for(let i = 0; i<bars.length; i++){
                bars[i].completed = false;
                bars[i].underEvaluation = false;
                bars[i].smaller = false;
            }
            setEditing(1-editing);
            if(sortingAlgo=="bsort") bubbleSort(arraySize);
            else if(sortingAlgo=="isort") insertionSort();
            else if(sortingAlgo=="ssort") selectionSort();
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
            let tempBars = bars;

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

                tempBars[j+1].element = A[j+1];
                setBars(tempBars);
                setEditing(1-editing);

                await timeDelay(delay.current);
            }

            A[j+1] = key;

            tempBars[j+1].element = A[j+1];
            setBars(tempBars);
            setEditing(1-editing);

        }
        
        console.log(A);
        setPlaySorting(false);
    }

    const selectionSort = async () => {
        setPlaySorting(true);
        let i, j, min_idx;
        let tempBars = bars;

        for(i = 0; i<bars.length-1; i++){
            min_idx = i;
            const updateSmall = bars.map((item, idx)=> {
                if(idx==min_idx) return {...item, smaller: true};
                else return {...item, smaller: false};
            });
            
            setBars(updateSmall);
            tempBars = bars;
            setEditing(1-editing);
            await timeDelay(delay.current);

            for (j = i + 1; j < bars.length; j++) {
                const updateEvaluation = bars.map((item, idx)=> {
                    if(idx==j) return {...item, underEvaluation: true};
                    else return item;
                });
                setBars(updateEvaluation);
                tempBars = bars;
                setEditing(1-editing);
                
                await timeDelay(delay.current);

                if (bars[j].element < bars[min_idx].element){
                    const newSmall = bars.map((item, idx)=> {
                        if(idx==j) return {...item, smaller: true};
                        else return {...item, smaller: false};
                    });
                    min_idx = j;
                    
                    setBars(newSmall);
                    tempBars = bars;
                    setEditing(1-editing);
                    await timeDelay(delay.current);
                }

                tempBars[j].underEvaluation = false;
                setBars(tempBars);
                setEditing(1-editing);
            }
    
            if (min_idx != i){
                let temp = tempBars[min_idx].element;
                tempBars[min_idx].element = tempBars[i].element;
                tempBars[i].element = temp;

                setBars(tempBars);
                setEditing(1-editing);
            }

            tempBars[i].completed = true;
            setBars(tempBars);
            setEditing(1-editing);
        }
        
        tempBars[bars.length-1].completed = true;
        setBars(tempBars);
        setEditing(1-editing);

        setPlaySorting(false);
        console.log(bars);
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