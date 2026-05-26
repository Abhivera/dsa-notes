//want maximum sum  with window size(k) in given array (arr)
let array1 =[3,4,7,34,8]
function SlidingWindow(arr,k){
if(arr.length<k){
    return null;
}
let maxSum = 0;
let windowSum =0;
for(let i = 0;i<k;i++){
    windowSum += arr[i]
}
maxSum=windowSum
for(let i=k;i<arr.length;i++){
windowSum = windowSum-arr[i-k]+arr[i]
maxSum = Math.max(windowSum,maxSum)
}
return maxSum
}

console.log(SlidingWindow(array1,2),"Sliding Window ")