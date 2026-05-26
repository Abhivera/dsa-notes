let arr1 = [1,4,8,20,99]// sorting order only

function BinarySearch(nums,target){
let left = 0;
let right = nums.length-1;
while(left<=right){
    let mid =Math.floor((left+right)/2);
    if(nums[mid]>target){
        right = mid-1
    } 
    else if(nums[mid]<target){
        left = mid+1
    }
    else {
        return mid
    }
}

    return -1
}
console.log(BinarySearch(arr1,20))