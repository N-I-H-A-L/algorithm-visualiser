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
    
    const handleVisualise = async () => {
        if(sortingAlgo=="none") alert("Please choose an algorithm");
        else{
            for(let i = 0; i<bars.length; i++){
                bars[i].completed = false;
                bars[i].underEvaluation = false;
                bars[i].special = false;
            }
            setEditing(1-editing);
            if(sortingAlgo=="bsort") bubbleSort(arraySize);
            else if(sortingAlgo=="isort") insertionSort();
            else if(sortingAlgo=="ssort") selectionSort();
            else if(sortingAlgo=="qsort"){
                await quickSort(0, bars.length-1);
                console.log("after sorting", bars);
            }
            else if(sortingAlgo=="msort"){
                await mergeSort(0, bars.length-1);
                console.log("after sorting", bars);
            }
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
          }

          setBars(prev=> {
            prev[n-i].completed = true;
            return prev;
          });
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

            for(j = i-1; j>=0 && A[j]>key; j--) {
                A[j+1] = A[j];

                // Size change happens here
                tempBars[j+1].element = A[j+1];
                setBars(tempBars);
                
                // Color change happens here
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
            
            A[j+1] = key;

            tempBars[j+1].element = A[j+1];
            setBars(tempBars);

            const complete = bars.map((item, idx) => {
                while (idx <= i) {
                  return { ...item, completed: true };
                }
                return item;
            });
            setBars(complete);

            await timeDelay(delay.current);
        }

        setPlaySorting(false);
    }

    const selectionSort = async () => {
        setPlaySorting(true);
        let i, j, min_idx;
        let tempBars = bars;

        for(i = 0; i<bars.length-1; i++){
            min_idx = i;

            tempBars = bars;
            tempBars[min_idx].special = true;
            setBars(tempBars);

            await timeDelay(delay.current);

            for (j = i + 1; j < bars.length; j++) {
                const updateEvaluation = bars.map((item, idx)=> {
                    if(idx==j) return {...item, underEvaluation: true};
                    else return item;
                });
                setBars(updateEvaluation);
                tempBars = bars;
                
                await timeDelay(delay.current);

                if (bars[j].element < bars[min_idx].element){
                    tempBars = bars;
                    tempBars[min_idx].special = false;

                    tempBars = bars;
                    tempBars[j].special = true;
                    setBars(tempBars);
                    await timeDelay(delay.current);

                    min_idx = j;
                }

                tempBars[j].underEvaluation = false;
                setBars(tempBars);
            }
    
            if (min_idx != i){
                let temp = tempBars[min_idx].element;
                tempBars[min_idx].element = tempBars[i].element;
                tempBars[i].element = temp;
                setBars(tempBars);
            }

            tempBars = bars;
            tempBars[min_idx].special = false;
            tempBars[i].completed = true;
            setBars(tempBars);
        }
        
        tempBars[bars.length-1].completed = true;
        setBars(tempBars);

        setPlaySorting(false);
    }

    const partition = async (low, high) => {
        let tempBars = bars;
        let pivot = tempBars[high].element;
        tempBars[high].special = true;
        setBars(tempBars);

        let i = (low-1);
        
        for(let j=low; j<=high; j++){
            const updateEvaluation = bars.map((item, idx)=> {
                if(idx==j) return {...item, underEvaluation: true};
                else return item;
            });
            setBars(updateEvaluation);
            await timeDelay(delay.current);

            if(bars[j].element<pivot){
                i++;

                tempBars = bars;
                tempBars[j].underEvaluation = false;
                tempBars[j].smaller = true;
                let temp = tempBars[i].element;
                tempBars[i].element = tempBars[j].element;
                tempBars[j].element = temp;
                setBars(tempBars);
            }

            await timeDelay(delay.current);
            tempBars = bars;
            tempBars[j].smaller = false;
            setBars(tempBars);
        }

        tempBars = bars;
        let temp = tempBars[i+1].element;
        tempBars[i+1].element = tempBars[high].element;
        tempBars[high].element = temp;

        tempBars[high].special = false;
        tempBars[i+1].completed = true;
        setBars(tempBars);
        await timeDelay(delay.current);

        return (i+1);
    }

    const quickSort = async (low, high) => {
        if(low<high){
            let pivot_idx = await partition(low, high);
            await quickSort(low, pivot_idx-1);
            await quickSort(pivot_idx+1, high);
            const markCompleted = bars.map((item)=> {
                return {...item, completed: true};
            })
            setBars(markCompleted);
        }
    }

    const merge = async (p, q, r) => {
        const n1 = q-p+1, n2 = r-q;
        const A = [], L = [], R = [];
        let i, j, k;
        let tempBars = bars;

        for(k = p; k<=r; k++)   A[k] = bars[k].element;

        for(i = 0; i<n1; i++) {
            L[i] = A[p+i];
            // const updateEvaluation = bars.map((item, idx)=> {
            //     if(idx==p+i) return {...item, underEvaluation: true};
            //     else return item;
            // });
            // setBars(updateEvaluation);
            // await timeDelay(delay.current);
        }   

        for(j = 0; j<n2; j++) {
            R[j] = A[q+j+1];
            // const updateEvaluation = bars.map((item, idx)=> {
            //     if(idx==q+j+1) return {...item, underEvaluation: true};
            //     else return item;
            // });
            // setBars(updateEvaluation);
            // await timeDelay(delay.current);
        }   


        L[n1] = R[n2] = 99999;
        i = j = 0;

        for(k = p; k<=r; k++) {
            if(L[i]<=R[j]) {
                A[k] = L[i];
                i++;
            } else {
                A[k] = R[j];
                j++;  
            }
        }
        
        for(k = p; k<=r; k++){
            tempBars = bars;
            tempBars[k].element = A[k];
            setBars(tempBars);
        }  
    
        
    }

    const mergeSort = async (p, r) => {

           if(p<r) {
                const q = Math.floor((p+r)/2);
                mergeSort(p, q);
                mergeSort(q+1, r);
                merge(p, q, r);

            }
            const markCompleted = bars.map((item)=> {
                return {...item, completed: true};
            })
            setBars(markCompleted);
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