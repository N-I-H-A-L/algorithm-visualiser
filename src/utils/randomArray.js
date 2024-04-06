export function generateRandomArray(arraySize) {
    let randomArray = [];
    for (let i = 0; i < arraySize; i++) {
        randomArray.push(Math.floor(Math.random() * 901) + 100);
    }
    return randomArray;
}