let list =[3,89,30,20,19]
// n-1 passes
// n-1 comparison
function bubbleSort(arr){
    for(let i=0;i<arr.length-1;i++){
     let swapped = false
     for(let j=0;j<arr.length-1-i;j++){
if(arr[j]>arr[j+1]){
    swapped = true
    let temp =arr[j];
    arr[j]=arr[j+1];
    arr[j+1]= temp;
}
     }

     if(!swapped){
        break;
     }

    }
    return arr
}
console.log(bubbleSort(list));