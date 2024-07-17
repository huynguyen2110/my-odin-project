function mergeSort(array) {
    if(array.length <= 1) {
        return array
    }
    const half_length = Math.ceil(array.length / 2);
    const leftArray = array.slice(0,half_length);
    const rightArray = array.slice(half_length, array.length);
    return mergeArray(mergeSort(leftArray), mergeSort(rightArray))
}

function mergeArray(leftArray, rightArray) {
    if(leftArray.length === 0){
        return rightArray
    }
    if(rightArray.length === 0) {
        return leftArray
    }
    if(leftArray[0] < rightArray[0]) {
        return [leftArray[0]].concat(mergeArray(leftArray.slice(1), rightArray))
    }
    return [rightArray[0]].concat(mergeArray(leftArray, rightArray.slice(1)))
}

console.log(mergeSort([3, 2, 1, 7, 13, 8, 5, 0, 9, 1]))
