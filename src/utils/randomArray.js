export function generateRandomArray(arraySize) {
    let randomArray = [];
    for (let i = 0; i < arraySize; i++) {
        randomArray.push(Math.floor(Math.random() * 1000) + 1);
    }
    return randomArray;
}