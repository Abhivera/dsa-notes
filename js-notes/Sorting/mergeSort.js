function mergeSort(arr){
    if(arr.length<=1){
        return arr
    }
    const mid = Math.floor(arr.length/2)
    const left  = mergeSort(arr.slice(0,mid))
    const right = mergeSort(arr.slice(mid))

    return merge(left,right,arr)
}
function merge(left,right,arr){
    let i=0;
    let j=0;
    let k=0;
    while(i<left.length && j<right.length){
     if(left[i]<=right[j]){
    arr[k] = left[i];
    i++;
     }else {
        arr[k]  = right[j];
        j++;
     }
     k++;
    }
    while(i<left.length){
        arr[k] = left[i]
        i++
        k++
    }
    while(j<right.length){
        arr[k] = right[j]
        j++
        k++
    }
    return arr
}
let array =[2,7,5,3,1]
console.log(mergeSort(array),'sorted array');