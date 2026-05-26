let list = [67,45,32,29,50,34]

function quickSort(arr){
    if(arr.length<=1){
        return arr
    }
    let left =[];
    let right=[];
    let pivot = arr[Math.floor((arr.length)/2)]

    for(let i=0;i<arr.length;i++){
        if (i === Math.floor(arr.length / 2)) continue;// skip pivot
        if(arr[i]<pivot){
left.push(arr[i])
        }else{
right.push(arr[i])
        }
    }


    return quickSort(left).concat(pivot,quickSort(right))

}

console.log(quickSort(list))