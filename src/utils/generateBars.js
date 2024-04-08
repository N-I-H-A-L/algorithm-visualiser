export function getBars(A, n) {
    const bars = [];
    let i;

    for(i = 0; i < n; i++) {
        bars.push({
            element: A[i],
            props: ["bar"],
        })
    }
    return bars;
}